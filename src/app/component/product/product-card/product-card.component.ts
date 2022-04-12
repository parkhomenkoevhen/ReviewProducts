import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProductService } from "../../../services/product.service";
import { Subject, takeUntil} from "rxjs";
import { Product, Review } from "../../../model";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input() product!: Product;

  public reviews: Review[] = [];
  public api = environment.staticUrl + '/';

  public rating = 0;
  private unsubscribe$ = new Subject();

  constructor(private router: Router, private productService: ProductService ) {
  }

  ngOnInit(): void {
    if (this.product?.id) {
      this.productService.getReview(this.product?.id!).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        (data: Review[]) => {
          this.reviews = data;
          this.rating = Math.round (data.reduce((accum : number, a) => accum + a.rate, 0) / data.length);
        }
      )
    }
  }

  openDetail(): void{
    this.router.navigate([`product/${this.product?.id}`])
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next('');
    this.unsubscribe$.complete();
  }
}
