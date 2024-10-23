import { Component, model } from '@angular/core';

@Component({
  selector: 'app-game-cell',
  templateUrl: './game-cell.component.html',
  styleUrl: './game-cell.component.css'
})
export class GameCellComponent {
  color = model<string>('white')

}
