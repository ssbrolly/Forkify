// import Search from './models/Search';
// import * as searchViews from './views/searchView'
// import Recipe from './models/Recipe';
// import { elements, renderLoader, clearLoader } from './views/base';

// /* Global State
// * - Search Object
// * - Current Recipe Object
// * - Shopping List Object
// * - Liked Recipes
// */

// const state = {};

// const controlSearch = async () => {
//     // Get query from view
//     const query = searchViews.getInput();

//     if (query) {
//         state.search = new Search(query);
//         searchViews.clearInput();
//         searchViews.clearResults();
//         renderLoader(elements.searchRes);

//         try {
//             await state.search.getResults();
//             clearLoader();
//             searchViews.renderResults(state.search.results);
//         } catch (err) {
//             alert('Error');
//             clearLoader();
//         }
//     }
// };

// elements.searchForm.addEventListener('submit', e => {
//     e.preventDefault();
//     controlSearch();
// });

// elements.searchResPages.addEventListener('click', e => {
//     const btn = e.target.closest('.btn-inline');
//     if (btn) {
//         searchViews.clearResults();
//         const goToPage = parseInt(btn.dataset.goto, 10);
//         searchViews.renderResults(state.search.results, goToPage);
//     }
// });

// const controlRecipe = async () => {
//     const id = window.location.hash.replace('#', '');

//     if (id) {
//         state.recipe = new Recipe(id);

//         try {
//             await state.recipe.getRecipe();
//             state.recipe.calcServing();
//             // console.log(state.recipe);
//         } catch (error) {
//             alert(error);
//         }
            
//     }
// }

// ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));










import Search from './models/Search';
import { elements } from  './views/base';
import * as searchView from './views/searchView'; 

//Global state of the app
const state = {};

const controlSearch = async () => {
    //1) get the query
    const query = searchView.getInput();
    console.log(query);

    if (query) {
        state.search = new Search(query);
        await state.search.getResults();
        searchView.clearInput();
        searchView.clearResults();
        searchView.renderResults(state.search.result);
        console.log(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

// const pizza = new Search('pizza');
// console.log(pizza);
// pizza.getResults();












































