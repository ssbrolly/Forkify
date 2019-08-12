import Search from './models/Search';
import * as searchViews from './views/searchView'
import * as recipeViews from './views/recipeView'
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global State
* - Search Object
* - Current Recipe Object
* - Shopping List Object
* - Liked Recipes
*/

const state = {};

const controlSearch = async () => {
    // Get query from view
    const query = searchViews.getInput();

    if (query) {
        state.search = new Search(query);
        searchViews.clearInput();
        searchViews.clearResults();
        renderLoader(elements.searchRes);

        try {
            await state.search.getResults();
            clearLoader();
            searchViews.renderResults(state.search.results);
        } catch (err) {
            alert('Error');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        searchViews.clearResults();
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchViews.renderResults(state.search.results, goToPage);
    }
});

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');

    if (id) {

        recipeViews.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight selected search item
        if (state.search) searchViews.highlightSelected(id);

        //Create new recipe object
        state.recipe = new Recipe(id);

        try {

            // Get recipe ˇˇdata and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //Calculat servings and time
            state.recipe.calcTime();
            state.recipe.calcServing();

           //Render recipe
            clearLoader();
            recipeViews.renderRecipe(state.recipe);

        } catch (error) {
            alert(error);
        }      
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// // Handling recipe button clicks
// elements.recipe.addEventListener('click', e => {
//     if (e.target.matches('.btn-decrease, '))
// })










































