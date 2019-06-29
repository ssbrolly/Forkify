import axios from 'axios'; 
import { key, proxy } from '../config';

export default class recipe {
    constructor(id) {
        this.id = id;
    };

    async getRecipe() {
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch(error) {
            console.log(error);
            alert('Somthing Went Terribly Wrong :(');
        }
    };

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 3
    };

    calcServing() {
        this.servings = 4;
    };
};






























