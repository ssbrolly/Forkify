import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchViews from './views/searchViews';
import * as recipeViews from './views/recipeViews';
import * as listViews from './views/listViews';
import * as likesViews from './views/likesViews';
import { elements, renderLoader, clearLoader } from './views/base';

/**Global State of the App;
 * - search object
 * - current reciped object
 * - shopoing list object
 * - likes recipes
 */
const state = {};
window.state = state;

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

/**
 * LIST CONTROLLER
 */

const controlList = () => {
    // Create a new list If there is none yet

    if (!state.list) state.list = new List();

    // Add each ingredients to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listViews.renderItem(item);
    });
};

// Handle delete and update is item events
elements.shopping.addEventListener('click', e => {
    // Get the id 
    const id = e.target.closest('.shopping__item').dataset.itemid;    

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);
         
        // Delete from UI
        listViews.deleteItem(id);
    };

    // Update the count
    if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val); 
    };
});

/**
 * LIKES CONTROLLER
 */

const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    
    const currentId = state.recipe.id;

    if (!state.likes.isLiked(currentId)) {
        // Add like to the state
        const newLikes = state.likes.addLike(
            currentId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img,
        );
        likesViews.toggleLikeBtn(true);
        // Toggle the like button
        
        // Add like to the UI list
        console.log(state.likes)
        
    } else {
        // Remove from the state
        state.likes.deleteLike(currentId);

        // Toggle the like button
        likesViews.toggleLikeBtn(false);
        
        // Remove from the UI list
        console.log(state.likes)
    };
};

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

    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    };
    
});























































