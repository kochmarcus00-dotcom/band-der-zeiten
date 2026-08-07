import { Article } from "./types";

const article: Article = {
    slug: "wikingerdorf",

    title: "Das Wikingerdorf",

    subtitle: "Das tägliche Leben im Norden",

    category: "Alltag",

    image: "/blog/wikingerdorf.jpg",

    author: "Maria Raab",

    date: "25.07.2026",

    excerpt:
        "Lorem ipsum dolor sit amet. Dieser Text dient zunächst als Platzhalter für die Vorschau des Artikels.",

    sections: [
        {
            heading: "Das Leben im Dorf",
            text: `
Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...
            `,
            image: "/blog/wikingerdorf.jpg",
        },

        {
            heading: "Handwerk und Handel",
            text: `
Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...
            `,
        },

        {
            heading: "Familie und Gemeinschaft",
            text: `
Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...

Lorem ipsum dolor sit amet...
            `,
        },
    ],
};

export default article;