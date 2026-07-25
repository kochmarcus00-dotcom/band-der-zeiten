import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
    title: "Datenschutz | Band der Zeiten",
    description: "Datenschutzerklärung der Website Band der Zeiten.",
};

export default function DatenschutzPage() {
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
                        Datenschutz
                    </h1>

                    <p className="mt-6 text-stone-400 max-w-3xl leading-8">
                        Der Schutz Ihrer persönlichen Daten ist uns wichtig.
                        Nachfolgend informieren wir Sie darüber, welche Daten beim Besuch
                        dieser Website verarbeitet werden.
                    </p>

                    <div className="mt-20 space-y-14">

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-[#c8a46b]">
                                Verantwortlicher
                            </h2>

                            <p className="leading-8 text-stone-300">
                                Maria Raab
                                <br />
                                (Anschrift folgt im Impressum)
                                <br />
                                E-Mail: ...
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-[#c8a46b]">
                                Zugriffsdaten
                            </h2>

                            <p className="leading-8 text-stone-300">
                                Beim Besuch dieser Website werden automatisch technische
                                Informationen wie Browsertyp, Betriebssystem, Datum und Uhrzeit
                                des Zugriffs sowie die IP-Adresse verarbeitet. Diese Daten dienen
                                ausschließlich der technischen Bereitstellung und Sicherheit der
                                Website.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-[#c8a46b]">
                                Cookies
                            </h2>

                            <p className="leading-8 text-stone-300">
                                Diese Website verwendet nur technisch notwendige Cookies, sofern
                                dies für den Betrieb erforderlich ist.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-[#c8a46b]">
                                Externe Links
                            </h2>

                            <p className="leading-8 text-stone-300">
                                Diese Website enthält Links zu externen Anbietern, beispielsweise
                                Amazon. Für deren Inhalte und Datenschutzbestimmungen sind
                                ausschließlich die jeweiligen Betreiber verantwortlich.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold text-[#c8a46b]">
                                Ihre Rechte
                            </h2>

                            <p className="leading-8 text-stone-300">
                                Sie haben jederzeit das Recht auf Auskunft, Berichtigung,
                                Löschung, Einschränkung der Verarbeitung sowie Widerspruch gegen
                                die Verarbeitung Ihrer personenbezogenen Daten im Rahmen der
                                gesetzlichen Bestimmungen.
                            </p>
                        </section>

                    </div>

                </section>

            </main>
            <Footer />
        </>
    );
}