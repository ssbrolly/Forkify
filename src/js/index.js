import Search from './models/Search';


/* Global State
* - Search Object
* - Current Recipe Object
* - Shopping List Object
* - Liked Recipes
*/

const state = {};

const controlSearch = async () => {
    // Get query from view
    const query = 'pizza';

    if(query) {
        state.search = new Search(query);
        await state.search.getResults();
        console.log(state.search.results);
    }

}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})



































