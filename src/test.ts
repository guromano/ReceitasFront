// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HomeComponent } from './app/home/home.component';
import { CreateComponent } from './app/create/create.component';
import { ListComponent } from './app/list/list.component';
import { RecipeService } from './services/recipeService/recipe.service';

declare const require: any;

getTestBed().configureTestingModule({
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ,
    ReactiveFormsModule
   ],
  declarations: [
    AppComponent,
    HomeComponent,
    CreateComponent,
    ListComponent
  ],
  providers:[    
    HttpClient,
    RecipeService
  ]
});
// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
