import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchViews from './views/searchViews';
import * as recipeViews from './views/recipeViews';
import { elements, renderLoader, clearLoader } from './views/base';

/**Global State of the App;
 * - search object
 * - current reciped object
 * - shopoing list object
 * - likes recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */

const controlSearch = async () => {
    //Get query from the view  1
    const query = searchViews.getInput();
    if (query) {
        //new search object and added to state;
        state.search = new Search(query);

        //prepare UI for the results
        searchViews.clearInput();
        searchViews.clearFields();
        renderLoader(elements.searchRes);

        try {
            //search for recipes
            await state.search.getResults();
            clearLoader();
            //render results to the UI
            searchViews.renderResults(state.search.results);
            
        } catch(error) {
            alert('Error');
            clearLoader();
        };
    };
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10)
        searchViews.clearFields();
        searchViews.renderResults(state.search.results, goToPage);
    };
});

/**
 * RECIPE CONTROLLER
 */

const controlRecipe = async () => {
    //Get id from the url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes
        recipeViews.clearRecipe();
        renderLoader(elements.recipe);

        // Highlinght the search item
        if (state.search) searchViews.higlightSelected(id);

        // Create new Recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data from server and parse ingredients
            await state.recipe.getRecipe(); 
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcServings();
            state.recipe.calcTime();

            // Render recipe
            clearLoader();
            recipeViews.renderRecipe(state.recipe);
        } catch(error) {
            alert('Something went wrong!');
        };

    };
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Recipe button clicks 
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeViews.updateServingsIngredients(state.recipe);        
        };

    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeViews.updateServingsIngredients(state.recipe);        
    };
});

























































