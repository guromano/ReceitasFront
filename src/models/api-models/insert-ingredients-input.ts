import { Recipe } from '../recipe';
import { Ingredient } from '../ingredient';

export class InsertIngredientsInput{

    public ingredients: string[]
    

    constructor(recipe:Recipe) {
        this.ingredients = new Array<string>();
        recipe.ingredients.forEach(ingredient => {
            this.ingredients.push(ingredient.name);
        });
    }
}