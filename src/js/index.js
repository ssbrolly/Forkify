import Search from './models/Search';

/**Global State of the App;
 * - search object
 * - current reciped object
 * - shopoing list object
 * - likes recipes
 */
const state = {};

const controlSearch = async () => {
    //Get query from the view
    const query = 'pizza';

    if (query) {
        //new search object and added to state;
        state.search = new Search(query);

        //prepare UI for the results

        //search for recipes
        await state.search.getResults();

        //render results to the UI
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})
















































