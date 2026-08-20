"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ShopProduct } from "../../lib/shop-types";

type CartItem = {
    product: ShopProduct;
    quantity: number;
};

export default function ShopClient({
    products,
}: {
    products: ShopProduct[];
}) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartOpen, setCartOpen] = useState(false);
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("viking-cart");

            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch {
            localStorage.removeItem("viking-cart");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("viking-cart", JSON.stringify(cart));
    }, [cart]);
    function addToCart(product: ShopProduct) {
        setCart((current) => {
            const existing = current.find(
                (item) => item.product.id === product.id
            );

            if (existing) {
                return current.map((item) =>
                    item.product.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );
            }

            return [...current, { product, quantity: 1 }];
        });

        setCartOpen(true);
    }

    function changeQuantity(productId: string, amount: number) {
        setCart((current) =>
            current
                .map((item) =>
                    item.product.id === productId
                        ? {
                            ...item,
                            quantity: item.quantity + amount,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    function removeFromCart(productId: string) {
        setCart((current) =>
            current.filter((item) => item.product.id !== productId)
        );
    }

    const itemCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const total = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const formatPrice = (price: number) =>
        price.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
        });

    return (
        <main className="min-h-screen overflow-x-hidden bg-[#090909] text-white">

            {/* NAVIGATION */}
            {/* SHOP-KOPF */}
            <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#090909]/90 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-8">

                    <Link
                        href="/"
                        className="text-sm text-[#d8b16d] transition hover:text-white"
                    >
                        ← Zur Hauptseite
                    </Link>

                    <button
                        type="button"
                        onClick={() => setCartOpen(true)}
                        className="relative rounded-full border border-[#c8a46b]/50 px-5 py-2.5 text-sm text-[#d8b16d] transition hover:bg-[#c8a46b] hover:text-[#111]"
                    >
                        Warenkorb

                        {itemCount > 0 && (
                            <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#c8a46b] px-1.5 text-xs font-semibold text-[#111]">
                                {itemCount}
                            </span>
                        )}
                    </button>

                </div>
            </header>

            {/* HERO */}
            <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-48">

                <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8a46b]/10 blur-[180px]" />

                <div className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-8">

                    <p className="uppercase tracking-[0.4em] text-xs md:text-sm text-[#c8a46b]">
                        Freyjas Feder
                    </p>

                    <h1 className="mt-8 text-5xl font-semibold leading-tight sm:text-6xl md:text-7xl lg:text-8xl">
                        Freyjas
                        <br />
                        Schatzkammer
                    </h1>

                    <div className="mx-auto mt-10 h-px w-24 bg-[#c8a46b] md:w-40" />

                    <p className="mx-auto mt-10 max-w-3xl text-lg leading-9 text-stone-300 md:text-xl">
                        Artefakte, Erinnerungen und kleine Dinge
                        <br className="hidden md:block" />
                        aus den Welten von Freyjas Feder.
                    </p>

                </div>
            </section>

            {/* PRODUKTE */}
            <section className="relative pb-32 md:pb-48">

                <div className="mx-auto max-w-7xl px-6 md:px-8">

                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAdd={() => addToCart(product)}
                            />
                        ))}

                    </div>

                </div>
            </section>

            {/* WARENKORB */}
            {cartOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
                    onClick={() => setCartOpen(false)}
                >
                    <aside
                        className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col border-l border-white/10 bg-[#111]"
                        onClick={(event) => event.stopPropagation()}
                    >

                        <div className="flex items-center justify-between border-b border-white/10 p-6 md:p-8">

                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-[#c8a46b]">
                                    Freyjas Schatzkammer
                                </p>

                                <h2 className="mt-2 text-3xl font-semibold">
                                    Dein Warenkorb
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() => setCartOpen(false)}
                                className="text-2xl text-stone-400 transition hover:text-white"
                                aria-label="Warenkorb schließen"
                            >
                                ×
                            </button>

                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-8">

                            {cart.length === 0 ? (
                                <div className="py-20 text-center">

                                    <p className="text-5xl opacity-30">
                                        ᚠ
                                    </p>

                                    <p className="mt-6 text-xl">
                                        Dein Warenkorb ist noch leer.
                                    </p>

                                    <p className="mt-3 text-stone-400">
                                        Vielleicht wartet schon ein Artefakt auf dich.
                                    </p>

                                </div>
                            ) : (
                                <div className="space-y-6">

                                    {cart.map((item) => (
                                        <div
                                            key={item.product.id}
                                            className="flex gap-4 border-b border-white/10 pb-6"
                                        >

                                            <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1">

                                                <h3 className="font-semibold">
                                                    {item.product.name}
                                                </h3>

                                                <p className="mt-1 text-sm text-[#c8a46b]">
                                                    {formatPrice(item.product.price)}
                                                </p>

                                                <div className="mt-3 flex items-center gap-3">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            changeQuantity(
                                                                item.product.id,
                                                                -1
                                                            )
                                                        }
                                                        className="h-8 w-8 rounded-full border border-white/20 transition hover:border-[#c8a46b]"
                                                    >
                                                        −
                                                    </button>

                                                    <span>
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            changeQuantity(
                                                                item.product.id,
                                                                1
                                                            )
                                                        }
                                                        className="h-8 w-8 rounded-full border border-white/20 transition hover:border-[#c8a46b]"
                                                    >
                                                        +
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeFromCart(
                                                                item.product.id
                                                            )
                                                        }
                                                        className="ml-auto text-sm text-stone-500 transition hover:text-red-400"
                                                    >
                                                        Entfernen
                                                    </button>

                                                </div>

                                            </div>

                                        </div>
                                    ))}

                                </div>
                            )}

                        </div>

                        {cart.length > 0 && (
                            <div className="border-t border-white/10 p-6 md:p-8">

                                <div className="flex items-center justify-between text-lg">
                                    <span className="text-stone-400">
                                        Zwischensumme
                                    </span>

                                    <span className="font-semibold text-[#d8b16d]">
                                        {formatPrice(total)}
                                    </span>
                                </div>

                                <p className="mt-3 text-sm text-stone-500">
                                    Versandkosten werden später berechnet.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setCartOpen(false);
                                        window.location.href = "/vikingshop/checkout";
                                    }}
                                    className="mt-6 w-full rounded-full bg-[#c8a46b] px-6 py-4 font-semibold text-[#111] transition hover:bg-[#d8b16d] hover:scale-[1.02]"
                                >
                                    Zur Kasse
                                </button>

                            </div>
                        )}

                    </aside>
                </div>
            )}
            {/* FOOTER */}
            <footer className="border-t border-white/10 px-6 py-10 md:px-8">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-stone-500 md:flex-row">

                    <p>
                        © {new Date().getFullYear()} Freyjas Feder
                    </p>

                    <div className="flex gap-6">
                        <Link
                            href="/datenschutz"
                            className="transition hover:text-[#d8b16d]"
                        >
                            Datenschutz
                        </Link>

                        <Link
                            href="/impressum"
                            className="transition hover:text-[#d8b16d]"
                        >
                            Impressum
                        </Link>
                    </div>

                </div>
            </footer>
        </main>
    );
}

function ProductCard({
    product,
    onAdd,
}: {
    product: ShopProduct;
    onAdd: () => void;
}) {
    const glowClass = {
        gold: "bg-[#c8a46b]/20",
        blue: "bg-cyan-300/20",
        red: "bg-red-700/20",
    };

    const isPlaceholder =
        product.image === "/shop-placeholder.jpg";

    return (
        <article className="group relative overflow-hidden rounded-[34px] border border-white/10 bg-[#111]/90 backdrop-blur-xl transition-all duration-700 hover:-translate-y-3 hover:border-[#c8a46b]/40 hover:shadow-[0_0_100px_rgba(200,164,107,.12)]">

            <div
                className={`absolute -left-20 top-10 h-[280px] w-[280px] rounded-full blur-[130px] transition-all duration-700 group-hover:scale-150 ${glowClass[product.glow]}`}
            />

            <div className="absolute right-8 top-8 z-10 text-6xl text-[#d8b16d] opacity-10 transition-all duration-700 group-hover:scale-125 group-hover:opacity-25">
                {product.rune}
            </div>

            <div className="relative h-80 overflow-hidden">

                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-[1600ms] group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

                {isPlaceholder && (
                    <div className="absolute left-6 top-6 rounded-full border border-[#c8a46b]/40 bg-[#090909]/70 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#d8b16d] backdrop-blur-md">
                        Platzhalter
                    </div>
                )}

            </div>

            <div className="relative p-8">

                <p className="uppercase tracking-[0.35em] text-xs text-[#c8a46b]">
                    {product.rune}&nbsp;&nbsp; {product.category}
                </p>

                <h3 className="mt-5 text-2xl font-semibold md:text-3xl">
                    {product.name}
                </h3>

                <p className="mt-4 min-h-[96px] leading-8 text-stone-300">
                    {product.description}
                </p>

                <div className="mt-8 flex items-center justify-between gap-4">

                    <span className="text-xl font-semibold text-[#d8b16d]">
                        {product.price.toLocaleString("de-DE", {
                            style: "currency",
                            currency: "EUR",
                        })}
                    </span>

                    <button
                        type="button"
                        onClick={onAdd}
                        className="rounded-full border border-[#c8a46b]/50 px-5 py-3 text-sm text-[#d8b16d] transition hover:bg-[#c8a46b] hover:text-[#111]"
                    >
                        In den Warenkorb
                    </button>

                </div>

            </div>
        </article>

    );
}