import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
    title: "Impressum | Band der Zeiten",
    description: "Impressum der Website Band der Zeiten.",
};

export default function ImpressumPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#090909] text-[#f5f1eb]">

                <section className="mx-auto max-w-5xl px-6 py-32">

                    <a
                        href="/"
                        className="mb-10 inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-[#c8a46b] hover:text-white transition"
                    >
                        ← Zurück zur Startseite
                    </a>

                    <h1>Datenschutz</h1>

                    <div className="mb-8 h-px w-24 bg-[#c8a46b]" />

                    <p className="uppercase tracking-[0.45em] text-sm text-[#c8a46b]">
                        Rechtliches
                    </p>

                    <h1 className="mt-4 text-5xl md:text-6xl font-semibold">
                        Impressum
                    </h1>

                    <p className="mt-6 max-w-3xl text-stone-400 leading-8">
                        Angaben gemäß § 5 TMG.
                    </p>

                    <div className="mt-20 space-y-14">

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-[#c8a46b]">
                                Verantwortlich für den Inhalt
                            </h2>

                            <p className="leading-8 text-stone-300">
                                Maria Raab
                                <br />
                                Straße Hausnummer
                                <br />
                                PLZ Ort
                                <br />
                                Deutschland
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-[#c8a46b]">
                                Kontakt
                            </h2>

                            <p className="leading-8 text-stone-300">
                                E-Mail: info@vikikg.de
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-[#c8a46b]">
                                Verantwortlich nach § 18 Abs. 2 MStV
                            </h2>

                            <p className="leading-8 text-stone-300">
                                Maria Raab
                                <br />
                                Anschrift wie oben
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-[#c8a46b]">
                                Haftung für Inhalte
                            </h2>

                            <p className="leading-8 text-stone-300">
                                Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt.
                                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                                kann jedoch keine Gewähr übernommen werden.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-[#c8a46b]">
                                Urheberrecht
                            </h2>

                            <p className="leading-8 text-stone-300">
                                Sämtliche Inhalte, Bilder und Texte dieser Website unterliegen,
                                sofern nicht anders angegeben, dem Urheberrecht. Eine Verwendung
                                außerhalb der gesetzlichen Grenzen bedarf der vorherigen
                                schriftlichen Zustimmung.
                            </p>
                        </section>

                    </div>

                </section>

            </main>
            <Footer />
        </>
    );
}