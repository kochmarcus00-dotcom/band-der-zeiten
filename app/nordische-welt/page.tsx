import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

import { articles } from "@/content";

export default function NordischeWelt() {

    const featured = articles[0];
    const archive = articles.slice(1);

    return (

        <main className="relative min-h-screen overflow-hidden bg-[#090909] text-white">

            <Navbar />

            {/* HERO */}

            <section className="relative overflow-hidden pt-40 pb-56">

                {/* Nordlicht */}

                <div className="nordic-light light-blue w-[1100px] h-[650px] left-1/2 -translate-x-1/2 -top-44" />

                <div className="nordic-light light-gold w-[320px] h-[320px] left-[-80px] top-56" />

                <div className="nordic-light light-red w-[700px] h-[700px] right-[-250px] top-[120px]" />



                {/* Runen */}

                <span

                    className="rune blue"

                    style={{

                        left: "4%",

                        top: "8%",

                        animationDelay: "0s"

                    }}

                >

                    ᚠ

                </span>

                <span

                    className="rune gold"

                    style={{

                        left: "30%",

                        top: "26%",

                        animationDelay: "2s"

                    }}

                >

                    ᚱ

                </span>

                <span

                    className="rune blue"

                    style={{

                        right: "8%",

                        top: "10%",

                        animationDelay: "4s"

                    }}

                >

                    ᛉ

                </span>

                <span

                    className="rune red"

                    style={{

                        right: "18%",

                        top: "48%",

                        animationDelay: "6s"

                    }}

                >

                    ᛞ

                </span>

                <span

                    className="rune gold"

                    style={{

                        left: "52%",

                        top: "4%",

                        animationDelay: "8s"

                    }}

                >

                    ᚨ

                </span>

                <span

                    className="rune blue"

                    style={{

                        right: "34%",

                        top: "58%",

                        animationDelay: "10s"

                    }}

                >

                    ᛖ

                </span>



                <div className="relative z-10 mx-auto max-w-7xl px-8 pt-8">

                    <p className="uppercase tracking-[0.45em] text-[#c8a46b]">

                        Nordische Welt

                    </p>

                    <h1 className="mt-8 text-6xl md:text-8xl font-semibold leading-none">

                        Die Chroniken

                    </h1>

                    <p className="mt-12 max-w-4xl text-[22px] leading-[2.25] text-stone-300">

                        Hinter jedem Schwert,

                        jeder Rune

                        und jeder Legende

                        verbirgt sich eine Geschichte.

                        <br /><br />

                        Dieses Archiv führt tiefer

                        in die Welt von

                        <span className="text-white">

                            {" "}Band der Zeiten

                        </span>

                        als der Roman allein erzählen kann.

                    </p>

                    <div className="mt-20 h-px w-72 bg-gradient-to-r from-[#c8a46b] via-[#d8b16d] to-transparent" />

                </div>

            </section>

            {/* ================================================= */}
            {/* HERO ARTEFAKT */}
            {/* ================================================= */}

            <section className="relative pb-44">

                <div className="absolute left-[-150px] top-20 h-[520px] w-[520px] rounded-full bg-cyan-300/15 blur-[180px]" />

                <div className="absolute right-[-100px] bottom-0 h-[380px] w-[380px] rounded-full bg-[#c8a46b]/15 blur-[150px]" />

                <div className="relative z-10 mx-auto max-w-7xl px-8">

                    <p className="mb-8 uppercase tracking-[0.45em] text-[#c8a46b]">

                        Erste Chronik

                    </p>

                    <Link

                        href={`/nordische-welt/${featured.slug}`}

                        className="

            group

            relative

            block

            overflow-hidden

            rounded-[40px]

            border

            border-white/10

            bg-[#111]/90

            transition-all

            duration-700

            hover:-translate-y-3

            hover:border-[#d8b16d]/40

            hover:shadow-[0_0_220px_rgba(90,210,255,.30)]

            "

                    >

                        <div className="grid lg:grid-cols-2">

                            <div className="relative overflow-hidden">

                                <Image

                                    src={featured.image}

                                    alt={featured.title}

                                    width={900}

                                    height={700}

                                    className="

                        h-full

                        min-h-[560px]

                        w-full

                        object-cover

                        transition-all

                        duration-[1800ms]

                       group-hover:rotate-[0.6deg]

group-hover:brightness-110

group-hover:contrast-110

group-hover:saturate-125

                        
                        group-hover:contrast-110

                        "

                                />

                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#111]" />

                            </div>
                            <div

                                className="

absolute

-left-24

-top-24

h-[340px]

w-[340px]

rounded-full

bg-cyan-300/10

blur-[120px]

opacity-60

transition-all

duration-1000

group-hover:scale-150

group-hover:opacity-100

"
                            />
                            <div className="flex flex-col justify-center p-14">

                                <p className="uppercase tracking-[0.35em] text-[#c8a46b]">

                                    ᚠ &nbsp;&nbsp; {featured.category}

                                </p>

                                <h2 className="mt-8 text-5xl font-semibold">

                                    {featured.title}

                                </h2>

                                <p className="mt-5 text-2xl text-stone-400">

                                    {featured.subtitle}

                                </p>

                                <p className="mt-10 text-lg leading-9 text-stone-300">

                                    {featured.excerpt}

                                </p>

                                <div className="mt-16 flex items-center gap-4 text-[#c8a46b]">

                                    <span>Chronik öffnen</span>

                                    <span className="transition group-hover:translate-x-3">

                                        →

                                    </span>

                                </div>

                            </div>

                        </div>
                        <div

                            className="

absolute

bottom-0

left-0

h-px

w-0

bg-gradient-to-r

from-[#d8b16d]

via-[#fff4d0]

to-transparent

transition-all

duration-700

group-hover:w-full

"
                        />
                    </Link>

                </div>

            </section>

            {/* ========================================================= */}
            {/* DAS ARCHIV */}
            {/* ========================================================= */}

            <section className="relative py-44 overflow-hidden">

                {/* Mystisches Nordlicht */}

                <div className="nordic-light light-blue animate-pulse w-[900px] h-[900px] -left-[350px] top-40" />

                <div className="nordic-light light-gold animate-pulse w-[650px] h-[650px] right-[-220px] bottom-20" />

                <div className="nordic-light light-red animate-pulse w-[420px] h-[420px] left-[45%] top-[55%]" />

                {/* Runen */}

                <span className="rune blue" style={{ left: "8%", top: "6%", animationDelay: "2s" }}>ᚠ</span>

                <span className="rune gold" style={{ right: "10%", top: "18%", animationDelay: "5s" }}>ᚨ</span>

                <span className="rune blue" style={{ left: "30%", bottom: "12%", animationDelay: "7s" }}>ᛉ</span>

                <span className="rune red" style={{ right: "34%", bottom: "8%", animationDelay: "10s" }}>ᛞ</span>

                <div className="relative z-10 mx-auto max-w-7xl px-8">

                    <div className="mb-28 text-center">

                        <p className="uppercase tracking-[0.55em] text-[#c8a46b] text-sm">

                            DIE SAMMLUNG

                        </p>

                        <h2 className="mt-8 text-6xl md:text-7xl font-semibold leading-none">

                            Chroniken des Nordens

                        </h2>

                        <div className="mx-auto mt-10 h-px w-32 bg-gradient-to-r from-transparent via-[#d8b16d] to-transparent" />

                        <p className="mx-auto mt-12 max-w-3xl text-xl leading-10 text-stone-400">

                            Jede Chronik öffnet ein weiteres Kapitel
                            der nordischen Welt –
                            von uralten Runen über Schildmaiden
                            bis zu den Göttern des Nordens.

                        </p>

                    </div>

                    <div className="grid gap-10 lg:grid-cols-12">

                        {archive.map((article, index) => {

                            const runes = [

                                "ᚠ",

                                "ᚨ",

                                "ᛉ",

                                "ᛞ",

                                "ᚱ"

                            ];

                            const runeColors = [

                                "text-cyan-300",

                                "text-[#d8b16d]",

                                "text-violet-300",

                                "text-red-400",

                                "text-cyan-300"

                            ];

                            const glow = [

                                "bg-cyan-300/20",

                                "bg-[#c8a46b]/20",

                                "bg-violet-400/15",

                                "bg-red-700/20",

                                "bg-cyan-300/20"

                            ];

                            return (

                                <Link

                                    key={article.slug}

                                    href={`/nordische-welt/${article.slug}`}

                                    className={`
artifact
group
relative
overflow-hidden
rounded-[36px]
border
border-white/10
bg-[#111]/90
backdrop-blur-xl
transition-all
duration-700
hover:-translate-y-3
hover:border-[#d8b16d]/40
hover:shadow-[0_0_220px_rgba(90,210,255,.30)]

${index === 0 ? "lg:col-span-7" : ""}
${index === 1 ? "lg:col-span-5" : ""}
${index === 2 ? "lg:col-span-5" : ""}
${index === 3 ? "lg:col-span-7" : ""}
${index === 4 ? "lg:col-span-12" : ""}
`}
                                >

                                    {/* Licht */}

                                    <div

                                        className={`

                            absolute

                            -left-20

                            top-10

                            h-[260px]

                            w-[260px]

                            rounded-full

                            blur-[120px]

                            transition-all

                            duration-700

                            group-hover:scale-150

                            ${glow[index % glow.length]}

                            `}

                                    />

                                    {/* Rune */}

                                    {/* Rune */}

                                    <div
                                        className={`
        absolute
        right-8
        top-8
        text-6xl
        opacity-15
        transition-all
        duration-700
        group-hover:opacity-60
        group-hover:scale-125
        ${runeColors[index % runeColors.length]}
    `}
                                    >
                                        {runes[index % runes.length]}
                                    </div>

                                    <div className="relative overflow-hidden">
                                        <div

                                            className="

absolute

inset-0

bg-gradient-to-br

from-cyan-300/5

via-transparent

to-[#c8a46b]/10

opacity-40

transition-all

duration-700

group-hover:opacity-100

"

                                        />
                                        <Image

                                            src={article.image}

                                            alt={article.title}

                                            width={900}

                                            height={650}

                                            className={`

${index === 0 ? "h-[420px]" : ""}

${index === 1 ? "h-[340px]" : ""}

${index === 2 ? "h-[340px]" : ""}

${index === 3 ? "h-[420px]" : ""}

${index === 4 ? "h-[520px]" : ""}

w-full

object-cover

transition-all

duration-[1800ms]

group-hover:scale-115

group-hover:brightness-110

group-hover:contrast-110

group-hover:saturate-125

`}
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

                                    </div>

                                    <div className="relative p-8">
                                        <div

                                            className="

absolute

left-0

top-0

h-24

w-full

bg-gradient-to-b

from-white/5

to-transparent

pointer-events-none

"
                                        />
                                        <p className="uppercase tracking-[0.35em] text-xs text-[#c8a46b]">

                                            {runes[index % runes.length]}

                                            &nbsp;&nbsp;

                                            {article.category}

                                        </p>

                                        <h3

                                            className="

mt-5

text-3xl

font-semibold

tracking-tight

transition-all

duration-700

group-hover:text-[#f7f2e8]

">

                                            {article.title}

                                        </h3>
                                        <div

                                            className="

mt-5

h-px

w-16

bg-gradient-to-r

from-[#d8b16d]

to-transparent

transition-all

duration-700

opacity-40

group-hover:w-36

group-hover:opacity-100

"
                                        />

                                        <div

                                            className="

mt-6

h-px

w-20

bg-gradient-to-r

from-[#d8b16d]

to-transparent

opacity-40

transition-all

duration-700

group-hover:w-40

group-hover:opacity-100

"
                                        />

                                        <p className="mt-3 text-stone-400">

                                            {article.subtitle}

                                        </p>

                                        <p className="mt-8 leading-8 text-stone-300">

                                            {article.excerpt}

                                        </p>

                                        <div className="mt-10 flex items-center gap-4 text-[#c8a46b]">

                                            <span>

                                                Chronik öffnen

                                            </span>

                                            <span className="transition group-hover:translate-x-3">

                                                →

                                            </span>

                                        </div>

                                    </div>

                                </Link>

                            );

                        })}

                    </div>

                </div>

            </section>

            <Footer />

        </main>

    );

}