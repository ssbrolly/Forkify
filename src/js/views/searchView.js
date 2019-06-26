import { elements } from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = '';
};
export const clearResults = () => {
    elements.searchResultsList.innerHTML = ''
}

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`
    }
    return title;
};

const renderRecipe = recipe => {
    const markup = `
         <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.searchResultsList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `
    
    <button class="btn-inline results__btn--prev">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-left"></use>
        </svg>
        <span>Page ${type === 'prev' ? - 1 : + 1}</span>
    </button>







    <button class="btn-inline results__btn--prev">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-left"></use>
        </svg>
        <span>Page 1</span>
    </button>
    <button class="btn-inline results__btn--next">
        <span>Page 3</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>
    </button>

`;

const renderButtons = (page, numResult, resPerPage) => {
    const pages = Math.ceil(numResult / resPerPage);

    if (page === 1 && pages > 1) {
        //Button to go to the next page
    } else if (page > 1 && page < pages ) {
        //Button both next and previous page
    } else if (page === pages && pages > 1) {
        //Button for previous page
    }
};

export const renderResults = (recipe, page = 1, resPerPage = 10) => {
    const start = (page -1) * resPerPage;
    const end = page * resPerPage;
    recipe.slice(start, end).forEach(renderRecipe);
};



































































