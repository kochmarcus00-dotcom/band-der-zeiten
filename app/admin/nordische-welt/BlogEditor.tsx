"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BlogImageUpload from "./BlogImageUpload";

type Section = {
    id: string;
    position: number;
    heading: string;
    text: string;
    image: string | null;
};

type Article = {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    image: string;
    author: string;
    date: string;
    excerpt: string;
    published: boolean;
    sections: Section[];
};

export default function BlogEditor({
    article,
}: {
    article: Article;
}) {
    const router = useRouter();

    const [title, setTitle] = useState(article.title);
    const [subtitle, setSubtitle] = useState(article.subtitle);
    const [category, setCategory] = useState(article.category);
    const [author, setAuthor] = useState(article.author);
    const [date, setDate] = useState(article.date);
    const [image, setImage] = useState(article.image);
    const [excerpt, setExcerpt] = useState(article.excerpt);
    const [published, setPublished] = useState(article.published);

    const [sections, setSections] = useState<Section[]>(
        article.sections
    );

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    function updateSection(
        id: string,
        field: "heading" | "text" | "image",
        value: string
    ) {
        setSections((current) =>
            current.map((section) =>
                section.id === id
                    ? {
                        ...section,
                        [field]: value,
                    }
                    : section
            )
        );
    }

    function addSection() {
        const nextPosition = sections.length;

        setSections((current) => [
            ...current,
            {
                id: `new-${Date.now()}`,
                position: nextPosition,
                heading: "",
                text: "",
                image: null,
            },
        ]);
    }

    function removeSection(id: string) {
        const confirmed = window.confirm(
            "Diesen Abschnitt wirklich löschen?"
        );

        if (!confirmed) {
            return;
        }

        setSections((current) =>
            current
                .filter((section) => section.id !== id)
                .map((section, index) => ({
                    ...section,
                    position: index,
                }))
        );
    }

    async function saveArticle(publishState = published) {
        setSaving(true);
        setMessage("");

        try {
            const response = await fetch(
                `/api/admin/nordische-welt/${article.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        subtitle,
                        category,
                        author,
                        date,
                        image,
                        excerpt,
                        published: publishState,
                        sections,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Speichern fehlgeschlagen."
                );
            }

            setPublished(publishState);
            setMessage("Gespeichert.");
            router.refresh();
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Speichern fehlgeschlagen."
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="space-y-8">
            <section className="rounded-3xl border border-white/10 bg-[#111] p-6 md:p-8">
                <h3 className="mb-6 font-serif text-2xl">
                    Artikeldaten
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm text-stone-300">
                            Titel
                        </label>

                        <input
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none focus:border-[#c8a46b]"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm text-stone-300">
                            Untertitel
                        </label>

                        <input
                            value={subtitle}
                            onChange={(event) =>
                                setSubtitle(event.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none focus:border-[#c8a46b]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-stone-300">
                            Kategorie
                        </label>

                        <input
                            value={category}
                            onChange={(event) =>
                                setCategory(event.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none focus:border-[#c8a46b]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-stone-300">
                            Autor
                        </label>

                        <input
                            value={author}
                            onChange={(event) =>
                                setAuthor(event.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none focus:border-[#c8a46b]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-stone-300">
                            Datum
                        </label>

                        <input
                            value={date}
                            onChange={(event) =>
                                setDate(event.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none focus:border-[#c8a46b]"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <BlogImageUpload
                            label="Titelbild"
                            value={image}
                            onChange={setImage}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm text-stone-300">
                            Kurzbeschreibung / Excerpt
                        </label>

                        <textarea
                            value={excerpt}
                            onChange={(event) =>
                                setExcerpt(event.target.value)
                            }
                            rows={5}
                            className="w-full resize-y rounded-xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none focus:border-[#c8a46b]"
                        />
                    </div>
                </div>

                <label className="mt-6 flex cursor-pointer items-center gap-3 text-sm text-stone-300">
                    <input
                        type="checkbox"
                        checked={published}
                        onChange={(event) =>
                            setPublished(event.target.checked)
                        }
                        className="h-4 w-4 accent-[#c8a46b]"
                    />

                    Artikel veröffentlichen
                </label>
            </section>

            <section className="rounded-3xl border border-white/10 bg-[#111] p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <h3 className="font-serif text-2xl">
                            Artikelinhalt
                        </h3>

                        <p className="mt-2 text-sm text-stone-400">
                            {sections.length}{" "}
                            {sections.length === 1
                                ? "Abschnitt"
                                : "Abschnitte"}
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {sections.map((section, index) => (
                        <div
                            key={section.id}
                            className="rounded-2xl border border-white/10 bg-[#090909] p-5"
                        >
                            <div className="mb-5 flex items-center justify-between gap-4">
                                <h4 className="font-semibold text-[#c8a46b]">
                                    Abschnitt {index + 1}
                                </h4>

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeSection(section.id)
                                    }
                                    className="rounded-full border border-red-500/30 px-3 py-1.5 text-xs text-red-400 transition hover:border-red-400 hover:text-red-300"
                                >
                                    Abschnitt löschen
                                </button>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm text-stone-300">
                                        Überschrift
                                    </label>

                                    <input
                                        value={section.heading}
                                        onChange={(event) =>
                                            updateSection(
                                                section.id,
                                                "heading",
                                                event.target.value
                                            )
                                        }
                                        className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-white outline-none focus:border-[#c8a46b]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-stone-300">
                                        Text
                                    </label>

                                    <textarea
                                        value={section.text}
                                        onChange={(event) =>
                                            updateSection(
                                                section.id,
                                                "text",
                                                event.target.value
                                            )
                                        }
                                        rows={10}
                                        className="w-full resize-y rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-white outline-none focus:border-[#c8a46b]"
                                    />
                                </div>

                                <BlogImageUpload
                                    label="Abschnittsbild"
                                    value={section.image || ""}
                                    onChange={(value) =>
                                        updateSection(
                                            section.id,
                                            "image",
                                            value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addSection}
                    className="mt-6 w-full rounded-2xl border border-dashed border-[#c8a46b]/40 px-5 py-4 text-sm font-semibold text-[#c8a46b] transition hover:border-[#c8a46b] hover:bg-[#c8a46b]/5"
                >
                    + Abschnitt hinzufügen
                </button>
            </section>

            <div className="sticky bottom-4 z-20 rounded-2xl border border-white/10 bg-[#111]/95 p-4 shadow-2xl backdrop-blur">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        {message && (
                            <span
                                className={
                                    message === "Gespeichert."
                                        ? "text-sm text-green-400"
                                        : "text-sm text-red-400"
                                }
                            >
                                {message}
                            </span>
                        )}

                        {!message && (
                            <span className="text-sm text-stone-500">
                                {published
                                    ? "Artikel ist veröffentlicht"
                                    : "Artikel ist ein Entwurf"}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => saveArticle(false)}
                            disabled={saving}
                            className="rounded-full border border-white/15 px-5 py-3 text-sm text-stone-300 transition hover:border-[#c8a46b] hover:text-[#c8a46b] disabled:opacity-50"
                        >
                            {saving
                                ? "Speichern …"
                                : "Als Entwurf speichern"}
                        </button>

                        <button
                            type="button"
                            onClick={() => saveArticle(true)}
                            disabled={saving}
                            className="rounded-full bg-[#c8a46b] px-6 py-3 text-sm font-semibold text-[#111] transition hover:bg-[#d8b16d] disabled:opacity-50"
                        >
                            {saving
                                ? "Speichern …"
                                : published
                                    ? "Änderungen speichern"
                                    : "Veröffentlichen"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}