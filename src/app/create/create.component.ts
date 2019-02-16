import { Component, OnInit, Injectable } from '@angular/core';
import { RecipeService } from 'src/services/recipeService/recipe.service';
import { Recipe } from 'src/models/recipe';
import { Ingredient } from 'src/models/ingredient';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
@Injectable()

export class CreateComponent implements OnInit {

  constructor(private _recipeService:RecipeService, private _notifierService: NotifierService) { }

  recipe:Recipe;
  formIngredientName:string;
  loading:boolean;
  error:boolean;
  

  ngOnInit() {
    this.StartForm();
  }

  AddIngredient(){
    if(this.formIngredientName == null || this.formIngredientName == ""){
        this._notifierService.notify( 'warning', "Insira um nome de ingrediente." );
        return;
    }
    if(!this.recipe.ingredients.find(x => x.name == this.formIngredientName)){
      this.recipe.ingredients.push({name : this.formIngredientName});
      this.formIngredientName = "";
    }else{
      this._notifierService.notify( 'error', "Igrediente já adicionado!");
    }
  }

  RemoveIngredient(name:string){
    var index = this.recipe.ingredients.findIndex(x => x.name == name);
    if (index > -1) {
      this.recipe.ingredients.splice(index, 1);
    }
  }

  StartForm(){
    this.recipe = new Recipe();
    this.recipe.ingredients = new Array<Ingredient>();
    this.formIngredientName = "";
  }

  CreateRecipe():Promise<any>{
    if(this.ValidateRecipeModel()){
      document.getElementById("create-button").classList.add("loading");
      return this._recipeService.CreateRecipe(this.recipe)
      .then(() =>{
        this.StartForm();
        this._notifierService.notify( 'success', "Receita criada com sucesso!" );
      })
      .catch(() =>{
        this.error = true;
        this._notifierService.notify( 'error', "Algo deu errado, tente novamente mais tarde." );
      })
      .finally(() =>{
        document.getElementById("create-button").classList.remove("loading");
      });
    }else{
      this._notifierService.notify( 'warning', "Preencha todos os campos!" );
    }
  }

  ValidateRecipeModel():boolean{
    return !(this.recipe.name == null ||
      this.recipe.name == "" ||
      this.recipe.calories == null ||
      this.recipe.portion == null ||
      this.recipe.ingredients.length == 0 || 
      this.recipe.prepareMethod == null ||
      this.recipe.prepareMethod == "")
  }

}
