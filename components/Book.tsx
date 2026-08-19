import Image from "next/image";
import Link from "next/link";

export default function Book() {
    return (
        <section
            id="book"
            className="relative overflow-hidden bg-[#090909] py-24 md:py-44"
        >
            {/* Mystisches Licht */}
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8a46b]/10 blur-[160px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">

                {/* Überschrift */}
                <div className="text-center">

                    <p className="uppercase tracking-[0.35em] text-xs md:text-base text-[#c8a46b]">
                        Freyjas Feder
                    </p>

                    <h2 className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight">
                        Freyjas
                        <br />
                        Schatzkammer
                    </h2>

                    <div className="mx-auto mt-10 md:mt-16 h-px w-24 md:w-40 bg-[#c8a46b]" />

                    <p className="mx-auto mt-10 max-w-3xl text-lg md:text-xl leading-10 text-stone-300">
                        Artefakte, Erinnerungen und kleine Dinge
                        <br className="hidden md:block" />
                        aus den Welten von Freyjas Feder.
                    </p>

                </div>

                {/* Schatzkammer */}
                <div className="mx-auto mt-16 md:mt-24 max-w-5xl">

                    <div className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.06] via-white/[0.025] to-white/[0.015] p-8 md:p-14 backdrop-blur-xl transition duration-700 hover:-translate-y-2 hover:border-[#c8a46b]/40 hover:shadow-[0_50px_120px_rgba(0,0,0,.65),0_0_100px_rgba(200,164,107,.10)]">

                        {/* Goldener Glow */}
                        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8a46b]/10 blur-[120px] transition duration-700 group-hover:scale-150" />

                        <div className="relative z-10 flex flex-col items-center text-center">

                            {/* Logo */}
                            <div className="mb-10">
                                <Image
                                    src="/logo-freyjas-feder.png"
                                    alt="Freyjas Feder"
                                    width={240}
                                    height={80}
                                    className="mx-auto h-auto w-[180px] md:w-[240px] opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                                />
                            </div>

                            <p className="uppercase tracking-[0.5em] text-xs text-[#d8b16d]/80">
                                Eine Welt voller Geschichten
                            </p>

                            <h3 className="mt-6 text-3xl md:text-5xl font-semibold">
                                Betritt Freyjas Schatzkammer
                            </h3>

                            <p className="mt-6 max-w-2xl text-base md:text-lg leading-8 md:leading-9 text-stone-300">
                                Bücher, Lesezeichen, Notizbücher, Kleidung
                                und besondere Stücke aus den Welten von
                                Freyjas Feder.
                            </p>

                            <Link
                                href="/vikingshop"
                                className="mt-10 inline-flex items-center gap-4 rounded-full bg-[#c8a46b] px-8 md:px-10 py-4 md:py-5 font-semibold text-[#111] transition duration-300 hover:scale-105 hover:bg-[#d8b16d]"
                            >
                                Schatzkammer betreten
                                <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}