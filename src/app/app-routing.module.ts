import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {ProductListComponent} from "./component/product/product-list/product-list.component";
import {AuthComponent} from "./component/auth/auth.component";
import {ProductViewComponent} from "./component/product/product-view/product-view.component";
import {ProductResolver} from "./services/product.resolver";


export const routes: Route[] = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'product',
  },
  {
    path: 'product',
    pathMatch: 'full',
    component: ProductListComponent,
  },
  {
    path: 'product/:id',
    component: ProductViewComponent,
    resolve: {
      product: ProductResolver,
    }
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: '**',
    redirectTo: '/product'
  },

]
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
