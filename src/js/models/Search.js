import axios from 'axios';


export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const key = '02ff53280492126bc905457cabf6d7f7';
        // const cors = 'https://cors-anywhere.herokuapp.com/'
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.recipes = res.data.recipes;
            console.log(this.recipes);
        } catch (error) {
            alert(error);
        }
    }
}





































































































