export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResultsList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages')
};

export const elStrings =  {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};




















































































