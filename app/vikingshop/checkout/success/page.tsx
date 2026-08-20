export default function CheckoutSuccessPage() {
    return (
        <main className="min-h-screen bg-[#090909] px-6 py-24 text-white">
            <div className="mx-auto max-w-2xl text-center">

                <div className="mb-8 text-6xl">
                    ✓
                </div>

                <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#c8a46b]">
                    Zahlung erfolgreich
                </p>

                <h1 className="font-serif text-4xl sm:text-5xl">
                    Vielen Dank für deine Bestellung.
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-stone-400">
                    Deine Zahlung wurde erfolgreich verarbeitet.
                    Deine Bestellung wird nun für den Versand vorbereitet.
                </p>

                <a
                    href="/vikingshop"
                    className="mt-10 inline-block rounded-full bg-[#c8a46b] px-8 py-4 font-semibold text-[#111] transition hover:bg-[#d8b16d]"
                >
                    Zurück zum VikingShop
                </a>

            </div>
        </main>
    );
}