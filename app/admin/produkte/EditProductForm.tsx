"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    image: string;
    rune: string;
    glow: string;
    available: boolean;
    placeholder: boolean;
};

type Props = {
    product: Product;
    updateProduct: (
        previousState: {
            success: boolean;
            message?: string;
        },
        formData: FormData
    ) => Promise<{
        success: boolean;
        message?: string;
    }>;
};

function SaveButton({ uploading }: { uploading: boolean }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending || uploading}
            className="rounded-full bg-[#c8a46b] px-6 py-3 font-semibold text-[#111] transition hover:bg-[#d8b16d] disabled:cursor-wait disabled:opacity-50"
        >
            {uploading
                ? "Bild wird hochgeladen..."
                : pending
                    ? "Speichert..."
                    : "Änderungen speichern"}
        </button>
    );
}

export default function EditProductForm({
    product,
    updateProduct,
}: Props) {
    const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    const [state, formAction] = useActionState(
        updateProduct,
        { success: false }
    );

    useEffect(() => {
        if (state.success) {
            setOpen(false);
        }
    }, [state.success]);

    if (!open) {
        return (
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-full border border-[#c8a46b]/40 px-4 py-2 text-sm text-[#d8b16d] transition hover:border-[#c8a46b] hover:bg-[#c8a46b]/10"
            >
                Bearbeiten
            </button>
        );
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setUploadError("");

        const form = event.currentTarget;
        const formData = new FormData(form);

        const imageFile = formData.get("imageFile");

        // Kein neues Bild ausgewählt:
        // ganz normal speichern.
        if (
            !(imageFile instanceof File) ||
            imageFile.size === 0
        ) {
            formAction(formData);
            return;
        }

        if (!imageFile.type.startsWith("image/")) {
            setUploadError("Bitte nur Bilddateien hochladen.");
            return;
        }

        if (imageFile.size > 4 * 1024 * 1024) {
            setUploadError("Das Bild darf maximal 4 MB groß sein.");
            return;
        }

        setUploading(true);

        try {
            const uploadData = new FormData();
            uploadData.append("file", imageFile);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });

            const result = await response.json();

            if (!response.ok || !result.url) {
                throw new Error(
                    result.error ||
                    "Bild konnte nicht hochgeladen werden."
                );
            }

            // Die neue Blob-URL an die Server Action übergeben.
            formData.set("image", result.url);

            // Datei selbst nicht an die Server Action weiterreichen.
            formData.delete("imageFile");

            formAction(formData);
        } catch (error) {
            setUploadError(
                error instanceof Error
                    ? error.message
                    : "Bild konnte nicht hochgeladen werden."
            );
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="mt-5 w-full rounded-2xl border border-[#c8a46b]/20 bg-[#090909] p-6">

            <h3 className="text-xl font-semibold text-[#d8b16d]">
                Produkt bearbeiten
            </h3>

            <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-5"
            >
                <input
                    type="hidden"
                    name="id"
                    value={product.id}
                />

                <input
                    name="name"
                    defaultValue={product.name}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 outline-none focus:border-[#c8a46b]"
                    placeholder="Produktname"
                />

                <input
                    name="category"
                    defaultValue={product.category}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 outline-none focus:border-[#c8a46b]"
                    placeholder="Kategorie"
                />

                <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={product.price}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 outline-none focus:border-[#c8a46b]"
                />

                <textarea
                    name="description"
                    defaultValue={product.description}
                    required
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 outline-none focus:border-[#c8a46b]"
                    placeholder="Beschreibung"
                />

                {/* AKTUELLES BILD */}
                <div>
                    <span className="text-sm text-stone-300">
                        Aktuelles Bild
                    </span>

                    <div className="mt-2 rounded-xl border border-white/10 bg-[#111] px-4 py-3">
                        <p className="truncate text-xs text-stone-500">
                            {product.image}
                        </p>
                    </div>
                </div>

                {/* NEUES BILD */}
                <div>
                    <label className="block">
                        <span className="text-sm text-stone-300">
                            Neues Produktbild
                        </span>

                        <input
                            name="imageFile"
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            className="mt-2 block w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-stone-300 file:mr-4 file:rounded-full file:border-0 file:bg-[#c8a46b] file:px-4 file:py-2 file:font-semibold file:text-[#111] hover:file:bg-[#d8b16d]"
                        />

                        <span className="mt-2 block text-xs text-stone-500">
                            Nur auswählen, wenn das Bild geändert werden soll.
                            JPG, PNG, WebP oder GIF · maximal 4 MB
                        </span>
                    </label>
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                    <input
                        name="rune"
                        defaultValue={product.rune}
                        maxLength={4}
                        className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 outline-none focus:border-[#c8a46b]"
                        placeholder="Symbol"
                    />

                    <select
                        name="glow"
                        defaultValue={product.glow}
                        className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 outline-none focus:border-[#c8a46b]"
                    >
                        <option value="gold">Gold</option>
                        <option value="blue">Blau</option>
                        <option value="red">Rot</option>
                    </select>

                </div>

                <label className="flex items-center gap-3 text-sm text-stone-300">
                    <input
                        type="checkbox"
                        name="available"
                        defaultChecked={product.available}
                        className="h-4 w-4"
                    />
                    Online
                </label>

                <label className="flex items-center gap-3 text-sm text-stone-300">
                    <input
                        type="checkbox"
                        name="placeholder"
                        defaultChecked={product.placeholder}
                        className="h-4 w-4"
                    />
                    Demnächst erhältlich / Platzhalter
                </label>

                {uploadError && (
                    <p className="text-sm text-red-400">
                        {uploadError}
                    </p>
                )}

                {state.message && (
                    <p className="text-sm text-red-400">
                        {state.message}
                    </p>
                )}

                <div className="flex flex-wrap gap-3">

                    <SaveButton uploading={uploading} />

                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        disabled={uploading}
                        className="rounded-full border border-white/20 px-6 py-3 text-sm text-stone-300 transition hover:border-white/40 disabled:opacity-50"
                    >
                        Abbrechen
                    </button>

                </div>
            </form>
        </div>
    );
}