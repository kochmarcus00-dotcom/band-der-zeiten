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

            {/* ========================================================= */}
            {/* HERO */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden px-6 pt-32 pb-32 md:pt-40 md:pb-56">

                {/* Nordlicht */}

                <div className="nordic-light light-blue absolute left-1/2 -top-44 h-[500px] w-[900px] -translate-x-1/2 md:h-[650px] md:w-[1100px]" />

                <div className="nordic-light light-gold absolute left-[-80px] top-56 h-[320px] w-[320px]" />

                <div className="nordic-light light-red absolute right-[-250px] top-[120px] h-[500px] w-[500px] md:h-[700px] md:w-[700px]" />

                {/* Runen */}

                <span
                    className="rune blue"
                    style={{
                        left: "4%",
                        top: "8%",
                        animationDelay: "0s",
                    }}
                >
                    ᚠ
                </span>

                <span
                    className="rune gold"
                    style={{
                        left: "30%",
                        top: "26%",
                        animationDelay: "2s",
                    }}
                >
                    ᚱ
                </span>

                <span
                    className="rune blue"
                    style={{
                        right: "8%",
                        top: "10%",
                        animationDelay: "4s",
                    }}
                >
                    ᛉ
                </span>

                <span
                    className="rune red"
                    style={{
                        right: "18%",
                        top: "48%",
                        animationDelay: "6s",
                    }}
                >
                    ᛞ
                </span>

                <span
                    className="rune gold"
                    style={{
                        left: "52%",
                        top: "4%",
                        animationDelay: "8s",
                    }}
                >
                    ᚨ
                </span>

                <span
                    className="rune blue"
                    style={{
                        right: "34%",
                        top: "58%",
                        animationDelay: "10s",
                    }}
                >
                    ᛖ
                </span>

                {/* Inhalt */}

                <div className="relative z-10 mx-auto max-w-7xl pt-8">

                    <p className="uppercase tracking-[0.35em] text-xs text-[#c8a46b] md:text-base md:tracking-[0.45em]">
                        Nordische Welt
                    </p>

                    <h1 className="mt-8 text-5xl font-semibold leading-none sm:text-6xl md:text-8xl">
                        Die Chroniken
                    </h1>

                    <p className="mt-10 max-w-4xl text-base leading-8 text-stone-300 sm:text-lg md:mt-12 md:text-[22px] md:leading-[2.25]">

                        Hinter jedem Schwert,
                        <br />
                        jeder Rune
                        <br />
                        und jeder Legende
                        <br />
                        verbirgt sich eine Geschichte.

                        <br />
                        <br />

                        Dieses Archiv führt tiefer
                        <br />
                        in die Welt von{" "}
                        <span className="text-white">
                            Band der Zeiten
                        </span>
                        <br />
                        als der Roman allein erzählen kann.

                    </p>

                    <div className="mt-12 h-px w-48 bg-gradient-to-r from-[#c8a46b] via-[#d8b16d] to-transparent md:mt-20 md:w-72" />

                </div>

            </section>


            {/* ========================================================= */}
            {/* ERSTE CHRONIK */}
            {/* ========================================================= */}

            <section className="relative px-6 pb-32 md:pb-44">

                <div className="absolute left-[-150px] top-20 h-[520px] w-[520px] rounded-full bg-cyan-300/15 blur-[180px]" />

                <div className="absolute right-[-100px] bottom-0 h-[380px] w-[380px] rounded-full bg-[#c8a46b]/15 blur-[150px]" />

                <div className="relative z-10 mx-auto max-w-7xl">

                    <p className="mb-8 uppercase tracking-[0.35em] text-sm text-[#c8a46b] md:tracking-[0.45em]">
                        Erste Chronik
                    </p>

                    <Link
                        href={`/nordische-welt/${featured.slug}`}
                        className="
                            group
                            relative
                            block
                            overflow-hidden
                            rounded-[32px]
                            border
                            border-white/10
                            bg-[#111]/90
                            transition-all
                            duration-700
                            hover:-translate-y-2
                            hover:border-[#d8b16d]/40
                            hover:shadow-[0_0_160px_rgba(90,210,255,.22)]
                            md:rounded-[40px]
                        "
                    >

                        <div className="grid lg:grid-cols-2">

                            {/* Bild */}

                            <div className="relative overflow-hidden">

                                <Image
                                    src={featured.image}
                                    alt={featured.title}
                                    width={900}
                                    height={700}
                                    className="
                                        h-[320px]
                                        w-full
                                        object-cover
                                        transition-all
                                        duration-[1800ms]
                                        group-hover:brightness-110
                                        group-hover:contrast-110
                                        group-hover:saturate-125
                                        lg:h-[560px]
                                    "
                                />

                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#111]" />

                            </div>


                            {/* Inhalt */}

                            <div className="flex flex-col justify-center p-8 sm:p-10 md:p-14">

                                <p className="uppercase tracking-[0.35em] text-sm text-[#c8a46b]">
                                    ᚠ&nbsp;&nbsp;{featured.category}
                                </p>

                                <h2 className="mt-6 text-4xl font-semibold sm:text-5xl">
                                    {featured.title}
                                </h2>

                                <p className="mt-4 text-xl text-stone-400 md:text-2xl">
                                    {featured.subtitle}
                                </p>

                                <p className="mt-8 text-base leading-8 text-stone-300 md:mt-10 md:text-lg md:leading-9">
                                    {featured.excerpt}
                                </p>

                                <div className="mt-10 flex items-center gap-4 text-[#c8a46b] md:mt-16">

                                    <span>
                                        Chronik öffnen
                                    </span>

                                    <span className="transition group-hover:translate-x-3">
                                        →
                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="
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
                        " />

                    </Link>

                </div>

            </section>


            {/* ========================================================= */}
            {/* DIE SAMMLUNG */}
            {/* ========================================================= */}

            <section className="relative overflow-hidden px-6 py-28 md:py-44">

                {/* Licht */}

                <div className="nordic-light light-blue absolute -left-[350px] top-40 h-[650px] w-[650px] animate-pulse md:h-[900px] md:w-[900px]" />

                <div className="nordic-light light-gold absolute right-[-220px] bottom-20 h-[500px] w-[500px] animate-pulse md:h-[650px] md:w-[650px]" />

                <div className="nordic-light light-red absolute left-[45%] top-[55%] h-[320px] w-[320px] animate-pulse md:h-[420px] md:w-[420px]" />


                {/* Runen */}

                <span
                    className="rune blue"
                    style={{
                        left: "8%",
                        top: "6%",
                        animationDelay: "2s",
                    }}
                >
                    ᚠ
                </span>

                <span
                    className="rune gold"
                    style={{
                        right: "10%",
                        top: "18%",
                        animationDelay: "5s",
                    }}
                >
                    ᚨ
                </span>

                <span
                    className="rune blue"
                    style={{
                        left: "30%",
                        bottom: "12%",
                        animationDelay: "7s",
                    }}
                >
                    ᛉ
                </span>

                <span
                    className="rune red"
                    style={{
                        right: "34%",
                        bottom: "8%",
                        animationDelay: "10s",
                    }}
                >
                    ᛞ
                </span>


                {/* Inhalt */}

                <div className="relative z-10 mx-auto max-w-7xl">

                    <div className="mb-16 text-center md:mb-28">

                        <p className="text-sm uppercase tracking-[0.45em] text-[#c8a46b] md:tracking-[0.55em]">
                            DIE SAMMLUNG
                        </p>

                        <h2 className="mt-6 text-4xl font-semibold leading-none sm:text-5xl md:mt-8 md:text-7xl">
                            Chroniken des Nordens
                        </h2>

                        <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[#d8b16d] to-transparent md:mt-10 md:w-32" />

                        <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-stone-400 sm:text-lg md:mt-12 md:text-xl md:leading-10">

                            Jede Chronik öffnet ein weiteres Kapitel
                            der nordischen Welt –
                            von uralten Runen über Schildmaiden
                            bis zu den Göttern des Nordens.

                        </p>

                    </div>


                    {/* ================================================= */}
                    {/* DYNAMISCHES ARCHIV */}
                    {/* ================================================= */}

                    <div className="
                        grid
                        grid-cols-1
                        gap-8
                        sm:grid-cols-2
                        lg:grid-cols-3
                    ">

                        {archive.map((article, index) => {

                            const runes = [
                                "ᚠ",
                                "ᚨ",
                                "ᛉ",
                                "ᛞ",
                                "ᚱ",
                            ];

                            const runeColors = [
                                "text-cyan-300",
                                "text-[#d8b16d]",
                                "text-violet-300",
                                "text-red-400",
                                "text-cyan-300",
                            ];

                            const glow = [
                                "bg-cyan-300/20",
                                "bg-[#c8a46b]/20",
                                "bg-violet-400/15",
                                "bg-red-700/20",
                                "bg-cyan-300/20",
                            ];

                            return (

                                <Link
                                    key={article.slug}
                                    href={`/nordische-welt/${article.slug}`}
                                    className="
                                        group
                                        relative
                                        overflow-hidden
                                        rounded-[28px]
                                        border
                                        border-white/10
                                        bg-[#111]/90
                                        backdrop-blur-xl
                                        transition-all
                                        duration-700
                                        hover:-translate-y-2
                                        hover:border-[#d8b16d]/40
                                        hover:shadow-[0_0_100px_rgba(90,210,255,.18)]
                                    "
                                >

                                    {/* Licht */}

                                    <div
                                        className={`
                                            absolute
                                            -left-20
                                            top-10
                                            h-[220px]
                                            w-[220px]
                                            rounded-full
                                            blur-[110px]
                                            transition-all
                                            duration-700
                                            group-hover:scale-150
                                            ${glow[index % glow.length]}
                                        `}
                                    />


                                    {/* Rune */}

                                    <div
                                        className={`
                                            absolute
                                            right-6
                                            top-6
                                            z-10
                                            text-5xl
                                            opacity-15
                                            transition-all
                                            duration-700
                                            group-hover:scale-125
                                            group-hover:opacity-60
                                            ${runeColors[index % runeColors.length]}
                                        `}
                                    >
                                        {runes[index % runes.length]}
                                    </div>


                                    {/* Bild */}

                                    <div className="relative overflow-hidden">

                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            width={900}
                                            height={650}
                                            className="
                                                h-64
                                                w-full
                                                object-cover
                                                transition-all
                                                duration-[1800ms]
                                                group-hover:scale-110
                                                group-hover:brightness-110
                                                group-hover:contrast-110
                                                group-hover:saturate-125
                                                sm:h-56
                                                lg:h-64
                                            "
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

                                    </div>


                                    {/* Inhalt */}

                                    <div className="relative p-6 md:p-8">

                                        <p className="text-xs uppercase tracking-[0.3em] text-[#c8a46b]">
                                            {runes[index % runes.length]}
                                            &nbsp;&nbsp;
                                            {article.category}
                                        </p>

                                        <h3 className="
                                            mt-4
                                            text-2xl
                                            font-semibold
                                            tracking-tight
                                            transition-all
                                            duration-700
                                            group-hover:text-[#f7f2e8]
                                        ">
                                            {article.title}
                                        </h3>

                                        <div className="
                                            mt-5
                                            h-px
                                            w-16
                                            bg-gradient-to-r
                                            from-[#d8b16d]
                                            to-transparent
                                            opacity-50
                                            transition-all
                                            duration-700
                                            group-hover:w-32
                                            group-hover:opacity-100
                                        " />

                                        <p className="mt-4 text-stone-400">
                                            {article.subtitle}
                                        </p>

                                        <p className="mt-6 leading-7 text-stone-300">
                                            {article.excerpt}
                                        </p>

                                        <div className="mt-8 flex items-center gap-4 text-[#c8a46b]">

                                            <span>
                                                Chronik öffnen
                                            </span>

                                            <span className="transition group-hover:translate-x-2">
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