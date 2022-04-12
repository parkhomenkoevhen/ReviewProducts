import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from "../../../services/product.service";
import { Subject, takeUntil } from "rxjs";
import { Product } from "../../../model";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  public productList: Product[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProductList().pipe(takeUntil(this.unsubscribe$)).subscribe((products) => this.productList = products);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
