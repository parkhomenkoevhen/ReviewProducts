import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { LoginResponse, User } from "../model";

const url = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$ = new ReplaySubject<User | null>(1);

  constructor(private http: HttpClient) {
  }

  public logIn(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${url}/login/`, user).pipe(
      tap((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(user));
          this.user$.next(user);
        }
      })
    )
  }

  public register(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${url}/register/`, user).pipe(
      tap((data) => {
        if (data.token) localStorage.setItem('token', data.token);
      })
    )
  }

  public logout(): void {
    this.user$.next(null);
    localStorage.clear();
  }

  public getAuthToken() {
    return localStorage.getItem('token');
  }

  public getUser(): User | undefined{
    const user = localStorage.getItem('user');
    if(user) return JSON.parse(user);
    return;
  }

  public checkAuthState() {
    const token  = this.getAuthToken();
    const user = this.getUser();
    if(token && user){
      this.user$.next(user);
    }
  }
}
