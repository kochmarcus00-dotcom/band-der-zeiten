"use client";

import { useRef, useState } from "react";

export default function BlogImageUpload({
    value,
    onChange,
    label,
}: {
    value: string;
    onChange: (url: string) => void;
    label: string;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    async function upload(file: File) {
        setUploading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok || !data.url) {
                throw new Error(
                    data.error || "Upload fehlgeschlagen."
                );
            }

            onChange(data.url);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Upload fehlgeschlagen."
            );
        } finally {
            setUploading(false);

            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    }

    function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        upload(file);
    }

    function removeImage() {
        onChange("");
    }

    return (
        <div>
            <label className="mb-2 block text-sm text-stone-300">
                {label}
            </label>

            {value ? (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#090909]">
                    <img
                        src={value}
                        alt=""
                        className="max-h-80 w-full object-contain"
                    />

                    <div className="flex flex-wrap gap-3 border-t border-white/10 p-4">
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            disabled={uploading}
                            className="rounded-full border border-white/15 px-4 py-2 text-sm text-stone-300 transition hover:border-[#c8a46b] hover:text-[#c8a46b] disabled:opacity-50"
                        >
                            {uploading
                                ? "Hochladen …"
                                : "Bild ersetzen"}
                        </button>

                        <button
                            type="button"
                            onClick={removeImage}
                            disabled={uploading}
                            className="rounded-full border border-red-500/30 px-4 py-2 text-sm text-red-400 transition hover:border-red-400 hover:text-red-300 disabled:opacity-50"
                        >
                            Bild entfernen
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="flex min-h-32 w-full items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#090909] px-5 py-8 text-sm text-stone-400 transition hover:border-[#c8a46b] hover:text-[#c8a46b] disabled:opacity-50"
                >
                    {uploading
                        ? "Bild wird hochgeladen …"
                        : "+ Bild auswählen und hochladen"}
                </button>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
            />

            {error && (
                <p className="mt-2 text-sm text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}