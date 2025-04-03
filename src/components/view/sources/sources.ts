import './sources.css';

export interface SourceType {
    id: string;
    name: string;
}

export default class Sources {
    public draw(data: ReadonlyArray<SourceType>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        if (!(sourceItemTemp instanceof HTMLTemplateElement)) {
            console.error('Template element #sourceItemTemp not found or not a HTMLTemplateElement');
            return;
        }

        data.forEach((item: SourceType) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);
            if (!(sourceClone instanceof DocumentFragment)) return;

            const sourceItemName = sourceClone.querySelector('.source__item-name');
            const sourceItem = sourceClone.querySelector('.source__item');

            if (sourceItemName && sourceItem) {
                sourceItemName.textContent = item.name;
                sourceItem.setAttribute('data-source-id', item.id);
            }

            fragment.appendChild(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.appendChild(fragment);
        } else {
            console.error('Container .sources not found');
        }
    }
}
