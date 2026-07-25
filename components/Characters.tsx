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

                        <h3 className="mb-8 text-4xl">
                            Alva
                        </h3>

                        <p className="leading-9 text-stone-300">

                            Alva ist die Tochter des mächtigen Jarls Eirik und
                            wurde von klein auf zu einer Schildmaid erzogen.
                            Mut, Disziplin und die Treue zu ihrem Volk bestimmen
                            ihr Leben. Sie kennt nur eine Welt – die Welt der
                            Wikinger, ihrer Götter und ihrer Ahnen.

                            <br /><br />

                            Doch mit Mayas Ankunft gerät alles ins Wanken.
                            Zum ersten Mal muss Alva sich entscheiden, ob sie
                            den Erwartungen ihres Volkes folgt oder ihrem
                            eigenen Herzen vertraut.

                        </p>

                    </div>

                    {/* MAYA */}

                    <div className="border-l border-[#c8a46b]/30 pl-8">

                        <h3 className="mb-8 text-4xl">
                            Maya
                        </h3>

                        <p className="leading-9 text-stone-300">

                            Maya stammt aus der Gegenwart. Nach einer
                            rätselhaften Begegnung mit einem uralten Steinkreis
                            findet sie sich plötzlich im Norwegen des
                            9. Jahrhunderts wieder. Alles, was ihr vertraut
                            war, ist verschwunden.

                            <br /><br />

                            Zwischen fremden Menschen, alten Göttern und einer
                            Welt voller Gefahren sucht sie nach einem Weg
                            zurück. Doch je länger sie bleibt, desto mehr stellt
                            sich die Frage, ob ihre Zukunft wirklich dort liegt,
                            woher sie gekommen ist.

                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}