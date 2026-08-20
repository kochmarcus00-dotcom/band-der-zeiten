import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.json(
            { error: "Stripe-Signatur fehlt." },
            { status: 400 }
        );
    }

    try {
        const body = await request.text();

        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        console.log("Stripe Webhook:", event.type);

        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;

                const orderId = session.metadata?.orderId;

                if (!orderId) {
                    console.error(
                        "Stripe Session enthält keine orderId."
                    );
                    break;
                }

                await prisma.order.update({
                    where: {
                        id: orderId,
                    },
                    data: {
                        paymentStatus: "PAID",
                        status: "PAID",
                    },
                });

                console.log(
                    `Bestellung ${orderId} wurde als PAID markiert.`
                );

                break;
            }

            case "checkout.session.async_payment_failed": {
                const session = event.data.object as Stripe.Checkout.Session;

                const orderId = session.metadata?.orderId;

                if (orderId) {
                    await prisma.order.update({
                        where: {
                            id: orderId,
                        },
                        data: {
                            paymentStatus: "FAILED",
                        },
                    });

                    console.log(
                        `Bestellung ${orderId}: Zahlung fehlgeschlagen.`
                    );
                }

                break;
            }

            case "checkout.session.expired": {
                const session = event.data.object as Stripe.Checkout.Session;

                const orderId = session.metadata?.orderId;

                if (orderId) {
                    await prisma.order.update({
                        where: {
                            id: orderId,
                        },
                        data: {
                            status: "CANCELLED",
                        },
                    });

                    console.log(
                        `Bestellung ${orderId} wurde storniert.`
                    );
                }

                break;
            }

            default:
                console.log(
                    `Stripe Event ignoriert: ${event.type}`
                );
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Stripe Webhook Fehler:", error);

        return NextResponse.json(
            { error: "Webhook konnte nicht verarbeitet werden." },
            { status: 400 }
        );
    }
}