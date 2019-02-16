import { RecipeService } from 'src/services/recipeService/recipe.service';
import { Recipe } from 'src/models/recipe';

export class RecipeServiceMock extends RecipeService{
    public CreateRecipe(recipe:Recipe):Promise<any>{
        return new Promise((resolve, reject) =>{
            if(recipe.name == "TestSuccess"){
                resolve();
            }else{
                reject();
            }
        });
    }
    
    public GetRecipes():Promise<Recipe[]>{
        return new Promise((resolve, reject) =>{
            var recipeMock = {
                id:1,
                name:"Test",
                portion:1,
                calories:250,
                ingredients:[{name:"TestIngredient"}],
                prepareMethod:"TestePrepareMethod"
              } as Recipe;
            resolve(new Array<Recipe>(recipeMock));
        });
    }
} 