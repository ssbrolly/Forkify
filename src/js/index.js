import Search from './models/Search';
import * as searchViews from './views/searchView'
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

    if(query) {
        state.search = new Search(query);
        searchViews.clearInput();
        searchViews.clearResults();
        renderLoader(elements.searchRes);
        clearLoader();
        await state.search.getResults();
        searchViews.renderResults(state.search.results);
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});














































































