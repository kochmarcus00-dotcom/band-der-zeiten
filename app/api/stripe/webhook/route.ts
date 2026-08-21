import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderEmail } from "@/lib/send-order-email";
export async function POST(request: Request) {
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.json(
            { error: "Stripe-Signatur fehlt." },
            { status: 400 }
        );
    }

    try {
        const stripeKey = process.env.STRIPE_SECRET_KEY;

        if (!stripeKey) {
            return NextResponse.json(
                { error: "Stripe ist noch nicht konfiguriert." },
                { status: 503 }
            );
        }

        const stripe = new Stripe(stripeKey);
        const body = await request.text();

        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        console.log("Stripe Webhook:", event.type);

        switch (event.type) {
            case "checkout.session.completed": {
                const session =
                    event.data.object as Stripe.Checkout.Session;

                const orderId = session.metadata?.orderId;

                if (!orderId) {
                    console.error(
                        "Stripe Session enthält keine orderId."
                    );
                    break;
                }

                const order = await prisma.order.findUnique({
                    where: {
                        id: orderId,
                    },
                    include: {
                        customer: true,
                        items: true,
                    },
                });

                if (!order) {
                    console.error(
                        `Bestellung ${orderId} wurde nicht gefunden.`
                    );
                    break;
                }

                if (order.paymentStatus === "PAID") {
                    console.log(
                        `Bestellung ${orderId} ist bereits bezahlt. Event wird ignoriert.`
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

                try {
                    await sendOrderEmail({
                        to: order.customer.email,
                        firstName: order.customer.firstName,
                        orderId: order.id,
                        subtotal: order.subtotal,
                        shipping: order.shipping,
                        total: order.total,
                        items: order.items,
                    });

                    console.log(
                        `Bestellbestätigung für ${orderId} wurde versendet.`
                    );
                } catch (emailError) {
                    console.error(
                        `Bestellbestätigung für ${orderId} konnte nicht versendet werden:`,
                        emailError
                    );
                }

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