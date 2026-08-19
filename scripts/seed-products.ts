import "dotenv/config";
import { prisma } from "../lib/prisma";

const products = [
    {
        name: "Band der Zeiten",
        slug: "band-der-zeiten",
        category: "Buch",
        description:
            "Der historische Liebesroman zwischen zwei Welten – Maya, Alva und eine Reise ins Norwegen des 9. Jahrhunderts.",
        price: "19.90",
        image: "/cover.jpg",
        rune: "ᚠ",
        glow: "gold",
        available: true,
        placeholder: false,
    },
    {
        name: "Freyjas Lesezeichen",
        slug: "freyjas-lesezeichen",
        category: "Lesezeichen",
        description:
            "Ein besonderes Lesezeichen aus der Welt von Freyjas Feder.",
        price: "4.90",
        image: "/shop-placeholder.jpg",
        rune: "ᛉ",
        glow: "blue",
        available: true,
        placeholder: true,
    },
    {
        name: "Freyjas Notizbuch",
        slug: "freyjas-notizbuch",
        category: "Notizbuch",
        description:
            "Für Gedanken, Geschichten, Ideen und alles, was festgehalten werden möchte.",
        price: "12.90",
        image: "/shop-placeholder.jpg",
        rune: "ᚨ",
        glow: "gold",
        available: true,
        placeholder: true,
    },
    {
        name: "Valhalla T-Shirt",
        slug: "valhalla-t-shirt",
        category: "Bekleidung",
        description:
            "Ein besonderes Stück aus der Welt von Freyjas Feder.",
        price: "24.90",
        image: "/shop-placeholder.jpg",
        rune: "ᛏ",
        glow: "red",
        available: true,
        placeholder: true,
    },
    {
        name: "Freyjas Becher",
        slug: "freyjas-becher",
        category: "Besonderes",
        description:
            "Für Kaffee, Tee und die nächste Reise in eine andere Welt.",
        price: "14.90",
        image: "/shop-placeholder.jpg",
        rune: "ᛟ",
        glow: "blue",
        available: true,
        placeholder: true,
    },
];

async function main() {
    for (const product of products) {
        await prisma.product.upsert({
            where: {
                slug: product.slug,
            },
            update: product,
            create: product,
        });
    }

    console.log(`✓ ${products.length} Produkte angelegt/aktualisiert.`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });