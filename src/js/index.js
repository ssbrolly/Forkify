import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchViews from './views/searchView';
import * as recipeViews from './views/recipeView';
import * as listViews from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global State
* - Search Object
* - Current Recipe Object
* - Shopping List Object
* - Liked Recipes
*/

const state = {};
window.state = state;

/**
 * Search Controller
 */

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

/**
 * Recipe Controller
 */

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

/**
 * List Controller
 */
const controlList = () => {
    // Create a new List if there is none yet.
    if (!state.list) state.list = new List();

    // Add each ingredient to the list.
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
            listViews.renderItem(item);
    });
};

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        listViews.deleteItem(id);

    // Handle the count button
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        if (val > 0) state.list.updateCount(id, val);
        
    };
});

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {

    // Decrease button is cliked
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeViews.updateServingsIngredients(state.recipe);
        }
        
        // Increase button is clicked
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeViews.updateServingsIngredients(state.recipe);

    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    }
});




























