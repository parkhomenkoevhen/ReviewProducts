import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from "../../../services/product.service";
import { ActivatedRoute,   Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { Subject, takeUntil } from "rxjs";
import { Product, Review, User } from "../../../model";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit, OnDestroy{

  public product!: Product;
  public reviews: Review[] = [];
  public user: User | null = null;

  public api = environment.staticUrl + '/';

  private unsubscribe$ = new Subject<void>();
  public rating: number = 0
  public isDescrp: boolean = true;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {
    this.authService.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => this.user = value)
    this.activatedRoute.data.pipe(takeUntil(this.unsubscribe$)).subscribe((data)=>{
      this.product = data['product'];
    })
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
