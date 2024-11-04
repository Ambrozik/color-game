import { Component, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { UserService } from './user/services/user.service';
import { Router } from '@angular/router';
import { catchError, Subscription, tap, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'color-game';
  #userService = inject(UserService)
  #router = inject(Router);
  loading = false;
  username: string | undefined;
  readonly #destroyRef = inject(DestroyRef);

  logout() {
    this.loading = true;
    this.#userService.logout()
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        tap(() => {
          this.loading = false;
          this.#router.navigate(['user/login'])
        }),
        catchError(err => {
          this.loading = false;
          return throwError(() => err);
        })
      )
      .subscribe()
  }

  ngOnInit(): void {
    this.#userService.user$.subscribe(
      user => this.username = user?.username
    )
  }
}
