import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/content";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ArticlePage({ params }: Props) {

    const { slug } = await params;

    const article = articles.find(
        (item) => item.slug === slug
    );

    if (!article) {
        notFound();
    }

    return (

        <main className="bg-[#090909] text-white min-h-screen">

            <Navbar />

            <article className="mx-auto max-w-5xl px-8 pt-40 pb-32">

                <p className="uppercase tracking-[0.45em] text-[#c8a46b]">

                    {article.category}

                </p>

                <h1 className="mt-8 text-6xl font-semibold">

                    {article.title}

                </h1>

                <h2 className="mt-5 text-2xl text-stone-400">

                    {article.subtitle}

                </h2>

                <div className="mt-10 flex gap-8 text-stone-500">

                    <span>{article.author}</span>

                    <span>{article.date}</span>

                </div>

                <div className="mt-20 whitespace-pre-line text-xl leading-10 text-stone-300">

                    {article.content}

                </div>

            </article>

            <Footer />

        </main>

    );

}