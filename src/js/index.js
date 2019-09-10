import Search from './models/Search';

/**Global State of the App;
 * - search object
 * - current reciped object
 * - shopoing list object
 * - likes recipes
 */
const state = {};

const search = new Search('pizza');
search.getResults();