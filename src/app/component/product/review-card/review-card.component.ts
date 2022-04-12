import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../../../services/product.service";
import { AuthService } from "../../../services/auth.service";
import { take } from "rxjs";
import { Review, User } from "../../../model";

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit {

  @Input() review: Review | undefined
  @Input() canWrite = false;
  @Input() idProduct: number | undefined
  @Output() success = new EventEmitter<boolean>(false)

  public rate: number | undefined;
  public formReview: FormGroup;
  public user!: User | null;
  public comment: FormControl;

  constructor(private productService: ProductService, private fb: FormBuilder, private authService: AuthService) {
    this.comment = new FormControl('', Validators.required)
    this.formReview = this.fb.group({
        comment: [{value: '', disable: !this.canWrite}, Validators.required,],
      }
    )
    this.authService.user$.subscribe((user) => {
      this.user = user;
    })
  }

  ngOnInit(): void {
    this.comment.setValue(this.review?.text);
  }

  saveComment(): void {
    if(this.checkValid()) return;
    if (this.idProduct && this.user) {
      const newReview: Review = {
        product: this.idProduct,
        text: this.comment.value,
        rate: this.rate || 0,
        created_by: {
          id: 1,
          username: this.user.username,
        },
      }
      this.productService.setReview(this.idProduct, newReview).pipe(take(1))
        .subscribe(() => {
        this.success.emit(true);
        this.canWrite = false;
        this.review = newReview;
      })
    }
  }

  checkValid(): boolean {
    return !(this.comment.valid && this.rate);
  }

  setRate(event: number): void {
    this.rate = event;
  }
}
