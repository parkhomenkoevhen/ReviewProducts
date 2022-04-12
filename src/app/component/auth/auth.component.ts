import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, take } from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements  OnDestroy {
  public loginForm: FormGroup;
  public isRegister: boolean = false;
  public errorMessages: any;
  private unsubscribe$ = new Subject<undefined>();
  public successMessages: string | undefined;

  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  logIn(): void {
    const { value } = this.loginForm;

    if (this.isRegister) {
      this.authService.register(value).pipe(
        take(1)
      ).subscribe(() => {
        this.successMessages = "You registration success, please enter in your account";
       });
    }
    if (!this.isRegister)
      this.authService.logIn(value).pipe(
        take(1),
      ).subscribe((item) => {
        if (item.success) {
          this.router.navigate(['/']);
        }
        this.errorMessages = item;
        this.loginForm.reset();
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }

  changeRegister(value: boolean): void{
    this.isRegister = value;
    this.loginForm.reset();
    this.errorMessages = undefined;
  }
}
