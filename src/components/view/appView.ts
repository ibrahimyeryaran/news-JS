import News from './news/news';
import Sources from './sources/sources';

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

export type NewsResponseType = {
    articles: ReadonlyArray<NewsItem>;
};

export type SourcesResponseType = {
    sources: ReadonlyArray<Source>;
};

export default class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsResponseType): void {
        const articles: ReadonlyArray<(typeof data.articles)[number]> = data.articles;
        this.news.draw(articles);
    }

    public drawSources(data: SourcesResponseType): void {
        const sources: ReadonlyArray<(typeof data.sources)[number]> = data.sources;
        this.sources.draw(sources);
    }
}
