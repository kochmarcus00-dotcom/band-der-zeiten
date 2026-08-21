import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminHeader from "../../AdminHeader";
import BlogEditor from "../BlogEditor";

export default async function EditBlogArticlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const article = await prisma.blogArticle.findUnique({
        where: {
            id: id,
        },
        include: {
            sections: {
                orderBy: {
                    position: "asc",
                },
            },
        },
    });

    if (!article) {
        notFound();
    }

    const editorArticle = {
        id: article.id,
        title: article.title,
        subtitle: article.subtitle,
        category: article.category,
        image: article.image,
        author: article.author,
        date: article.date,
        excerpt: article.excerpt,
        published: article.published,
        sections: article.sections.map((section) => ({
            id: section.id,
            position: section.position,
            heading: section.heading,
            text: section.text,
            image: section.image,
        })),
    };

    return (
        <main className="min-h-screen bg-[#090909] px-6 py-10 text-white">
            <div className="mx-auto max-w-6xl">
                <AdminHeader title="Nordische Welt" />

                <div className="mb-8 flex items-center justify-between gap-4">
                    <div>
                        <h1 className="font-serif text-3xl text-white">
                            Artikel bearbeiten
                        </h1>

                        <p className="mt-2 text-stone-400">
                            {article.title}
                        </p>
                    </div>

                    <Link
                        href="/admin/nordische-welt"
                        className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-stone-300 transition hover:border-[#c8a46b] hover:text-[#c8a46b]"
                    >
                        ← Zur Übersicht
                    </Link>
                </div>

                <BlogEditor article={editorArticle} />
            </div>
        </main>
    );
}