import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/models/recipe';
import { RecipeService } from 'src/services/recipeService/recipe.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  loading:boolean;
  error:boolean;

  recipes:Recipe[];

  constructor(private _recipeService:RecipeService) {
    this.loading = true;
    this.error = false;
  }

  ngOnInit() {
    this._recipeService.GetRecipes()
    .then((result) => {
      this.recipes = result;
      this.Succes();
    }).catch(() =>{
      this.Error();
    });
  }

  Succes(){
    this.loading = false;
  }

  Error(){
    this.loading = false;
    this.error = true;
  }

  MoreInfoBox($event){
    var box = $event.srcElement.closest(".recipe-item");
    box.classList.toggle("active");
  }
  TabChange($event){
    var element = $event.srcElement;
    if(!element.classList.contains("active")){
      var content = element.closest(".content");
      var ingredientContent =  content.querySelector(".ingredients-content")
      var prepareMethodContent = content.querySelector(".preparemethod-content");
      if(element.classList.contains("ingredients")){
        ingredientContent.classList.add("active");
        prepareMethodContent.classList.remove("active");
        content.querySelector(".preparemethod").classList.remove("active");
        element.classList.add("active");
      }else{
        ingredientContent.classList.remove("active");
        prepareMethodContent.classList.add("active");
        content.querySelector(".ingredients").classList.remove("active");
        element.classList.add("active");
      }
    }

  }
}
