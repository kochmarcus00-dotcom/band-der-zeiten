"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CartProduct = {
    id: string;
    name: string;
    price: number;
    image: string;
};

type CartItem = {
    product: CartProduct;
    quantity: number;
};

export default function CheckoutPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("DE");
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState("");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("viking-cart");

            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch {
            localStorage.removeItem("viking-cart");
        }

        setLoaded(true);
    }, []);

    const subtotal = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const shipping = subtotal > 0 ? 4.90 : 0;
    const total = subtotal + shipping;

    const formatPrice = (price: number) =>
        price.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
        });
    const startCheckout = async () => {
        setPaymentError("");

        if (
            !firstName ||
            !lastName ||
            !email ||
            !street ||
            !houseNumber ||
            !postalCode ||
            !city
        ) {
            setPaymentError("Bitte fülle alle Pflichtfelder aus.");
            return;
        }

        if (cart.length === 0) {
            setPaymentError("Dein Warenkorb ist leer.");
            return;
        }

        try {
            setPaymentLoading(true);

            const response = await fetch("/api/checkout/create-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: cart.map((item) => ({
                        productId: item.product.id,
                        quantity: item.quantity,
                    })),
                    firstName,
                    lastName,
                    email,
                    street,
                    houseNumber,
                    postalCode,
                    city,
                    country,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Die Zahlung konnte nicht vorbereitet werden."
                );
            }

            if (!data.url) {
                throw new Error("Stripe hat keine Zahlungs-URL geliefert.");
            }

            window.location.href = data.url;
        } catch (error) {
            console.error("Checkout-Fehler:", error);

            setPaymentError(
                error instanceof Error
                    ? error.message
                    : "Die Zahlung konnte nicht gestartet werden."
            );

            setPaymentLoading(false);
        }
    };
    if (!loaded) {
        return (
            <main className="min-h-screen bg-[#090909] text-white">
                <div className="flex min-h-screen items-center justify-center">
                    <p className="text-stone-400">
                        Warenkorb wird geladen...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#090909] text-white">

            {/* HEADER */}
            <header className="border-b border-white/10 bg-[#090909]/95">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-8">

                    <Link
                        href="/vikingshop"
                        className="text-sm uppercase tracking-[0.3em] text-[#d8b16d] transition hover:text-white"
                    >
                        Freyjas Feder
                    </Link>

                    <Link
                        href="/vikingshop"
                        className="text-sm text-stone-400 transition hover:text-[#d8b16d]"
                    >
                        ← Zurück zum Shop
                    </Link>

                </div>
            </header>

            {/* CONTENT */}
            <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">

                <div className="mb-12">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#c8a46b]">
                        Freyjas Schatzkammer
                    </p>

                    <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
                        Deine Bestellung
                    </h1>

                    <p className="mt-5 max-w-2xl text-stone-400">
                        Prüfe deine Auswahl und gib anschließend deine
                        Lieferdaten ein.
                    </p>
                </div>

                {cart.length === 0 ? (
                    <div className="rounded-3xl border border-white/10 bg-[#111] p-10 text-center">

                        <h2 className="text-2xl font-semibold">
                            Dein Warenkorb ist leer.
                        </h2>

                        <p className="mt-3 text-stone-400">
                            Füge zuerst ein Produkt aus Freyjas Schatzkammer
                            hinzu.
                        </p>

                        <Link
                            href="/vikingshop"
                            className="mt-8 inline-block rounded-full bg-[#c8a46b] px-7 py-3 font-semibold text-[#111] transition hover:bg-[#d8b16d]"
                        >
                            Zum Shop
                        </Link>

                    </div>
                ) : (
                    <div className="grid gap-10 lg:grid-cols-[1fr_420px]">

                        {/* BESTELLUNG */}
                        <div className="rounded-3xl border border-white/10 bg-[#111] p-6 md:p-8">

                            <h2 className="text-2xl font-semibold">
                                Bestellübersicht
                            </h2>

                            <div className="mt-8 divide-y divide-white/10">

                                {cart.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className="flex gap-5 py-6 first:pt-0 last:pb-0"
                                    >

                                        <div className="flex-1">
                                            <h3 className="font-semibold">
                                                {item.product.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-stone-500">
                                                Menge: {item.quantity}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-semibold text-[#d8b16d]">
                                                {formatPrice(
                                                    item.product.price *
                                                    item.quantity
                                                )}
                                            </p>

                                            <p className="mt-1 text-xs text-stone-500">
                                                {formatPrice(item.product.price)} / Stück
                                            </p>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* KUNDENDATEN + SUMME */}
                        <div className="space-y-6">

                            {/* KUNDENDATEN */}
                            <div className="rounded-3xl border border-white/10 bg-[#111] p-6 md:p-8">

                                <h2 className="text-2xl font-semibold">
                                    Lieferdaten
                                </h2>

                                <div className="mt-6 space-y-4">

                                    <div className="grid gap-4 sm:grid-cols-2">

                                        <input
                                            type="text"
                                            placeholder="Vorname"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none transition placeholder:text-stone-600 focus:border-[#c8a46b]"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Nachname"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none transition placeholder:text-stone-600 focus:border-[#c8a46b]"
                                        />

                                    </div>

                                    <input
                                        type="email"
                                        placeholder="E-Mail-Adresse"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none transition placeholder:text-stone-600 focus:border-[#c8a46b]"
                                    />

                                    <div className="grid gap-4 sm:grid-cols-[1fr_140px]">

                                        <input
                                            type="text"
                                            placeholder="Straße"
                                            value={street}
                                            onChange={(e) => setStreet(e.target.value)}
                                            className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none transition placeholder:text-stone-600 focus:border-[#c8a46b]"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Hausnummer"
                                            value={houseNumber}
                                            onChange={(e) => setHouseNumber(e.target.value)}
                                            className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none transition placeholder:text-stone-600 focus:border-[#c8a46b]"
                                        />

                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-[120px_1fr]">

                                        <input
                                            type="text"
                                            placeholder="PLZ"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none transition placeholder:text-stone-600 focus:border-[#c8a46b]"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Ort"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none transition placeholder:text-stone-600 focus:border-[#c8a46b]"
                                        />

                                    </div>

                                    <input
                                        type="text"
                                        value="Deutschland"
                                        readOnly
                                        className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none transition focus:border-[#c8a46b]"
                                    />

                                </div>
                            </div>

                            {/* SUMME */}
                            <div className="rounded-3xl border border-white/10 bg-[#111] p-6 md:p-8">

                                <h2 className="text-2xl font-semibold">
                                    Zusammenfassung
                                </h2>

                                <div className="mt-6 space-y-4">

                                    <div className="flex justify-between">
                                        <span className="text-stone-400">
                                            Zwischensumme
                                        </span>

                                        <span>
                                            {formatPrice(subtotal)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-stone-400">
                                            Versand
                                        </span>

                                        <span>
                                            {formatPrice(shipping)}
                                        </span>
                                    </div>

                                    <div className="border-t border-white/10 pt-4">

                                        <div className="flex items-center justify-between">

                                            <span className="text-lg">
                                                Gesamt
                                            </span>

                                            <span className="text-2xl font-semibold text-[#d8b16d]">
                                                {formatPrice(total)}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={startCheckout}
                                    disabled={paymentLoading}
                                    className="mt-8 w-full rounded-full bg-[#c8a46b] px-6 py-4 font-semibold text-[#111] transition hover:scale-[1.02] hover:bg-[#d8b16d] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {paymentLoading
                                        ? "Zahlung wird vorbereitet..."
                                        : "Weiter zur Zahlung"}
                                </button>
                                {paymentError && (
                                    <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                                        {paymentError}
                                    </p>
                                )}
                                <p className="mt-4 text-center text-xs leading-5 text-stone-500">
                                    Der Zahlungsvorgang wird im nächsten
                                    Schritt sicher durchgeführt.
                                </p>

                            </div>

                        </div>

                    </div>
                )}

            </section>
        </main>
    );
}