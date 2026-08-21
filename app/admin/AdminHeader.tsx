import Link from "next/link";
import LogoutButton from "./LogoutButton";
import SessionTimer from "./SessionTimer";

export default function AdminHeader({
    title,
}: {
    title: string;
}) {
    return (
        <header className="mb-10 border-b border-white/10 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-5">
                <div className="flex items-center gap-8">
                    <Link
                        href="/admin"
                        className="font-serif text-xl font-semibold text-white hover:text-[#c8a46b]"
                    >
                        VikingShop Admin
                    </Link>

                    <nav className="flex flex-wrap items-center gap-5 text-sm">
                        <Link
                            href="/admin/bestellungen"
                            className={
                                title === "Bestellungen"
                                    ? "text-[#c8a46b]"
                                    : "text-stone-400 hover:text-white"
                            }
                        >
                            Bestellungen
                        </Link>

                        <Link
                            href="/admin/produkte"
                            className={
                                title === "Produkte"
                                    ? "text-[#c8a46b]"
                                    : "text-stone-400 hover:text-white"
                            }
                        >
                            Produkte
                        </Link>

                        <Link
                            href="/admin/nordische-welt"
                            className={
                                title === "Nordische Welt"
                                    ? "text-[#c8a46b]"
                                    : "text-stone-400 hover:text-white"
                            }
                        >
                            Nordische Welt
                        </Link>
                    </nav>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <SessionTimer />

                    <LogoutButton />

                    <Link
                        href="/vikingshop"
                        className="rounded-full border border-white/15 px-4 py-2 text-sm text-stone-300 transition hover:border-[#c8a46b] hover:text-[#c8a46b]"
                    >
                        Zum Shop
                    </Link>

                    <Link
                        href="/"
                        className="rounded-full border border-white/15 px-4 py-2 text-sm text-stone-300 transition hover:border-[#c8a46b] hover:text-[#c8a46b]"
                    >
                        Zur Hauptseite
                    </Link>
                </div>
            </div>
        </header>
    );
}