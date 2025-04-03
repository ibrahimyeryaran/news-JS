import AppLoader from './appLoader';


export type NewsResponseType = {
    articles: ReadonlyArray<NewsItem>;
};

export type SourcesResponseType = {
    sources: ReadonlyArray<Source>;
};

export enum Endpoints {
    Sources = 'sources',
    Everything = 'everything',
    TopHeadlines = 'top-headlines',
}

export interface LoaderOptions {
    [key: string]: string;
}

export default class AppController extends AppLoader {
    public getSources(callback: (data: SourcesResponseType) => void): void {
        this.getResp({ endpoint: Endpoints.Sources }, callback);
    }

    public getNews(e: Event, callback: (data: NewsResponseType) => void): void {
        const targetRaw = e.target;
        const containerRaw = e.currentTarget;

        if (!(targetRaw instanceof HTMLElement) || !(containerRaw instanceof HTMLElement)) {
            return;
        }

        let target: HTMLElement | null = targetRaw;
        const newsContainer: HTMLElement = containerRaw;

        while (target !== newsContainer && target !== null) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') || '';
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);

                    const query = target.getAttribute('data-query') || sourceId;
                    const from = target.getAttribute('data-from');
                    const to = target.getAttribute('data-to');
                    const sortBy = target.getAttribute('data-sortby');
                    const country = target.getAttribute('data-country');
                    const category = target.getAttribute('data-category');
                    const endpointAttr = target.getAttribute('data-endpoint') || Endpoints.Everything;

                    const options: LoaderOptions = { q: query };
                    if (from) options.from = from;
                    if (to) options.to = to;
                    if (sortBy) options.sortBy = sortBy;
                    if (country) options.country = country;
                    if (category) options.category = category;

                    // endpointAttr string döndüğü için enum'a açıkça eşleştiriyoruz (as kullanmadan)
                    const endpoint = Object.values(Endpoints).includes(endpointAttr as Endpoints)
                        ? endpointAttr as Endpoints
                        : Endpoints.Everything;

                    this.getResp<NewsResponse>({ endpoint, options }, callback);
                }
                return;
            }
            target = target.parentElement;
        }
    }
}
