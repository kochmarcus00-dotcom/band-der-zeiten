import ShopClient from "./ShopClient";
import { prisma } from "../../lib/prisma";
import type { ShopProduct } from "../../lib/shop-types";

export default async function VikingShop() {
    const productsFromDatabase = await prisma.product.findMany({
        where: {
            available: true,
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    const products: ShopProduct[] = productsFromDatabase.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        category: product.category,
        description: product.description,
        price: Number(product.price),
        image: product.image,
        rune: product.rune,
        glow: product.glow as "gold" | "blue" | "red",
        available: product.available,
        placeholder: product.placeholder,
    }));

    return <ShopClient products={products} />;
}