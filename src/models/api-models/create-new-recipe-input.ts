import { Recipe } from '../recipe';

export class CreateNewRecipeInput{

    public name:string 
    public portion:number;
    public calories:number;

    constructor(recipe:Recipe) {
        this.name = recipe.name;
        this.portion = recipe.portion;
        this.calories = recipe.calories;
    }
}