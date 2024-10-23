import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { UserConnectedDirective } from './user-connected.directive';
import { UserDisconnectedDirective } from './user-disconnected.directive';



@NgModule({
  imports: [
    CommonModule
  ],
  
  declarations: [
    LoadingComponent,
    UserConnectedDirective,
    UserDisconnectedDirective
  ],
 
  exports: [
    LoadingComponent, // Exporte le composant pour qu'il soit accessible dans d'autres modules
    UserConnectedDirective,
    UserDisconnectedDirective
  ]
})
export class SharedModule { }
