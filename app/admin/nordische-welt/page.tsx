import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminHeader from "../AdminHeader";
import DeleteBlogArticleButton from "./DeleteBlogArticleButton";

export default async function NordischeWeltAdmin() {
    const articles = await prisma.blogArticle.findMany({
        orderBy: {
            updatedAt: "desc",
        },
        include: {
            sections: true,
        },
    });

    return (
        <main className="min-h-screen bg-[#090909] px-6 py-10 text-white">
            <div className="mx-auto max-w-7xl">
                <AdminHeader title="Nordische Welt" />

                <div className="mb-8 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="font-serif text-3xl text-white">
                            Artikel
                        </h2>

                        <p className="mt-2 text-stone-400">
                            Nordische Welt verwalten und neue Artikel erstellen.
                        </p>
                    </div>

                    <Link
                        href="/admin/nordische-welt/neu"
                        className="rounded-full bg-[#c8a46b] px-5 py-3 text-sm font-semibold text-[#111] transition hover:bg-[#d8b16d]"
                    >
                        + Neuer Artikel
                    </Link>
                </div>

                {articles.length === 0 ? (
                    <div className="rounded-3xl border border-white/10 bg-[#111] p-10 text-center">
                        <h3 className="font-serif text-2xl text-white">
                            Noch keine Artikel
                        </h3>

                        <p className="mt-3 text-stone-400">
                            Lege den ersten Artikel der Nordischen Welt an.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {articles.map((article) => (
                            <article
                                key={article.id}
                                className="rounded-3xl border border-white/10 bg-[#111] p-6"
                            >
                                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-center gap-5">
                                        {article.image ? (
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="h-20 w-28 rounded-xl object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-20 w-28 items-center justify-center rounded-xl border border-white/10 text-xs text-stone-500">
                                                Kein Bild
                                            </div>
                                        )}

                                        <div>
                                            <h3 className="font-serif text-2xl text-white">
                                                {article.title}
                                            </h3>

                                            <p className="mt-1 text-sm text-stone-400">
                                                {article.category}
                                                {" · "}
                                                {article.author}
                                            </p>

                                            <p className="mt-2 text-sm text-stone-500">
                                                {article.sections.length}{" "}
                                                {article.sections.length === 1
                                                    ? "Abschnitt"
                                                    : "Abschnitte"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3">
                                        <Link
                                            href={`/nordische-welt/${article.slug}`}
                                            target="_blank"
                                            className="rounded-full border border-white/15 px-4 py-2 text-sm text-stone-300 transition hover:border-[#c8a46b] hover:text-[#c8a46b]"
                                        >
                                            Ansehen
                                        </Link>

                                        <Link
                                            href={`/admin/nordische-welt/${article.id}`}
                                            className="rounded-full border border-white/15 px-4 py-2 text-sm text-stone-300 transition hover:border-[#c8a46b] hover:text-[#c8a46b]"
                                        >
                                            Bearbeiten
                                        </Link>

                                        <DeleteBlogArticleButton
                                            id={article.id}
                                            title={article.title}
                                        />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}