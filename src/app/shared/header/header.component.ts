import {Component, OnDestroy} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../model";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy{

  public user!: User | null;
  private unsubscribe$= new Subject<void>();

  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user) => {
      this.user = user
    });
  }

  logIn(params: string): void {
    this.router.navigate(['/login'], {queryParams: {reg: params}})
  }

  logOut(): void{
    this.auth.logout();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
