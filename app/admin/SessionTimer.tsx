"use client";

import { useCallback, useEffect, useState } from "react";

const TIMEOUT_SECONDS = 10 * 60;

export default function SessionTimer() {
    const [remaining, setRemaining] = useState(TIMEOUT_SECONDS);

    const resetTimer = useCallback(() => {
        setRemaining(TIMEOUT_SECONDS);
    }, []);

    useEffect(() => {
        const events = [
            "mousemove",
            "mousedown",
            "keydown",
            "scroll",
            "touchstart",
            "click",
        ];

        events.forEach((event) => {
            window.addEventListener(event, resetTimer, { passive: true });
        });

        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, [resetTimer]);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setRemaining((current) => {
                if (current <= 1) {
                    window.location.href = "/admin-login";
                    return 0;
                }

                return current - 1;
            });
        }, 1000);

        return () => window.clearInterval(timer);
    }, []);

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    return (
        <div
            className={`whitespace-nowrap text-sm ${remaining <= 120
                    ? "text-red-400"
                    : "text-stone-400"
                }`}
            title="Automatische Abmeldung bei Inaktivität"
        >
            ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
    );
}