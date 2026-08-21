import Stripe from "stripe";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

type SuccessPageProps = {
    searchParams: Promise<{
        session_id?: string;
    }>;
};

export default async function CheckoutSuccessPage({
    searchParams,
}: SuccessPageProps) {
    const params = await searchParams;
    const sessionId = params.session_id;

    let order = null;

    if (sessionId) {
        try {
            const stripeKey = process.env.STRIPE_SECRET_KEY;

            if (!stripeKey) {
                console.error("STRIPE_SECRET_KEY fehlt.");
            } else {
                const stripe = new Stripe(stripeKey);

                const session =
                    await stripe.checkout.sessions.retrieve(sessionId);

                const orderId = session.metadata?.orderId;

                if (orderId) {
                    order = await prisma.order.findUnique({
                        where: {
                            id: orderId,
                        },
                        include: {
                            items: true,
                        },
                    });
                }
            }
        } catch (error) {
            console.error(
                "Fehler beim Laden der Bestellung:",
                error
            );
        }
    }

    return (
        <main className="min-h-screen bg-[#090909] px-6 py-24 text-white">
            <div className="mx-auto max-w-2xl text-center">

                <div className="mb-8 text-6xl">
                    ✓
                </div>

                <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c8a46b]">
                    Zahlung erfolgreich
                </p>

                <h1 className="font-serif text-4xl sm:text-5xl">
                    Vielen Dank für deine Bestellung.
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-stone-400">
                    Deine Zahlung wurde erfolgreich verarbeitet.
                    Deine Bestellung wurde aufgenommen und wird nun
                    für den Versand vorbereitet.
                </p>

                {order && (
                    <div className="mx-auto mt-10 rounded-3xl border border-white/10 bg-[#111] p-6 text-left sm:p-8">

                        <div className="flex items-center justify-between border-b border-white/10 pb-5">
                            <span className="text-stone-500">
                                Bestellnummer
                            </span>

                            <span className="font-mono text-sm text-[#d8b16d]">
                                #{order.id}
                            </span>
                        </div>

                        <div className="mt-5 space-y-4">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between gap-4"
                                >
                                    <div>
                                        <p className="text-stone-200">
                                            {item.productName}
                                        </p>

                                        <p className="text-sm text-stone-500">
                                            {item.quantity} ×{" "}
                                            {Number(
                                                item.price
                                            ).toLocaleString("de-DE", {
                                                style: "currency",
                                                currency: "EUR",
                                            })}
                                        </p>
                                    </div>

                                    <p className="text-stone-300">
                                        {(
                                            Number(item.price) *
                                            item.quantity
                                        ).toLocaleString("de-DE", {
                                            style: "currency",
                                            currency: "EUR",
                                        })}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 border-t border-white/10 pt-5">

                            <div className="flex justify-between text-sm">
                                <span className="text-stone-500">
                                    Zwischensumme
                                </span>

                                <span>
                                    {Number(
                                        order.subtotal
                                    ).toLocaleString("de-DE", {
                                        style: "currency",
                                        currency: "EUR",
                                    })}
                                </span>
                            </div>

                            <div className="mt-3 flex justify-between text-sm">
                                <span className="text-stone-500">
                                    Versand
                                </span>

                                <span>
                                    {Number(
                                        order.shipping
                                    ).toLocaleString("de-DE", {
                                        style: "currency",
                                        currency: "EUR",
                                    })}
                                </span>
                            </div>

                            <div className="mt-5 flex justify-between border-t border-white/10 pt-5">
                                <span className="text-lg">
                                    Gesamt
                                </span>

                                <span className="text-2xl font-semibold text-[#d8b16d]">
                                    {Number(
                                        order.total
                                    ).toLocaleString("de-DE", {
                                        style: "currency",
                                        currency: "EUR",
                                    })}
                                </span>
                            </div>

                        </div>
                    </div>
                )}

                {!order && (
                    <div className="mx-auto mt-10 rounded-2xl border border-white/10 bg-[#111] p-6 text-stone-400">
                        Deine Zahlung war erfolgreich. Die
                        Bestelldaten werden gerade verarbeitet.
                    </div>
                )}

                <Link
                    href="/vikingshop"
                    className="mt-10 inline-block rounded-full bg-[#c8a46b] px-8 py-4 font-semibold text-[#111] transition hover:bg-[#d8b16d]"
                >
                    Zurück zum VikingShop
                </Link>

            </div>
        </main>
    );
}