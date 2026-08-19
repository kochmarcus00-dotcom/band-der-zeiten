import ShopClient from "./ShopClient";

export type Product = {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    image: string;
    rune: string;
    glow: "gold" | "blue" | "red";
};

const products: Product[] = [
    {
        id: 1,
        name: "Band der Zeiten",
        category: "Buch",
        description:
            "Der historische Liebesroman zwischen zwei Welten – Maya, Alva und eine Reise ins Norwegen des 9. Jahrhunderts.",
        price: 19.90,
        image: "/cover.jpg",
        rune: "ᚠ",
        glow: "gold",
    },
    {
        id: 2,
        name: "Freyjas Lesezeichen",
        category: "Lesezeichen",
        description:
            "Ein besonderes Lesezeichen aus der Welt von Freyjas Feder.",
        price: 4.90,
        image: "/shop-placeholder.jpg",
        rune: "ᛉ",
        glow: "blue",
    },
    {
        id: 3,
        name: "Freyjas Notizbuch",
        category: "Notizbuch",
        description:
            "Für Gedanken, Geschichten, Ideen und alles, was festgehalten werden möchte.",
        price: 12.90,
        image: "/shop-placeholder.jpg",
        rune: "ᚨ",
        glow: "gold",
    },
    {
        id: 4,
        name: "Valhalla T-Shirt",
        category: "Bekleidung",
        description:
            "Ein besonderes Stück aus der Welt von Freyjas Feder.",
        price: 24.90,
        image: "/shop-placeholder.jpg",
        rune: "ᛏ",
        glow: "red",
    },
    {
        id: 5,
        name: "Freyjas Becher",
        category: "Besonderes",
        description:
            "Für Kaffee, Tee und die nächste Reise in eine andere Welt.",
        price: 14.90,
        image: "/shop-placeholder.jpg",
        rune: "ᛟ",
        glow: "blue",
    },
];

export default function VikingShop() {
    return <ShopClient products={products} />;
}