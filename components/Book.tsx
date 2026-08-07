import Image from "next/image";

export default function Book() {
    return (
        <section
            id="book"
            className="bg-[#090909] py-24 md:py-44"
        >

            <div className="mx-auto max-w-7xl px-6 md:px-8">

                {/* Überschrift */}

                <div className="text-center">

                    <p className="uppercase tracking-[0.35em] text-xs md:text-base text-[#c8a46b]">

                        Die Welt von Band der Zeiten

                    </p>

                    <h2 className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight">

                        Nimm ein Stück
                        <br />
                        dieser Welt mit.

                    </h2>

                    <p className="mx-auto mt-10 max-w-3xl text-lg md:text-xl leading-10 text-stone-300">

                        Manche Geschichten enden mit der letzten Seite.
                        Andere begleiten dich noch lange danach.
                        Entdecke den Roman und den offiziellen Soundtrack –
                        zwei Wege, dieselbe Reise zu erleben.

                    </p>

                    <div className="mx-auto mt-10 md:mt-16 h-px w-24 md:w-40 bg-[#c8a46b]" />

                </div>


                {/* Produkte */}

                <div className="mt-16 md:mt-28 grid gap-10 md:gap-20 lg:grid-cols-2">


                    {/* ================================================= */}

                    {/* ROMAN */}

                    {/* ================================================= */}

                    <div className="group rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.05] via-white/[0.025] to-white/[0.02] p-10 backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:border-[#c8a46b]/40 hover:shadow-[0_50px_120px_rgba(0,0,0,.65),0_0_90px_rgba(255,190,80,.10)]">

                        <p className="uppercase tracking-[0.55em] text-xs text-[#d8b16d]/80">

                            Artefakt I

                        </p>

                        <div className="relative mt-10 flex justify-center">

                            <div className="artifact-spot" />

                            <div className="artifact-glow-gold" />

                            <Image
                                src="/cover.jpg"
                                alt="Band der Zeiten"
                                width={220}
                                height={340}
                                className="artifact-cover rounded-xl shadow-[0_40px_80px_rgba(0,0,0,.65)]"
                            />

                        </div>

                        <h3 className="mt-12 text-2xl md:text-3xl font-semibold">

                            Band der Zeiten

                        </h3>

                        <p className="mt-2 text-lg md:text-xl text-stone-400">

                            Zwischen zwei Welten

                        </p>

                        <p className="mt-8 text-base md:text-lg leading-8 md:text-base md:text-lg leading-8 md:text-base md:text-lg leading-8 md:leading-9 text-stone-300">

                            Der Auftakt einer epischen Zeitreise zwischen
                            Gegenwart und Wikingerzeit. Eine Geschichte über
                            Liebe, Mut, Verrat und die Macht des Schicksals.

                        </p>

                        <div className="mt-10 flex flex-wrap gap-3">

                            {[
                                "306 Seiten",
                                "Taschenbuch",
                                "Zeitreise",
                                "Wikinger",
                                "Nordische Mythologie",
                                "Historischer Roman"
                            ].map((item) => (

                                <span
                                    key={item}
                                    className="rounded-full border border-[#c8a46b]/30 px-4 py-2 text-sm text-stone-300"
                                >
                                    {item}
                                </span>

                            ))}

                        </div>

                        <a
                            href="https://www.amazon.de/Band-Zeiten-Zwischen-zwei-Welten/dp/B0H2Q2M2JG"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-12 inline-flex rounded-full bg-[#c8a46b] px-6 md:px-8 py-3 md:py-4 font-semibold text-[#111] transition hover:scale-105"
                        >

                            Bei Amazon entdecken

                        </a>

                    </div>



                    {/* ================================================= */}

                    {/* SOUNDTRACK */}

                    {/* ================================================= */}

                    <div className="group rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.05] via-white/[0.025] to-white/[0.02] p-6 md:p-6 md:p-10 backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:border-[#5db8ff]/40 hover:shadow-[0_50px_120px_rgba(0,0,0,.65),0_0_90px_rgba(90,180,255,.18)]">

                        <p className="uppercase tracking-[0.55em] text-xs text-[#d8b16d]/80">

                            Artefakt II

                        </p>

                        <div className="relative mt-10 flex justify-center">

                            <div className="artifact-spot" />

                            <div className="artifact-glow-blue" />

                            <Image
                                src="/cover.jpg"
                                alt="Original Soundtrack"
                                width={220}
                                height={340}
                                className="artifact-cover rounded-xl shadow-[0_40px_80px_rgba(0,0,0,.65)]"
                            />

                        </div>

                        <h3 className="mt-12 text-2xl md:text-3xl font-semibold">

                            Original Soundtrack

                        </h3>

                        <p className="mt-2 text-lg md:text-xl text-stone-400">

                            Musik aus der Welt von Band der Zeiten

                        </p>

                        <p className="mt-8 leading-9 text-stone-300">

                            Atmosphärische Kompositionen zwischen nordischer
                            Mystik, epischen Schlachten und leisen Momenten.
                            Der Soundtrack begleitet die Reise von Maya und
                            Alva und lässt die Welt des Romans musikalisch
                            weiterleben.

                        </p>

                        <div className="mt-10 flex flex-wrap gap-3">

                            {[
                                "Original Soundtrack",
                                "Filmmusik",
                                "Digital",
                                "Amazon Music",
                                "Spotify",
                                "Demnächst"
                            ].map((item) => (

                                <span
                                    key={item}
                                    className="rounded-full border border-[#c8a46b]/30 px-4 py-2 text-sm text-stone-300"
                                >
                                    {item}
                                </span>

                            ))}

                        </div>

                        <button
                            className="mt-12 rounded-full border border-[#c8a46b]/40 px-6 md:px-8 py-3 md:py-4 text-[#c8a46b] transition hover:bg-[#c8a46b] hover:text-[#111]"
                        >

                            Bald verfügbar

                        </button>

                    </div>

                </div>


                {/* Footer */}

                <div className="mt-16 md:mt-28 text-center">

                    <p className="uppercase tracking-[0.35em] text-[#c8a46b]">

                        Erhältlich bei

                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8 text-stone-400">

                        <span>Amazon</span>
                        <span>Kindle</span>
                        <span>Amazon Music</span>
                        <span>Spotify</span>

                    </div>

                </div>

            </div>

        </section>
    );
}