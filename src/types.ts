export enum Endpoints {
    Sources = 'sources',
    Everything = 'everything',
    TopHeadlines = 'top-headlines',
}

export type HttpMethod = 'GET' | 'POST';

export interface LoaderOptions {
    [key: string]: string;
}

export interface NewsItem {
    source: { name: string };
    author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
}

export interface Source {
    id: string;
    name: string;
}

export type NewsResponse = {
    articles: ReadonlyArray<NewsItem>;
};

export type SourcesResponse = {
    sources: ReadonlyArray<Source>;
};
