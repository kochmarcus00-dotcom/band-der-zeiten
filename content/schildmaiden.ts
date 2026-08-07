import { Article } from "./types";

const article: Article = {
    slug: "schildmaiden",

    title: "Schildmaiden",

    subtitle: "Die Frauen, die Geschichte schrieben",

    category: "Geschichte",

    image: "/blog/schildmaiden.jpg",

    author: "Maria Raab",

    date: "25.07.2026",

    excerpt:
        "Lorem ipsum dolor sit amet. Dieser Text dient zunächst als Platzhalter für die Vorschau des Artikels.",

    sections: [
        {
            heading: "Die Schildmaid",
            text: `
Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...
            `,
            image: "/blog/schildmaiden.jpg",
        },

        {
            heading: "Mythos und Wirklichkeit",
            text: `
Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...
            `,
        },

        {
            heading: "Frauen in der Wikingerzeit",
            text: `
Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...
            `,
        },
    ],
};

export default article;