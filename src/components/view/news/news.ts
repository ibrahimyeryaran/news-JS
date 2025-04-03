import './news.css';

export interface NewsItemType {
    source: { name: string };
    author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
}

export default class News {
    public draw(data: ReadonlyArray<NewsItemType>): void {
        const news = data.length >= 10 ? data.slice(0, 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');

        if (!(newsItemTemp instanceof HTMLTemplateElement)) {
            console.error('Template element #newsItemTemp not found or not a HTMLTemplateElement');
            return;
        }

        news.forEach((item: NewsItemType, idx: number) => {
            const clone = newsItemTemp.content.cloneNode(true);
            if (!(clone instanceof DocumentFragment)) return;

            const newsItem = clone.querySelector('.news__item');
            if (newsItem && idx % 2 === 1) {
                newsItem.classList.add('alt');
            }

            const metaPhoto = clone.querySelector('.news__meta-photo');
            if (metaPhoto instanceof HTMLElement) {
                metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const metaAuthor = clone.querySelector('.news__meta-author');
            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name;
            }

            const metaDate = clone.querySelector('.news__meta-date');
            if (metaDate) {
                metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const descriptionTitle = clone.querySelector('.news__description-title');
            if (descriptionTitle) {
                descriptionTitle.textContent = item.title;
            }

            const descriptionSource = clone.querySelector('.news__description-source');
            if (descriptionSource) {
                descriptionSource.textContent = item.source.name;
            }

            const descriptionContent = clone.querySelector('.news__description-content');
            if (descriptionContent) {
                descriptionContent.textContent = item.description;
            }

            const readMoreLink = clone.querySelector('.news__read-more a');
            if (readMoreLink instanceof HTMLAnchorElement) {
                readMoreLink.href = item.url;
            }

            fragment.appendChild(clone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        } else {
            console.error('Container .news not found');
        }
    }
}
