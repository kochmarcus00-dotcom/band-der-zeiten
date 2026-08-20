"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

type Props = {
    createProduct: (
        formData: FormData
    ) => Promise<{ success: boolean; message?: string } | void>;
};

function SaveButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-[#c8a46b] px-7 py-3 font-semibold text-[#111] transition hover:bg-[#d8b16d] disabled:cursor-wait disabled:opacity-50"
        >
            {pending ? "Speichert..." : "Produkt speichern"}
        </button>
    );
}

export default function NewProductForm({ createProduct }: Props) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");

        const form = event.currentTarget;
        const formData = new FormData(form);

        const file = formData.get("imageFile");

        if (file instanceof File && file.size > 0) {
            if (!file.type.startsWith("image/")) {
                setError("Bitte nur Bilddateien hochladen.");
                return;
            }

            if (file.size > 4 * 1024 * 1024) {
                setError("Das Bild darf maximal 4 MB groß sein.");
                return;
            }

            setUploading(true);

            try {
                const uploadData = new FormData();
                uploadData.append("file", file);

                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: uploadData,
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.error ||
                        "Bild konnte nicht hochgeladen werden."
                    );
                }

                formData.delete("imageFile");
                formData.set("image", result.url);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Bild konnte nicht hochgeladen werden."
                );

                setUploading(false);
                return;
            }

            setUploading(false);
        }

        const result = await createProduct(formData);

        if (result && !result.success) {
            setError(
                result.message || "Produkt konnte nicht gespeichert werden."
            );
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
        >
            <div className="grid gap-6 md:grid-cols-2">

                <label className="block">
                    <span className="text-sm text-stone-300">
                        Produktname *
                    </span>

                    <input
                        name="name"
                        required
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 outline-none focus:border-[#c8a46b]"
                        placeholder="z. B. Freyjas Lesezeichen"
                    />
                </label>

                <label className="block">
                    <span className="text-sm text-stone-300">
                        Kategorie *
                    </span>

                    <input
                        name="category"
                        required
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 outline-none focus:border-[#c8a46b]"
                        placeholder="z. B. Artefakt"
                    />
                </label>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

                <label className="block">
                    <span className="text-sm text-stone-300">
                        Preis in €
                    </span>

                    <input
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        defaultValue="0"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 outline-none focus:border-[#c8a46b]"
                    />
                </label>

                <label className="block">
                    <span className="text-sm text-stone-300">
                        Produktbild
                    </span>

                    <input
                        name="imageFile"
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="mt-2 block w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-stone-300 file:mr-4 file:rounded-full file:border-0 file:bg-[#c8a46b] file:px-4 file:py-2 file:font-semibold file:text-[#111] hover:file:bg-[#d8b16d]"
                    />

                    <span className="mt-2 block text-xs text-stone-500">
                        JPG, PNG, WebP oder GIF · maximal 4 MB
                    </span>
                </label>

            </div>

            <label className="block">
                <span className="text-sm text-stone-300">
                    Beschreibung *
                </span>

                <textarea
                    name="description"
                    required
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 outline-none focus:border-[#c8a46b]"
                    placeholder="Kurze Beschreibung des Produkts..."
                />
            </label>

            <div className="grid gap-6 md:grid-cols-2">

                <label className="block">
                    <span className="text-sm text-stone-300">
                        Symbol
                    </span>

                    <input
                        name="rune"
                        defaultValue="ᚠ"
                        maxLength={4}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 outline-none focus:border-[#c8a46b]"
                    />
                </label>

                <label className="block">
                    <span className="text-sm text-stone-300">
                        Leuchteffekt
                    </span>

                    <select
                        name="glow"
                        defaultValue="gold"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 outline-none focus:border-[#c8a46b]"
                    >
                        <option value="gold">Gold</option>
                        <option value="blue">Blau</option>
                        <option value="red">Rot</option>
                    </select>
                </label>

            </div>

            <label className="flex items-center gap-3 text-sm text-stone-300">
                <input
                    type="checkbox"
                    name="placeholder"
                    className="h-4 w-4"
                />
                Demnächst erhältlich / Platzhalter
            </label>

            {uploading && (
                <p className="text-sm text-[#d8b16d]">
                    Bild wird hochgeladen...
                </p>
            )}

            {error && (
                <p className="text-sm text-red-400">
                    {error}
                </p>
            )}

            <SaveButton />
        </form>
    );
}