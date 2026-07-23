import Image from "next/image";

export default function Book() {
    return (

        <section
            id="book"
            className="bg-[#090909] py-40"
        >

            <div className="mx-auto max-w-7xl px-8">

                <div className="grid items-center gap-24 lg:grid-cols-2">

                    {/* Cover */}

                    <div className="flex justify-center">

                        <Image
                            src="/cover.jpg"
                            alt="Band der Zeiten"
                            width={450}
                            height={680}
                            className="rounded-xl shadow-[0_60px_120px_rgba(0,0,0,.55)]"
                        />

                    </div>

                    {/* Inhalt */}

                    <div>

                        <p className="uppercase tracking-[0.45em] text-[#d8b16d]">

                            Das Buch

                        </p>

                        <h2 className="mt-8 text-6xl font-semibold">

                            Band der Zeiten

                        </h2>

                        <h3 className="mt-4 text-3xl text-stone-300">

                            Zwischen zwei Welten

                        </h3>

                        <p className="mt-10 text-xl leading-10 text-stone-300">

                            Eine Geschichte über Liebe,
                            Mut,
                            Verrat
                            und die Suche nach Wahrheit –
                            eingebettet in die raue Welt
                            der Wikingerzeit.

                        </p>

                        {/* Fakten */}

                        <div className="mt-14 flex flex-wrap gap-3">

                            {[
                                "306 Seiten",
                                "Historischer Liebesroman",
                                "Wikingerzeit",
                                "Nordische Mythologie",
                                "Zeitreise",
                                "Taschenbuch"
                            ].map((item) => (

                                <span
                                    key={item}
                                    className="rounded-full border border-[#d8b16d]/40 px-5 py-2 text-sm text-stone-300"
                                >
                                    {item}
                                </span>

                            ))}

                        </div>

                        {/* Button */}

                        <div className="mt-16">

                            <a
                                href="https://www.amazon.de/Band-Zeiten-Zwischen-zwei-Welten/dp/B0H2Q2M2JG"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-[#d8b16d] px-10 py-5 font-semibold text-[#111] transition duration-300 hover:scale-105"
                            >
                                Jetzt bei Amazon ansehen
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );
}