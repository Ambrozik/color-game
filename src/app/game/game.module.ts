import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { GameNewComponent } from './game-new/game-new.component';
import { GameCellComponent } from './game-cell/game-cell.component';


@NgModule({
  declarations: [
    GameComponent,
    GameNewComponent,
    GameCellComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
