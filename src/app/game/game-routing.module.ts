import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';
import { GameNewComponent } from './game-new/game-new.component';

const routes: Routes = [{ path: '', component: GameComponent },
  {path:'new', component: GameNewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
