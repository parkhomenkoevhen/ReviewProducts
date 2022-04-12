import { Injectable }  from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment} from "../../environments/environment";
import { Product, Review } from "../model";

const url = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${url}/products`);
  }

  getReview(product: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${url}/reviews/${product}`);
  }

  setReview(id: number, review: Review): Observable<void>{
    const {rate , text} = review
    return this.http.post<void>(`${url}/reviews/${id}`, {rate , text});
  }

  getProductById(id: string): Observable<Product>{
    return this.getProductList().pipe(
      map((products: Product[]) => products.find(p => p.id === parseInt(id, 0))!)
    );
  }

}
