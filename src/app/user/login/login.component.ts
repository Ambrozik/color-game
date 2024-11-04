import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  #router = inject(Router);
  #fb = inject(FormBuilder);
  #userService = inject(UserService);
  readonly #destroyRef = inject(DestroyRef);
  loading = false;
  errorMessage: string | null = null;

  formGroup = this.#fb.group({
    email: ['', Validators.compose([
      Validators.required, Validators.minLength(6), Validators.email
    ])],
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ])],
  })

  submit(event: Event) {
    event.preventDefault();
    this.loading = true;
    const user = Object.assign(this.formGroup.value)
    this.#userService.login({ email: user.email, password: user.password }).
      pipe(
        takeUntilDestroyed(this.#destroyRef),
        tap(() => {
          this.loading = false;
          this.#router.navigate(['/home']);
        }),
        catchError(err => {
          this.loading = false;
          this.errorMessage = err;
          return throwError(() => err);
        })
      )
      .subscribe()
  }
}
