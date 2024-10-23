import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  

  #router = inject(Router);
  #fb = inject(FormBuilder);
  #userService = inject(UserService);
  sub!: Subscription
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
    this.sub = this.#userService.login({email: user.email, password : user.password}).subscribe(
      {
        next: () => {
            this.loading = false;
            this.#router.navigate(['/home'])
        },
        error: (err) => {
          this.errorMessage = err;
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
