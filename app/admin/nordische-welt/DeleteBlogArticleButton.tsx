"use client";

import { useState } from "react";

export default function DeleteBlogArticleButton({
    id,
    title,
}: {
    id: string;
    title: string;
}) {
    const [deleting, setDeleting] = useState(false);

    async function handleDelete() {
        const confirmed = window.confirm(
            `Artikel "${title}" wirklich vollständig löschen?\n\nDer Artikel und alle zugehörigen Abschnitte werden dauerhaft gelöscht.`
        );

        if (!confirmed) {
            return;
        }

        setDeleting(true);

        try {
            const response = await fetch(
                `/api/admin/nordische-welt/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                    },
                    cache: "no-store",
                }
            );

            const data = await response.json().catch(() => null);

            if (response.status === 401) {
                window.location.href = "/admin-login";
                return;
            }

            if (!response.ok) {
                throw new Error(
                    data?.error ||
                    `Löschen fehlgeschlagen (${response.status}).`
                );
            }

            window.location.href = "/admin/nordische-welt";
        } catch (error) {
            console.error("Fehler beim Löschen:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Der Artikel konnte nicht gelöscht werden."
            );

            setDeleting(false);
        }
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-full border border-red-500/30 px-4 py-2 text-sm text-red-400 transition hover:border-red-400 hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {deleting ? "Löschen …" : "Löschen"}
        </button>
    );
}