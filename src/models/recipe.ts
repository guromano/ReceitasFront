import { Ingredient } from './ingredient';

export class Recipe{
    public id: number;
    public name: string;
    public portion: number;
    public calories: number;
    public ingredients: Array<Ingredient>;
    public prepareMethod: string;
}