import { Directive, ElementRef, HostListener, inject, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../user/services/user.service';

@Directive({
  selector: '[appUserConnected]'
})
export class UserConnectedDirective implements OnInit {

  #el = inject(ElementRef);
  #userService = inject(UserService);
  #renderer = inject(Renderer2);

    protected hideIfNotConnected = true


  ngOnInit(): void {

    this.#userService.user$.subscribe(
      user => {
        const shouldHide = this.hideIfNotConnected ? !user : !!user;
        
        if (shouldHide) {
          this.#renderer.addClass(this.#el.nativeElement, 'd-none')
        } else {
          this.#renderer.removeClass(this.#el.nativeElement, 'd-none');
        }
      }
    )
  }

}
