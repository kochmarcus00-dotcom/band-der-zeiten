import Image from "next/image";
import Link from "next/link";

type Props = {
    slug: string;
    title: string;
    subtitle: string;
    excerpt: string;
    image: string;
    category: string;
    rune: string;
    glow: "blue" | "gold" | "red";
};

export default function ArtifactCard({

    slug,
    title,
    subtitle,
    excerpt,
    image,
    category,
    rune,
    glow

}: Props) {

    const glowClass = {

        blue: "bg-cyan-300/20",

        gold: "bg-[#c8a46b]/20",

        red: "bg-red-700/20"

    };

    return (

        <Link

            href={`/nordische-welt/${slug}`}

            className="artifact group relative block overflow-hidden rounded-[34px] border border-white/10 bg-[#111]/90 backdrop-blur-xl transition-all duration-700 hover:-translate-y-3 hover:border-cyan-300/40 hover:shadow-[0_0_120px_rgba(90,210,255,.18)]"

        >

            {/* Mystisches Licht */}

            <div

                className={`

                absolute

                -left-20

                top-10

                h-[280px]

                w-[280px]

                rounded-full

                blur-[130px]

                transition-all

                duration-700

                group-hover:scale-150

                ${glowClass[glow]}

                `}

            />

            {/* Rune */}

            <div

                className="

                absolute

                right-8

                top-8

                text-6xl

                text-cyan-300

                opacity-10

                transition-all

                duration-700

                group-hover:opacity-30

                group-hover:scale-125

                "

            >

                {rune}

            </div>

            {/* Bild */}

            <div className="relative overflow-hidden">

                <Image

                    src={image}

                    alt={title}

                    width={900}

                    height={650}

                    className="

                    h-80

                    w-full

                    object-cover

                    transition-all

                    duration-[1600ms]

                    group-hover:scale-110

                    "

                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

            </div>

            {/* Inhalt */}

            <div className="relative p-8">

                <p className="uppercase tracking-[0.35em] text-xs text-[#c8a46b]">

                    {rune}

                    &nbsp;&nbsp;

                    {category}

                </p>

                <h3 className="mt-5 text-3xl font-semibold">

                    {title}

                </h3>

                <p className="mt-4 text-stone-400">

                    {subtitle}

                </p>

                <p className="mt-8 leading-8 text-stone-300">

                    {excerpt}

                </p>

                <div className="mt-10 flex items-center gap-4">

                    <span className="text-[#c8a46b]">

                        Weiterlesen

                    </span>

                    <span

                        className="

                        text-[#c8a46b]

                        transition-all

                        duration-500

                        group-hover:translate-x-3

                        "

                    >

                        →

                    </span>

                </div>

            </div>

        </Link>

    );

}