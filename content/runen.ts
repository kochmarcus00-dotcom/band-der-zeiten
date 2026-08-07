import { Article } from "./types";

const article: Article = {
    slug: "runen",

    title: "Runen",

    subtitle: "Die geheimnisvollen Zeichen des Nordens",

    category: "Mythologie",

    image: "/blog/runen.jpg",

    author: "Maria Raab",

    date: "25.07.2026",

    excerpt:
        "Lorem ipsum dolor sit amet. Dieser Text dient zunächst als Platzhalter für die Vorschau des Artikels.",

    sections: [
        {
            heading: "Die Ursprünge der Runen",
            text: `
Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...
            `,
            image: "/blog/runen.jpg",
        },

        {
            heading: "Die Bedeutung der Runen",
            text: `
Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...
            `,
        },

        {
            heading: "Runen in der Wikingerwelt",
            text: `
Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...
            `,
        },
    ],
};

export default article;