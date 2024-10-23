import { Component, inject, model, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export type table = {
  x: number,
  y: number
}
@Component({
  selector: 'app-game-new',
  templateUrl: './game-new.component.html',
  styleUrl: './game-new.component.css'
})


export class GameNewComponent {
  #fb = inject(FormBuilder);
  table = model<string[][]>([['red', 'blue'], ['green', 'blue']])

  formGroup: FormGroup;
  constructor() {
    this.formGroup = this.#fb.group({
      rows: [2, [Validators.required, Validators.min(1), Validators.max(3)]],
      cols: [2, [Validators.required, Validators.min(1), Validators.max(6)]]
    });

    this.formGroup.valueChanges.subscribe((value) => {
      this.table.set(this.resizeTable(value.rows, value.cols))
    });
  }


  resizeTable(newRows: number, newCols: number) {
    return Array.from({ length: newRows }, (_, i) =>
      Array.from({ length: newCols }, (_, j) =>
        (i < this.table().length && j < this.table()[i].length) ? this.table()[i][j] : 'white'
      ))
  }

  trackRow(index: number) {
    return index;
  }

  trackCol(index: number) {
    return index;
  }
}
