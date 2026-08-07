export default function Journey() {
    return (
        <section
            className="relative overflow-hidden bg-[#090909] py-24 md:py-40 lg:py-56"
        >

            {/* Hintergrund */}

            <div
                className="absolute inset-0 bg-cover bg-center opacity-[0.16]"
                style={{
                    backgroundImage: "url('/kap4.png')",
                }}
            />

            {/* Dunkler Verlauf */}

            <div className="absolute inset-0 bg-gradient-to-b from-[#090909] via-[#090909]/80 to-[#090909]" />

            {/* Inhalt */}

            <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-8 text-center">

                <p className="uppercase tracking-[0.35em] text-xs md:text-base text-[#c8a46b]">

                    Die Reise beginnt

                </p>

                <h2 className="mt-8 md:mt-10 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight">

                    Vielleicht wartet
                    <br />
                    der Steinkreis
                    <br />
                    auch auf dich.

                </h2>

                <div className="mx-auto mt-10 md:mt-16 h-px w-24 md:w-40 bg-[#c8a46b]" />

                <p className="mx-auto mt-12 md:mt-20 max-w-3xl text-base sm:text-lg md:text-xl leading-8 md:leading-10 text-stone-300">

                    Manche Geschichten liest man.

                    <br />
                    <br />

                    Manche begleiten einen noch lange,
                    nachdem die letzte Seite umgeblättert wurde.

                    <br />
                    <br />

                    <strong className="font-semibold text-white">
                        Band der Zeiten
                    </strong>{" "}
                    erzählt von zwei Welten,
                    einer unmöglichen Liebe
                    und einer Entscheidung,
                    die Vergangenheit und Zukunft
                    für immer verändern könnte.

                </p>

                <div className="mt-12 md:mt-20">

                    <a
                        href="https://www.amazon.de/Band-Zeiten-Zwischen-zwei-Welten/dp/B0H2Q2M2JG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-full bg-[#c8a46b] px-6 md:px-10 py-3 md:py-5 text-base md:text-lg font-semibold text-[#111] transition duration-300 hover:scale-105 hover:bg-[#d8b16d]"
                    >
                        Die Reise beginnen
                    </a>

                </div>

                <div className="mx-auto mt-16 md:mt-28 h-px w-20 md:w-24 bg-[#c8a46b]/40" />

                <p className="mt-8 md:mt-10 text-xs md:text-sm uppercase tracking-[0.25em] md:tracking-[0.35em] text-stone-500">

                    „Der Kreis ist geschlossen.
                    Die Wanderung beginnt.“

                </p>

            </div>

        </section>
    );
}