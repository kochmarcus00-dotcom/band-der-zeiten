"use client";

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
            className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${scrolled
                ? "bg-[#090909]/90 backdrop-blur-md border-b border-white/10"
                : "bg-transparent"
                }`}
        >
            <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 md:px-8">

                {/* Logo */}
                <a
                    href="#top"
                    className="tracking-[0.2em] md:tracking-[0.35em] text-xs md:text-sm uppercase text-[#d8b16d]"
                >
                    Maria Raab
                </a>

                {/* Navigation */}
                <nav className="flex flex-wrap justify-end gap-2 md:gap-8 text-[11px] md:text-sm">

                    <a href="#story" className="hover:text-[#d8b16d] transition">
                        Die Welt
                    </a>

                    <a href="#characters" className="hover:text-[#d8b16d] transition">
                        Figuren
                    </a>

                    <a href="#book" className="hover:text-[#d8b16d] transition">
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
                    >
                        Impressum
                    </a>

                    <a
                        href="https://www.amazon.de/Band-Zeiten-Zwischen-zwei-Welten/dp/B0H2Q2M2JG"
                        className="hidden md:block text-[#d8b16d] hover:text-white transition"
                    >
                        Amazon
                    </a>

                </nav>

            </div>
        </header>
    );
}