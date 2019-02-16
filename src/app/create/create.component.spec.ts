import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { Recipe } from 'src/models/recipe';
import { FormsModule } from '@angular/forms';
import { HttpClient } from 'selenium-webdriver/http';
import { RecipeService } from 'src/services/recipeService/recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { Ingredient } from 'src/models/ingredient';
import { RecipeServiceMock } from 'src/mock/recipe-service-mock';
import { NotifierService, NotifierModule } from 'angular-notifier';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule,
        HttpClientModule,
        NotifierModule
      ],
      declarations: [ CreateComponent ],
      providers: [
        {provide: RecipeService, useClass: RecipeServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as new Recipe after inits'`, () => {
    component.ngOnInit();
    var emptyRecipe = new Recipe();
    emptyRecipe.ingredients = new Array<Ingredient>();
    expect(component.recipe).toEqual(emptyRecipe);
  });

  it(`should not add null ingredients'`, () => {
    component.ngOnInit();
    component.formIngredientName = null;
    component.AddIngredient();
    expect(component.recipe.ingredients.length).toEqual(0);
  });

  it(`should add new ingredient in form'`, () => {
    component.ngOnInit();
    component.formIngredientName = "testIngredient";
    component.AddIngredient();
    expect(component.recipe.ingredients.length).toEqual(1);
    expect(component.recipe.ingredients[0].name).toEqual("testIngredient");
  });

  it(`should remove ingredient from recipe'`, () => {
    component.ngOnInit();
    component.formIngredientName = "testIngredient";
    component.AddIngredient();
    component.RemoveIngredient("testIngredient");
    expect(component.recipe.ingredients.length).toEqual(0);
  }); 

  it(`should create new ingredient'`, async () => {
    let notifierSpy = spyOn(NotifierService.prototype, 'notify');
    var recipeInput = {
      name:"TestSuccess",
      portion:1,
      calories:250,
      ingredients:[{name:"TestIngredient"}],
      prepareMethod:"TestePrepareMethod"
    } as Recipe;
    component.ngOnInit();
    component.recipe = recipeInput;
    await component.CreateRecipe();
    expect(notifierSpy).toHaveBeenCalledWith( 'success', "Receita criada com sucesso!" );
  }); 

  it(`should show error if create recipe method fails'`, async () => {
    let notifierSpy = spyOn(NotifierService.prototype, 'notify');
    var recipeInput = {
      name:"TestError",
      portion:1,
      calories:250,
      ingredients:[{name:"TestIngredient"}],
      prepareMethod:"TestePrepareMethod"
    } as Recipe;
    component.ngOnInit();
    component.recipe = recipeInput;
    await component.CreateRecipe().catch(() =>{
      expect(notifierSpy).toHaveBeenCalledWith('error', "Algo deu errado, tente novamente mais tarde.");
    });
  }); 

});

