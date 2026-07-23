export default function Footer() {
    return (

        <footer className="border-t border-white/10 bg-[#090909] py-16">

            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-8 text-center md:flex-row">

                <div>

                    <h3 className="text-3xl">

                        Band der Zeiten

                    </h3>

                    <p className="mt-2 text-stone-400">

                        Zwischen zwei Welten

                    </p>

                </div>

                <div className="text-stone-400">

                    © 2026 Maria Raab

                </div>

                <a
                    href="https://www.amazon.de/Band-Zeiten-Zwischen-zwei-Welten/dp/B0H2Q2M2JG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d8b16d] hover:text-white transition"
                >
                    Amazon
                </a>

            </div>

        </footer>

    );
}