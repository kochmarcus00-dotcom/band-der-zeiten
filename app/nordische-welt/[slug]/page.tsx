import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;

    const article = await prisma.blogArticle.findUnique({
        where: {
            slug,
        },
        include: {
            sections: {
                orderBy: {
                    position: "asc",
                },
            },
        },
    });

    if (!article || !article.published) {
        notFound();
    }

    return (
        <main className="min-h-screen overflow-hidden bg-[#090909] text-white">
            <Navbar />

            {/* HERO */}
            <section className="relative px-6 pb-20 pt-40 md:pb-28">
                <div className="absolute left-[-180px] top-20 h-[500px] w-[500px] rounded-full bg-cyan-300/10 blur-[180px]" />

                <div className="absolute right-[-180px] top-40 h-[500px] w-[500px] rounded-full bg-[#c8a46b]/10 blur-[180px]" />

                <div className="relative mx-auto max-w-6xl">
                    <Link
                        href="/nordische-welt"
                        className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-stone-500 transition hover:text-[#c8a46b]"
                    >
                        ← Alle Chroniken
                    </Link>

                    <p className="mt-16 text-sm uppercase tracking-[0.45em] text-[#c8a46b]">
                        {article.category}
                    </p>

                    <h1 className="mt-8 max-w-5xl font-serif text-5xl font-semibold leading-[0.95] sm:text-6xl md:text-8xl">
                        {article.title}
                    </h1>

                    {article.subtitle && (
                        <p className="mt-7 max-w-3xl text-xl leading-9 text-stone-400 md:text-2xl">
                            {article.subtitle}
                        </p>
                    )}

                    <div className="mt-8 flex flex-wrap gap-8 text-sm text-stone-500">
                        {article.author && (
                            <span>{article.author}</span>
                        )}

                        {article.date && (
                            <span>{article.date}</span>
                        )}
                    </div>
                </div>
            </section>

            {/* TITELBILD */}
            {article.image && (
                <section className="relative px-4 pb-24 md:px-8 md:pb-32">
                    <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-white/10 bg-[#111]">
                        <Image
                            src={article.image}
                            alt={article.title}
                            width={1800}
                            height={1100}
                            priority
                            sizes="(max-width: 768px) 100vw, 1200px"
                            className="h-[300px] w-full object-cover sm:h-[450px] md:h-[600px]"
                        />
                    </div>
                </section>
            )}

            {/* EINLEITUNG */}
            {article.excerpt && (
                <section className="px-6 pb-24 md:pb-36">
                    <div className="mx-auto max-w-4xl">
                        <div className="h-px w-28 bg-gradient-to-r from-[#c8a46b] to-transparent" />

                        <p className="mt-10 font-serif text-2xl leading-[1.8] text-stone-300 md:text-3xl md:leading-[1.9]">
                            {article.excerpt}
                        </p>
                    </div>
                </section>
            )}

            {/* ABSCHNITTE */}
            <section className="px-6 pb-32 md:pb-48">
                <div className="mx-auto max-w-5xl">
                    {article.sections.length === 0 ? (
                        <div className="rounded-3xl border border-white/10 bg-[#111] p-10 text-center">
                            <p className="text-stone-500">
                                Diese Chronik enthält noch keine Abschnitte.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-28 md:space-y-40">
                            {article.sections.map((section, index) => (
                                <section key={section.id}>
                                    <div className="mb-8 flex items-center gap-5">
                                        <span className="font-serif text-5xl text-[#c8a46b]/30">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <div className="h-px flex-1 bg-gradient-to-r from-[#c8a46b]/40 to-transparent" />
                                    </div>

                                    {section.heading && (
                                        <h2 className="mb-8 font-serif text-3xl font-semibold sm:text-4xl md:text-5xl">
                                            {section.heading}
                                        </h2>
                                    )}

                                    {section.image && (
                                        <div className="mb-10 overflow-hidden rounded-3xl border border-white/10 bg-[#111]">
                                            <Image
                                                src={section.image}
                                                alt={
                                                    section.heading ||
                                                    article.title
                                                }
                                                width={1400}
                                                height={900}
                                                sizes="(max-width: 768px) 100vw, 900px"
                                                className="max-h-[650px] w-full object-cover"
                                            />
                                        </div>
                                    )}

                                    {section.text && (
                                        <div className="whitespace-pre-line text-lg leading-[2] text-stone-300 md:text-xl md:leading-[2.1]">
                                            {section.text}
                                        </div>
                                    )}
                                </section>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ZURÜCK */}
            <section className="px-6 pb-32">
                <div className="mx-auto max-w-5xl border-t border-white/10 pt-16">
                    <Link
                        href="/nordische-welt"
                        className="text-sm uppercase tracking-[0.35em] text-stone-500 transition hover:text-[#c8a46b]"
                    >
                        ← Zurück zu den Chroniken
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}