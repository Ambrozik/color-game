import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { UserService } from './user/services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'color-game';
  #userService = inject(UserService)
  #router = inject(Router);
  loading = false;
  #sub!: Subscription;
  username: string | undefined
  logout() {
    this.loading = true;
    this.#sub = this.#userService.logout().subscribe(() => {
      this.loading = false;
      this.#router.navigate(['user/login'])
    })
  }

  ngOnInit(): void {
    this.#userService.user$.subscribe(
      user => this.username = user?.username
    )
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }
}
