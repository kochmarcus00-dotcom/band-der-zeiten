import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/admin-auth";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function PATCH(
    request: Request,
    { params }: RouteContext
) {
    try {
        const authenticated = await requireAdminApi();

        if (!authenticated) {
            return NextResponse.json(
                { error: "SESSION_EXPIRED" },
                { status: 401 }
            );
        }

        const { id } = await params;
        const body = await request.json();

        const {
            title,
            subtitle,
            category,
            author,
            date,
            image,
            excerpt,
            published,
            sections,
        } = body;

        if (!title || !category || !author || !excerpt) {
            return NextResponse.json(
                {
                    error: "Bitte Titel, Kategorie, Autor und Kurzbeschreibung ausfüllen.",
                },
                { status: 400 }
            );
        }

        const article = await prisma.blogArticle.findUnique({
            where: { id },
        });

        if (!article) {
            return NextResponse.json(
                { error: "Artikel nicht gefunden." },
                { status: 404 }
            );
        }

        await prisma.$transaction(async (tx) => {
            await tx.blogArticle.update({
                where: { id },
                data: {
                    title: String(title),
                    subtitle: String(subtitle || ""),
                    category: String(category),
                    author: String(author),
                    date: String(date || ""),
                    image: String(image || ""),
                    excerpt: String(excerpt),
                    published: Boolean(published),
                },
            });

            await tx.blogSection.deleteMany({
                where: {
                    articleId: id,
                },
            });

            if (Array.isArray(sections)) {
                await tx.blogSection.createMany({
                    data: sections.map(
                        (
                            section: {
                                heading?: string;
                                text?: string;
                                image?: string;
                                position?: number;
                            },
                            index: number
                        ) => ({
                            articleId: id,
                            heading: String(section.heading || ""),
                            text: String(section.text || ""),
                            image: String(section.image || ""),
                            position:
                                typeof section.position === "number"
                                    ? section.position
                                    : index,
                        })
                    ),
                });
            }
        });

        return NextResponse.json({
            success: true,
            message: "Artikel gespeichert.",
        });
    } catch (error) {
        console.error("PATCH /api/admin/nordische-welt/[id]", error);

        return NextResponse.json(
            {
                error: "Artikel konnte nicht gespeichert werden.",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: Request,
    { params }: RouteContext
) {
    try {
        const authenticated = await requireAdminApi();

        if (!authenticated) {
            return NextResponse.json(
                { error: "SESSION_EXPIRED" },
                { status: 401 }
            );
        }

        const { id } = await params;

        const article = await prisma.blogArticle.findUnique({
            where: { id },
        });

        if (!article) {
            return NextResponse.json(
                { error: "Artikel nicht gefunden." },
                { status: 404 }
            );
        }

        await prisma.blogArticle.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: "Artikel gelöscht.",
        });
    } catch (error) {
        console.error("DELETE /api/admin/nordische-welt/[id]", error);

        return NextResponse.json(
            {
                error: "Artikel konnte nicht gelöscht werden.",
            },
            { status: 500 }
        );
    }
}