import { Article } from "./types";

const article: Article = {
    slug: "odin",

    title: "Odin",

    subtitle: "Der Wanderer zwischen den Welten",

    category: "Götter",

    image: "/blog/odin.jpg",

    author: "Maria Raab",

    date: "25.07.2026",

    excerpt:
        "Lorem ipsum dolor sit amet. Dieser Text dient zunächst als Platzhalter für die Vorschau des Artikels.",

    sections: [
        {
            heading: "Der Wanderer",
            text: `
Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet.
            `,
            image: "/blog/odin.jpg",
        },

        {
            heading: "Die Weisheit Odins",
            text: `
Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet.
            `,
        },

        {
            heading: "Das Vermächtnis",
            text: `
Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet.

Lorem ipsum dolor sit amet.
            `,
        },
    ],
};

export default article;