export type ShopProduct = {
    id: string;
    name: string;
    slug: string;
    category: string;
    description: string;
    price: number;
    image: string;
    rune: string;
    glow: "gold" | "blue" | "red";
    available: boolean;
    placeholder: boolean;
};