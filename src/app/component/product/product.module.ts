import {NgModule} from '@angular/core';
import {AppComponent} from "../../app.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductCardComponent} from "./product-card/product-card.component";
import {ReviewCardComponent} from "./review-card/review-card.component";
import {ProductViewComponent} from "./product-view/product-view.component";
import {SharedModule} from "../../shared.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    ReviewCardComponent,
    ProductViewComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports:[

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class ProductModule {
}
