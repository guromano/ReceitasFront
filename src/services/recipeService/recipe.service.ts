import { Injectable } from '@angular/core';
import { Recipe } from 'src/models/recipe';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { CreateNewRecipeInput } from 'src/models/api-models/create-new-recipe-input';
import { Result } from 'src/models/api-models/result';
import { CreateNewResultResult } from 'src/models/api-models/create-new-recipe-result';
import { InsertIngredientsInput } from 'src/models/api-models/insert-ingredients-input';
import { InsertPrepareMethodInput } from 'src/models/api-models/insert-prepare-method-input';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private _httpClient:HttpClient) {

  }

  public CreateRecipe(recipe:Recipe):Promise<any>{
    return new Promise((resolve, reject) =>{
      this.StartNewRecipe(recipe)
      .then((result:Result<CreateNewResultResult>) =>{
          recipe.id = result.response.id;
          return this.InsertIgredients(recipe);
      })
      .then(() => {return this.InsertPrepareMethod(recipe)})
      .then(() => {resolve()})
    }).catch((ex) =>{
      console.log(ex);
      reject()
    });
  }

  public GetRecipes():Promise<Recipe[]>{
    return new Promise((resolve, reject) =>{
      this.GetAllRecipes()
      .then((result:Result<Recipe[]>) =>{
        resolve(result.response);
      })
      .catch((ex) =>{
        console.log(ex);
        reject();
      })
    })
  }


  private StartNewRecipe(recipe:Recipe):Promise<Result<CreateNewResultResult>>{
    var input = new CreateNewRecipeInput(recipe);
    return this._httpClient.post<Result<CreateNewResultResult>>(`${environment.urlRecipeApi}receitas`, input).toPromise();
  }

  private InsertIgredients(recipe:Recipe):Promise<Result<boolean>>{
    var input = new InsertIngredientsInput(recipe);
    return this._httpClient.post<Result<boolean>>(`${environment.urlRecipeApi}receitas/${recipe.id}/ingredientes`, input).toPromise();
  }

  private InsertPrepareMethod(recipe:Recipe):Promise<Result<boolean>>{
    var input = new InsertPrepareMethodInput(recipe);
    return this._httpClient.post<Result<boolean>>(`${environment.urlRecipeApi}receitas/${recipe.id}/modo-preparo`, input).toPromise();
  }

  private GetAllRecipes():Promise<Result<Recipe[]>>{
    return this._httpClient.get<Result<Array<Recipe>>>(`${environment.urlRecipeApi}receitas`).toPromise();
  }

}
