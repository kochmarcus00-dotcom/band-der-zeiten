import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export default async function NordischeWelt() {
    const articles = await prisma.blogArticle.findMany({
        where: {
            published: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const featured = articles[0];
    const archive = articles.slice(1);

    return (
        <main className="min-h-screen overflow-hidden bg-[#090909] text-white">
            <Navbar />

            {/* HERO */}
            <section className="relative px-6 pb-24 pt-40 md:pb-36 md:pt-48">
                <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-[180px]" />

                <div className="relative z-10 mx-auto max-w-7xl">
                    <p className="text-sm uppercase tracking-[0.45em] text-[#c8a46b]">
                        Nordische Welt
                    </p>

                    <h1 className="mt-8 font-serif text-5xl font-semibold leading-none sm:text-6xl md:text-8xl">
                        Die Chroniken
                    </h1>

                    <p className="mt-10 max-w-3xl text-lg leading-9 text-stone-400 md:text-xl md:leading-10">
                        Geschichten, Mythen und Legenden aus der
                        nordischen Welt.
                    </p>

                    <div className="mt-12 h-px w-48 bg-gradient-to-r from-[#c8a46b] to-transparent" />
                </div>
            </section>

            {/* KEINE ARTIKEL */}
            {!featured && (
                <section className="px-6 pb-32 md:pb-48">
                    <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-[#111] p-10 text-center md:p-16">
                        <p className="text-sm uppercase tracking-[0.4em] text-[#c8a46b]">
                            DIE CHRONIKEN
                        </p>

                        <h2 className="mt-6 font-serif text-3xl md:text-4xl">
                            Noch keine Chroniken veröffentlicht
                        </h2>

                        <p className="mt-6 leading-8 text-stone-400">
                            Schon bald findest du hier neue Geschichten
                            aus der nordischen Welt.
                        </p>
                    </div>
                </section>
            )}

            {/* ERSTE CHRONIK */}
            {featured && (
                <section className="px-6 pb-32 md:pb-44">
                    <div className="mx-auto max-w-7xl">
                        <p className="mb-8 text-sm uppercase tracking-[0.4em] text-[#c8a46b]">
                            Erste Chronik
                        </p>

                        <Link
                            href={`/nordische-welt/${featured.slug}`}
                            className="group block overflow-hidden rounded-[32px] border border-white/10 bg-[#111] transition duration-700 hover:-translate-y-2 hover:border-[#c8a46b]/40"
                        >
                            <div className="grid lg:grid-cols-2">
                                <div className="relative">
                                    {featured.image ? (
                                        <Image
                                            src={featured.image}
                                            alt={featured.title}
                                            width={1200}
                                            height={800}
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[500px]"
                                        />
                                    ) : (
                                        <div className="flex h-[320px] items-center justify-center bg-[#151515] text-stone-600 md:h-[500px]">
                                            Kein Titelbild
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col justify-center p-8 md:p-14">
                                    <p className="text-sm uppercase tracking-[0.35em] text-[#c8a46b]">
                                        {featured.category}
                                    </p>

                                    <h2 className="mt-6 font-serif text-4xl font-semibold md:text-5xl">
                                        {featured.title}
                                    </h2>

                                    {featured.subtitle && (
                                        <p className="mt-5 text-xl text-stone-400">
                                            {featured.subtitle}
                                        </p>
                                    )}

                                    <p className="mt-8 leading-8 text-stone-300">
                                        {featured.excerpt}
                                    </p>

                                    <div className="mt-10 text-[#c8a46b]">
                                        Chronik öffnen →
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* WEITERE CHRONIKEN */}
            {archive.length > 0 && (
                <section className="px-6 pb-32 md:pb-48">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-14">
                            <p className="text-sm uppercase tracking-[0.4em] text-[#c8a46b]">
                                Die Sammlung
                            </p>

                            <h2 className="mt-5 font-serif text-4xl md:text-6xl">
                                Chroniken des Nordens
                            </h2>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {archive.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/nordische-welt/${article.slug}`}
                                    className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#111] transition duration-700 hover:-translate-y-2 hover:border-[#c8a46b]/40"
                                >
                                    {article.image ? (
                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            width={900}
                                            height={600}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="h-60 w-full object-cover transition duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-60 items-center justify-center bg-[#151515] text-stone-600">
                                            Kein Bild
                                        </div>
                                    )}

                                    <div className="p-7">
                                        <p className="text-xs uppercase tracking-[0.3em] text-[#c8a46b]">
                                            {article.category}
                                        </p>

                                        <h3 className="mt-4 font-serif text-2xl font-semibold">
                                            {article.title}
                                        </h3>

                                        {article.subtitle && (
                                            <p className="mt-3 text-stone-400">
                                                {article.subtitle}
                                            </p>
                                        )}

                                        <p className="mt-5 leading-7 text-stone-300">
                                            {article.excerpt}
                                        </p>

                                        <div className="mt-7 text-[#c8a46b]">
                                            Chronik öffnen →
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}