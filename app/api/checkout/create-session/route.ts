import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const SHIPPING = 4.9;

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            items,
            firstName,
            lastName,
            email,
            street,
            houseNumber,
            postalCode,
            city,
            country,
        } = body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: "Der Warenkorb ist leer." },
                { status: 400 }
            );
        }

        if (
            !firstName ||
            !lastName ||
            !email ||
            !street ||
            !houseNumber ||
            !postalCode ||
            !city
        ) {
            return NextResponse.json(
                { error: "Bitte alle Pflichtfelder ausfüllen." },
                { status: 400 }
            );
        }

        // Produkte IMMER erneut aus der Datenbank laden.
        // Preise aus dem Browser werden nicht vertraut.
        const productIds = items.map((item: { productId: string }) => item.productId);

        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
                available: true,
            },
        });

        if (products.length !== productIds.length) {
            return NextResponse.json(
                { error: "Ein oder mehrere Produkte sind nicht mehr verfügbar." },
                { status: 400 }
            );
        }

        const normalizedItems = items.map(
            (item: { productId: string; quantity: number }) => {
                const product = products.find(
                    (p) => p.id === item.productId
                );

                if (!product) {
                    throw new Error("Produkt nicht gefunden.");
                }

                const quantity = Math.max(
                    1,
                    Math.min(99, Number(item.quantity) || 1)
                );

                return {
                    product,
                    quantity,
                };
            }
        );

        const subtotal = normalizedItems.reduce(
            (sum, item) =>
                sum + Number(item.product.price) * item.quantity,
            0
        );

        const total = subtotal + SHIPPING;

        // Kunde anlegen
        const customer = await prisma.customer.create({
            data: {
                firstName: String(firstName).trim(),
                lastName: String(lastName).trim(),
                email: String(email).trim().toLowerCase(),
                street: String(street).trim(),
                houseNumber: String(houseNumber).trim(),
                postalCode: String(postalCode).trim(),
                city: String(city).trim(),
                country: String(country || "DE").trim(),
            },
        });

        // Bestellung zunächst PENDING
        const order = await prisma.order.create({
            data: {
                customerId: customer.id,
                status: "PENDING",
                paymentStatus: "PENDING",
                subtotal,
                shipping: SHIPPING,
                total,
                items: {
                    create: normalizedItems.map((item) => ({
                        productId: item.product.id,
                        productName: item.product.name,
                        price: item.product.price,
                        quantity: item.quantity,
                    })),
                },
            },
        });

        // Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: "payment",

            customer_email: customer.email,

            line_items: [
                ...normalizedItems.map((item) => ({
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: item.product.name,
                            description: item.product.description,
                            images: item.product.image
                                ? [item.product.image]
                                : undefined,
                        },
                        unit_amount: Math.round(
                            Number(item.product.price) * 100
                        ),
                    },
                    quantity: item.quantity,
                })),

                {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: "Versand",
                        },
                        unit_amount: Math.round(SHIPPING * 100),
                    },
                    quantity: 1,
                },
            ],

            metadata: {
                orderId: order.id,
                customerId: customer.id,
            },

            success_url:
                `${process.env.NEXT_PUBLIC_SITE_URL}/vikingshop/checkout/success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url:
                `${process.env.NEXT_PUBLIC_SITE_URL}/vikingshop/checkout`,
        });

        return NextResponse.json({
            url: session.url,
        });
    } catch (error) {
        console.error("Stripe Checkout Fehler:", error);

        return NextResponse.json(
            {
                error: "Die Zahlung konnte nicht vorbereitet werden.",
            },
            { status: 500 }
        );
    }
}