export default function Footer() {
    return (

        <footer className="relative overflow-hidden bg-[#090909] pt-40 pb-16">

            {/* Hintergrund */}

            <div
                className="absolute inset-0 opacity-[0.06] bg-cover bg-center"
                style={{
                    backgroundImage: "url('/kap6.png')",
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-[#090909] via-[#090909]/95 to-[#090909]" />

            <div className="relative z-10 mx-auto max-w-6xl px-8 text-center">

                {/* Linie */}

                <div className="mx-auto h-px w-40 bg-[#c8a46b]" />

                {/* Titel */}

                <h2 className="mt-16 text-5xl md:text-7xl font-semibold">

                    Band der Zeiten

                </h2>

                <p className="mt-5 text-2xl text-stone-400">

                    Zwischen zwei Welten

                </p>

                {/* Gedanke */}

                <p className="mx-auto mt-20 max-w-3xl text-2xl leading-[1.8] text-stone-300">

                    Nicht jede Reise endet dort,
                    wo sie begonnen hat.

                    <br /><br />

                    Manche verändern den Weg.
                    Andere verändern den Menschen.

                </p>

                {/* Dank */}

                <p className="mt-24 text-lg leading-9 text-stone-400">

                    Danke,
                    dass du ein Stück dieser Welt
                    mit mir gegangen bist.

                </p>

                {/* Navigation */}

                <div className="mt-20 flex flex-wrap justify-center gap-10 text-sm uppercase tracking-[0.25em]">

                    <a
                        href="/"
                        className="transition hover:text-[#c8a46b]"
                    >
                        Startseite
                    </a>

                    <a
                        href="/nordische-welt"
                        className="transition hover:text-[#c8a46b]"
                    >
                        Nordische Welt
                    </a>

                    <a
                        href="/datenschutz"
                        className="transition hover:text-[#c8a46b]"
                    >
                        Datenschutz
                    </a>

                    <a
                        href="/impressum"
                        className="transition hover:text-[#c8a46b]"
                    >
                        Impressum
                    </a>

                </div>

                {/* Amazon */}

                <div className="mt-14">

                    <a
                        href="https://www.amazon.de/Band-Zeiten-Zwischen-zwei-Welten/dp/B0H2Q2M2JG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#c8a46b] transition hover:text-white"
                    >
                        Roman bei Amazon entdecken →
                    </a>

                </div>

                {/* Trennlinie */}

                <div className="mx-auto mt-24 h-px w-20 bg-[#c8a46b]/30" />

                {/* Schluss */}

                <p className="mt-10 italic text-stone-500">

                    „Der Kreis ist geschlossen.
                    Die Wanderung beginnt.“

                </p>

                {/* Copyright */}

                <div className="mt-24 text-sm text-stone-600 leading-8">

                    © 2026 Maria Raab

                    <br />

                    Alle Rechte vorbehalten.

                    <br /><br />

                    E-Mail:
                    nordwind@valhalla-im-herzen.de

                    <br />

                    Website:
                    https://www.valhalla-im-herzen.de

                </div>

            </div>

        </footer>

    );
}