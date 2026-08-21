import { revalidatePath } from "next/cache";
import { del, put } from "@vercel/blob";
import { prisma } from "../../../lib/prisma";
import EditProductForm from "./EditProductForm";
import NewProductForm from "./NewProductForm";
import DeleteProductButton from "./DeleteProductButton";
import { requireAdminAction } from "@/lib/admin-auth-action";
import LogoutButton from "../LogoutButton";
import AdminHeader from "../AdminHeader";

async function createProduct(formData: FormData) {
    "use server";

    await requireAdminAction();

    // Rest unverändert

    const name = String(formData.get("name") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const price = Number(formData.get("price") || 0);
    const description = String(formData.get("description") || "").trim();

    const image = String(
        formData.get("image") || "/shop-placeholder.jpg"
    ).trim();

    const rune = String(formData.get("rune") || "ᚠ").trim();
    const glow = String(formData.get("glow") || "gold");
    const placeholder = formData.get("placeholder") === "on";

    if (!name || !category || !description || price < 0) {
        throw new Error("Bitte alle Pflichtfelder korrekt ausfüllen.");
    }

    const slug = `${name}-${Date.now()}`
        .toLowerCase()
        .replace(/[^a-z0-9äöüß]+/g, "-")
        .replace(/^-|-$/g, "");

    await prisma.product.create({
        data: {
            name,
            slug,
            category,
            description,
            price,
            image,
            rune,
            glow,
            available: true,
            placeholder,
        },
    });

    revalidatePath("/admin/produkte");
    revalidatePath("/vikingshop");
}

export async function updateProduct(
    _previousState: { success: boolean; message?: string },
    formData: FormData
) {
    "use server";

    await requireAdminAction();

    // Rest unverändert
    const id = String(formData.get("id") || "");
    const name = String(formData.get("name") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const price = Number(formData.get("price") || 0);
    const description = String(
        formData.get("description") || ""
    ).trim();

    const image = String(
        formData.get("image") || "/shop-placeholder.jpg"
    ).trim();

    const rune = String(
        formData.get("rune") || "ᚠ"
    ).trim();

    const glow = String(
        formData.get("glow") || "gold"
    );

    const placeholder =
        formData.get("placeholder") === "on";

    const available =
        formData.get("available") === "on";

    if (
        !id ||
        !name ||
        !category ||
        !description ||
        price < 0
    ) {
        return {
            success: false,
            message: "Bitte alle Pflichtfelder korrekt ausfüllen.",
        };
    }

    // Aktuelles Produkt laden
    const oldProduct = await prisma.product.findUnique({
        where: {
            id,
        },
        select: {
            image: true,
        },
    });

    if (!oldProduct) {
        return {
            success: false,
            message: "Produkt nicht gefunden.",
        };
    }

    // Produkt aktualisieren
    await prisma.product.update({
        where: {
            id,
        },
        data: {
            name,
            category,
            price,
            description,
            image,
            rune,
            glow,
            placeholder,
            available,
        },
    });

    // Altes Blob-Bild löschen, wenn wirklich ein neues Bild
    // verwendet wurde.
    if (
        oldProduct.image &&
        oldProduct.image !== image &&
        oldProduct.image.includes(
            ".public.blob.vercel-storage.com/"
        )
    ) {
        try {
            await del(oldProduct.image);
        } catch (error) {
            console.error(
                "Altes Produktbild konnte nicht gelöscht werden:",
                error
            );
        }
    }

    revalidatePath("/admin/produkte");
    revalidatePath("/vikingshop");

    return {
        success: true,
    };
}
async function deleteProduct(formData: FormData) {
    "use server";

    await requireAdminAction();

    // Rest unverändert

    const id = String(formData.get("id") || "");

    if (!id) {
        throw new Error("Produkt-ID fehlt.");
    }

    // Produkt zuerst aus der Datenbank holen,
    // damit wir die zugehörige Bild-URL kennen.
    const product = await prisma.product.findUnique({
        where: {
            id,
        },
        select: {
            image: true,
        },
    });

    if (!product) {
        throw new Error("Produkt nicht gefunden.");
    }

    // Produkt aus Prisma löschen
    await prisma.product.delete({
        where: {
            id,
        },
    });

    // Nur Vercel-Blob-Bilder löschen.
    // Lokale Bilder wie /shop-placeholder.jpg oder /cover.jpg
    // bleiben natürlich erhalten.
    if (
        product.image &&
        product.image.includes(".public.blob.vercel-storage.com/")
    ) {
        try {
            await del(product.image);
        } catch (error) {
            console.error(
                "Blob konnte nach Produktlöschung nicht gelöscht werden:",
                error
            );
        }
    }

    revalidatePath("/admin/produkte");
    revalidatePath("/vikingshop");
}
export default async function ProdukteAdmin() {
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: "asc",
        },
    });

    return (
        <main className="min-h-screen bg-[#090909] px-6 py-12 text-white md:px-10">
            <div className="mx-auto max-w-6xl">

                {/* HEADER */}
                <div className="mb-10">
                    <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c8a46b]">
                        VikingShop Admin
                    </p>

                    <AdminHeader title="Bestellungen" />
                </div>

                {/* NEUES PRODUKT */}
                <section className="mb-12 rounded-3xl border border-white/10 bg-[#111] p-6 md:p-8">
                    <h2 className="text-2xl font-semibold">
                        Neues Produkt
                    </h2>

                    <p className="mt-2 text-sm text-stone-400">
                        Neues Produkt für Freyjas Schatzkammer anlegen.
                    </p>

                    <NewProductForm createProduct={createProduct} />
                </section>

                {/* PRODUKTE */}
                <section className="rounded-3xl border border-white/10 bg-[#111] p-6 md:p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold">
                                Vorhandene Produkte
                            </h2>

                            <p className="mt-2 text-sm text-stone-400">
                                {products.length} Produkt
                                {products.length === 1 ? "" : "e"} im Shop.
                            </p>
                        </div>
                    </div>

                    {products.length === 0 ? (
                        <div className="rounded-2xl border border-white/10 bg-[#090909] p-10 text-center">
                            <p className="text-stone-400">
                                Noch keine Produkte vorhanden.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="rounded-2xl border border-white/10 bg-[#090909] p-5"
                                >
                                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="text-xl font-semibold">
                                                    {product.name}
                                                </h3>

                                                <span className="rounded-full border border-[#c8a46b]/30 px-3 py-1 text-xs text-[#d8b16d]">
                                                    {product.category}
                                                </span>

                                                {product.available ? (
                                                    <span className="rounded-full border border-green-500/30 px-3 py-1 text-xs text-green-400">
                                                        Online
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full border border-red-500/30 px-3 py-1 text-xs text-red-400">
                                                        Offline
                                                    </span>
                                                )}
                                            </div>

                                            <p className="mt-3 text-sm text-stone-400">
                                                {product.description}
                                            </p>

                                            <div className="mt-4 flex flex-wrap gap-5 text-sm">
                                                <span className="text-[#d8b16d]">
                                                    {Number(product.price).toFixed(2)} €
                                                </span>

                                                <span className="truncate text-stone-500">
                                                    {product.image}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            <EditProductForm
                                                product={{
                                                    id: product.id,
                                                    name: product.name,
                                                    category: product.category,
                                                    price: Number(product.price),
                                                    description: product.description,
                                                    image: product.image,
                                                    rune: product.rune,
                                                    glow: product.glow,
                                                    available: product.available,
                                                    placeholder: product.placeholder,
                                                }}
                                                updateProduct={updateProduct}
                                            />

                                            <DeleteProductButton
                                                productName={product.name}
                                                productId={product.id}
                                                deleteProduct={deleteProduct}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}