import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeService } from 'src/services/recipeService/recipe.service';
import { RecipeServiceMock } from 'src/mock/recipe-service-mock';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ ListComponent ],
      providers:[ {provide: RecipeService, useClass: RecipeServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show recipe', async () => {
    await component.ngOnInit();
    expect(component.error).toEqual(false);
    expect(component.loading).toEqual(false);
    expect(component.recipes.length).toEqual(1);
  });

  it('should set error to true', async () => {
    component.error = false;
    component.loading = true;
    component.Error();
    expect(component.error).toEqual(true);
  });
});
