import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrokenImgDirective} from "./dicertive/broken-img.directive";
import {HeaderComponent} from "./shared/header/header.component";
import {AuthComponent} from "./component/auth/auth.component";
import {StarRatingComponentComponent} from "./shared/star-rating-component/star-rating-component.component";


@NgModule({
  declarations: [
   BrokenImgDirective,
   HeaderComponent,
   AuthComponent,
   StarRatingComponentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    BrokenImgDirective,
    HeaderComponent,
    AuthComponent,
    StarRatingComponentComponent
  ],

  bootstrap: [AppComponent]
})
export class SharedModule { }
