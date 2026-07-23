import Image from "next/image";

export default function Hero() {
    return (
        <section
            id="top"
            className="relative h-screen overflow-hidden"
        >

            {/* Hintergrund */}
            <Image
                src="/hero-new.png"
                alt="Band der Zeiten"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
            />

            {/* Overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(9,9,9,.72) 0%, rgba(9,9,9,.45) 35%, rgba(9,9,9,.15) 60%, rgba(9,9,9,0) 100%)",
                }}
            />

            {/* Verlauf unten */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#090909] to-transparent" />

            {/* Inhalt */}
            <div className="relative z-10 flex h-full items-center pt-20 lg:pt-32">

                <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

                    <div className="max-w-xl">

                        <div className="mb-8 h-px w-24 bg-[#c8a46b]" />

                        <p className="mb-6 text-xs md:text-sm uppercase tracking-[0.45em] text-[#c8a46b]">
                            Historischer Liebesroman
                        </p>

                        <h1 className="font-semibold leading-none text-white text-5xl sm:text-6xl md:text-7xl xl:text-8xl">
                            Band
                            <br />
                            der Zeiten
                        </h1>

                        <h2 className="mt-6 text-xl md:text-2xl xl:text-3xl text-stone-300">
                            Zwischen zwei Welten
                        </h2>

                        <p className="mt-10 max-w-lg text-base md:text-lg leading-8 text-stone-300">
                            Im rauen Norwegen des 9. Jahrhunderts stellt die Begegnung
                            zweier Frauen alles infrage, woran sie jemals geglaubt haben.
                            Zwischen Ehre, Verrat und den alten Göttern beginnt eine Liebe,
                            die niemals hätte entstehen dürfen.
                        </p>

                        <div className="mt-12 flex flex-wrap gap-4">

                            <a
                                href="#story"
                                className="rounded-full bg-[#c8a46b] px-7 py-3 font-semibold text-[#111] transition hover:bg-[#d7b67c]"
                            >
                                Geschichte entdecken
                            </a>

                            <a
                                href="https://www.amazon.de/Band-Zeiten-Zwischen-zwei-Welten/dp/B0H2Q2M2JG"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-white/40 px-7 py-3 transition hover:bg-white hover:text-black"
                            >
                                Bei Amazon ansehen
                            </a>

                        </div>

                    </div>

                </div>

            </div>

            {/* Scroll */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#c8a46b] animate-bounce">

                ↓

            </div>

        </section>
    );
}