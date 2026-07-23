export default function Characters() {
    return (
        <section
            id="characters"
            className="bg-[#090909] py-40"
        >

            <div className="mx-auto max-w-7xl px-8">

                <p className="mb-6 uppercase tracking-[0.45em] text-[#c8a46b]">
                    Die Hauptfiguren
                </p>

                <h2 className="mb-24 text-5xl md:text-7xl font-semibold">
                    Zwei Frauen.
                    <br />
                    Zwei Welten.
                </h2>

                <div className="grid gap-20 lg:grid-cols-2">

                    {/* ALVA */}

                    <div className="border-l border-[#c8a46b]/30 pl-8">

                        <h3 className="text-4xl mb-8">
                            Alva
                        </h3>

                        <p className="text-stone-300 leading-9">

                            Tochter des Jarls Eirik.
                            Schildmaid.
                            Kämpferin.
                            Stark genug, jedem Gegner entgegenzutreten –
                            aber niemals vorbereitet auf das,
                            was ihr eigenes Herz von ihr verlangen wird.

                        </p>

                    </div>

                    {/* MAYA */}

                    <div className="border-l border-[#c8a46b]/30 pl-8">

                        <h3 className="text-4xl mb-8">
                            Maya
                        </h3>

                        <p className="text-stone-300 leading-9">

                            Eine Fremde.
                            Niemand weiß,
                            woher sie kommt.
                            Mit ihr erscheinen Fragen,
                            die selbst die alten Götter
                            nicht beantworten können.

                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}