import Search from './models/Search';
import * as searchViews from './views/searchViews';
import { elements, renderLoader, clearLoader } from './views/base';

/**Global State of the App;
 * - search object
 * - current reciped object
 * - shopoing list object
 * - likes recipes
 */
const state = {};

const controlSearch = async () => {
    //Get query from the view  1
    const query = searchViews.getInput();
    console.log(query);
    if (query) {
        //new search object and added to state;
        state.search = new Search(query);

        //prepare UI for the results
        searchViews.clearInput();
        searchViews.clearFields();
        renderLoader(elements.searchRes);

        //search for recipes
        await state.search.getResults();
        clearLoader();
        //render results to the UI
        searchViews.renderResults(state.search.results);
    };
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});











































