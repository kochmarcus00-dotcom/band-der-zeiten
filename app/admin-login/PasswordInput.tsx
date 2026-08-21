"use client";

import { useState } from "react";

export default function PasswordInput() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/10 bg-[#090909] px-4 py-3 pr-12 text-white outline-none focus:border-[#c8a46b]"
            />

            <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={
                    showPassword
                        ? "Passwort verbergen"
                        : "Passwort anzeigen"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 transition hover:text-[#c8a46b]"
            >
                {showPassword ? (
                    <span className="text-lg">👁️</span>
                ) : (
                    <span className="text-lg opacity-60">🙈</span>
                )}
            </button>
        </div>
    );
}