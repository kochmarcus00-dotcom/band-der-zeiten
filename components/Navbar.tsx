"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
                scrolled
                    ? "bg-[#090909]/90 backdrop-blur-md border-b border-white/10"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 md:px-8">

                {/* Freyjas Feder Logo */}
                <a
                    href="/"
                    className="flex items-center shrink-0"
                    aria-label="Freyjas Feder – Startseite"
                >
                    <Image
                        src="/logo-freyjas-feder.png"
                        alt="Freyjas Feder"
                        width={150}
                        height={50}
                        priority
                        className="h-auto w-[105px] md:w-[150px]"
                    />
                </a>

                {/* Navigation */}
                <nav className="flex flex-wrap justify-end gap-2 md:gap-8 text-[11px] md:text-sm">

                    <a
                        href="/#story"
                        className="hover:text-[#d8b16d] transition"
                    >
                        Die Welt
                    </a>

                    <a
                        href="/#characters"
                        className="hover:text-[#d8b16d] transition"
                    >
                        Figuren
                    </a>

                    <a
                        href="/#book"
                        className="hover:text-[#d8b16d] transition"
                    >
                        Buch
                    </a>

                    <a
                        href="/nordische-welt"
                        className="hover:text-[#d8b16d] transition"
                    >
                        Nordische Welt
                    </a>

                    <a
                        href="/datenschutz"
                        className="hover:text-[#d8b16d] transition"
                    >
                        Datenschutz
                    </a>

                    <a
                        href="/impressum"
                        className="hover:text-[#d8b16d] transition"
                    >
                        Impressum
                    </a>

                    <a
                        href="https://www.amazon.de/Band-Zeiten-Zwischen-zwei-Welten/dp/B0H2Q2M2JG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:block text-[#d8b16d] hover:text-white transition"
                    >
                        Amazon
                    </a>

                </nav>

            </div>
        </header>
    );
}