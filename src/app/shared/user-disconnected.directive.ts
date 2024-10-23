import { Directive } from '@angular/core';
import { UserConnectedDirective } from './user-connected.directive';

@Directive({
  selector: '[appUserDisconnected]'
})
export class UserDisconnectedDirective extends UserConnectedDirective{

  protected override hideIfNotConnected = false

  constructor() {
    super()
   }

}
