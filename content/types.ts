export interface ArticleSection {
    heading: string;
    text: string;
    image?: string;
}

export interface Article {
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    image: string;
    author: string;
    date: string;
    excerpt: string;
    sections: ArticleSection[];
}