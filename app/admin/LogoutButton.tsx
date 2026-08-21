"use client";

import { useTransition } from "react";
import { adminLogout } from "./logout";

export default function LogoutButton() {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            type="button"
            disabled={isPending}
            onClick={() => {
                startTransition(() => {
                    adminLogout();
                });
            }}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-stone-300 transition hover:border-red-400 hover:text-red-400 disabled:opacity-50"
        >
            {isPending ? "Abmelden …" : "Abmelden"}
        </button>
    );
}