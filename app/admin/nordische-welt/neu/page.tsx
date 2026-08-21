import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminHeader from "../../AdminHeader";

async function createArticle(formData: FormData) {
    "use server";

    const title = String(formData.get("title") || "").trim();
    const subtitle = String(formData.get("subtitle") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const author = String(formData.get("author") || "").trim();
    const date = String(formData.get("date") || "").trim();
    const image = String(formData.get("image") || "").trim();
    const excerpt = String(formData.get("excerpt") || "").trim();

    if (!title || !category || !author || !date || !excerpt) {
        throw new Error("Bitte alle Pflichtfelder ausfüllen.");
    }

    const slug = `${title}-${Date.now()}`
        .toLowerCase()
        .replace(/ä/g, "ae")
        .replace(/ö/g, "oe")
        .replace(/ü/g, "ue")
        .replace(/ß/g, "ss")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const article = await prisma.blogArticle.create({
        data: {
            slug,
            title,
            subtitle,
            category,
            image,
            author,
            date,
            excerpt,
            published: false,
        },
    });

    redirect(`/admin/nordische-welt/${article.id}`);
}

export default function NewBlogArticlePage() {
    return (
        <main className="min-h-screen bg-[#090909] px-6 py-10 text-white">
            <div className="mx-auto max-w-5xl">
                <AdminHeader title="Nordische Welt" />

                <div className="mb-8">
                    <h2 className="font-serif text-3xl">
                        Neuer Artikel
                    </h2>

                    <p className="mt-2 text-stone-400">
                        Erstelle einen neuen Artikel für die Nordische Welt.
                    </p>
                </div>

                <form action={createArticle} className="space-y-8">
                    <section className="rounded-3xl border border-white/10 bg-[#111] p-6 md:p-8">
                        <h3 className="mb-6 font-serif text-2xl">
                            Artikeldaten
                        </h3>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm text-stone-300">
                                    Titel *
                                </label>

                                <input
                                    name="title"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none focus:border-[#c8a46b]"
                                    placeholder="z. B. Freyja – Die Göttin der Liebe"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm text-stone-300">
                                    Untertitel
                                </label>

                                <input
                                    name="subtitle"
                                    className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none focus:border-[#c8a46b]"
                                    placeholder="Kurzer Untertitel"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-stone-300">
                                    Kategorie *
                                </label>

                                <input
                                    name="category"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none focus:border-[#c8a46b]"
                                    placeholder="Mythologie"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-stone-300">
                                    Autor *
                                </label>

                                <input
                                    name="author"
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none focus:border-[#c8a46b]"
                                    placeholder="Maria Raab"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-stone-300">
                                    Datum *
                                </label>

                                <input
                                    name="date"
                                    required
                                    defaultValue={new Date().toLocaleDateString(
                                        "de-DE"
                                    )}
                                    className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none focus:border-[#c8a46b]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-stone-300">
                                    Titelbild
                                </label>

                                <input
                                    name="image"
                                    className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none focus:border-[#c8a46b]"
                                    placeholder="/blog/bild.jpg"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm text-stone-300">
                                    Kurzbeschreibung / Excerpt *
                                </label>

                                <textarea
                                    name="excerpt"
                                    required
                                    rows={4}
                                    className="w-full resize-y rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none focus:border-[#c8a46b]"
                                    placeholder="Kurze Beschreibung für die Artikelübersicht..."
                                />
                            </div>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-[#111] p-6 md:p-8">
                        <h3 className="font-serif text-2xl">
                            Artikelinhalt
                        </h3>

                        <p className="mt-3 text-stone-400">
                            Der Artikel wird zunächst ohne Abschnitt angelegt.
                            Die Abschnitte fügen wir anschließend im Editor
                            hinzu.
                        </p>
                    </section>

                    <div className="flex flex-wrap justify-end gap-3">
                        <Link
                            href="/admin/nordische-welt"
                            className="rounded-full border border-white/15 px-5 py-3 text-sm text-stone-300 transition hover:border-white/30 hover:text-white"
                        >
                            Abbrechen
                        </Link>

                        <button
                            type="submit"
                            className="rounded-full bg-[#c8a46b] px-6 py-3 text-sm font-semibold text-[#111] transition hover:bg-[#d8b16d]"
                        >
                            Artikel anlegen
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}