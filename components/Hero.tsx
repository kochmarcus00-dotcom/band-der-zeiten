import Image from "next/image";

export default function Hero() {
    return (
        <section
            id="top"
            className="relative min-h-screen overflow-hidden"
        >

            {/* Hintergrund */}

            <Image
                src="/hero-new.png"
                alt="Band der Zeiten"
                fill
                priority
                sizes="100vw"
                className="hero-image object-cover object-center"
            />

            {/* Kaltes Nordlicht */}

            <div
                className="
                absolute
                -top-40
                left-1/2
                -translate-x-1/2
                w-[900px] md:w-[1600px]
h-[500px] md:h-[700px]
                rounded-full
                bg-cyan-300/20
                blur-[180px]
                pointer-events-none
            "
            />

            {/* Goldenes Morgenlicht */}

            <div
                className="
                absolute
                bottom-0
                left-0
                w-[400px] md:w-[700px]
h-[300px] md:h-[500px]
                rounded-full
                bg-[#c8a46b]/20
                blur-[160px]
                pointer-events-none
            "
            />

            {/* Lichtstrahlen */}

            <div className="hero-rays" />

            {/* Overlay */}

            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(90deg, rgba(9,9,9,.72) 0%, rgba(9,9,9,.45) 35%, rgba(9,9,9,.15) 60%, rgba(9,9,9,0) 100%)",
                }}
            />

            {/* Unterer Verlauf */}

            <div
                className="
                absolute
                bottom-0
                left-0
                right-0
                h-80
                bg-gradient-to-t
                from-[#090909]
                via-[#090909]/20
                to-transparent
            "
            />

            {/* Inhalt */}

            <div className="relative z-10 flex h-full items-center pt-24 md:pt-20 lg:pt-32">

                <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">

                    <div className="max-w-xl">

                        <div className="gold-line mb-8 h-px w-24 bg-[#c8a46b]" />

                        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#c8a46b] md:text-sm">
                            Historischer Liebesroman
                        </p>

                        <h1 className="hero-title text-5xl font-semibold leading-none text-white sm:text-6xl md:text-7xl xl:text-8xl">
                            Band
                            <br />
                            der Zeiten
                        </h1>

                        <h2 className="mt-6 text-lg md:text-2xl xl:text-3xl text-stone-300">
                            Zwischen zwei Welten
                        </h2>

                        <p className="mt-8 md:mt-10 max-w-lg text-sm sm:text-base md:text-lg leading-7 md:leading-8 text-stone-300">
                            Im rauen Norwegen des 9. Jahrhunderts stellt die
                            Begegnung zweier Frauen alles infrage, woran sie
                            jemals geglaubt haben. Zwischen Ehre, Verrat und den
                            alten Göttern beginnt eine Liebe, die niemals hätte
                            entstehen dürfen.
                        </p>

                        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4">

                            <a
                                href="#story"
                                className="
                                rounded-full
                                bg-[#c8a46b]
                                px-7
                                py-3
                                font-semibold
                                text-[#111]
                                transition
                                duration-300
                                hover:scale-105
                                hover:bg-[#d8b16d]
                            "
                            >
                                Geschichte entdecken
                            </a>

                            <a
                                href="https://www.amazon.de/Band-Zeiten-Zwischen-zwei-Welten/dp/B0H2Q2M2JG"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                rounded-full
                                border
                                border-white/40
                                px-7
                                py-3
                                transition
                                duration-300
                                hover:border-white
                                hover:bg-white
                                hover:text-black
                            "
                            >
                                Bei Amazon ansehen
                            </a>

                        </div>

                    </div>

                </div>

            </div>

            {/* Scroll */}

            <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[#c8a46b]">

                ↓

            </div>

        </section>
    );
}