import { Recipe } from '../recipe';

export class InsertPrepareMethodInput{

    public description:string;
 
    constructor(recipe:Recipe) {
        this.description = recipe.prepareMethod;
    }
}