"use client";

import { useEffect, useState } from "react";

export default function ScrollTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 400);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={() =>
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            }
            className="
        fixed
        bottom-8
        right-8
        z-50
        h-14
        w-14
        rounded-full
        border
        border-[#d8b16d]/40
        bg-[#090909]/80
        text-[#d8b16d]
        backdrop-blur-md
        transition
        duration-300
        hover:scale-110
        hover:border-[#d8b16d]
        hover:bg-[#111]
      "
            aria-label="Nach oben"
        >
            ↑
        </button>
    );
}