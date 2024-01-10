import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SeatComponent } from '../seat/seat.component';
import { Row, RowLetter, RowNumber } from '../seats';

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [CommonModule, SeatComponent],
  template: ` <section class="seats-row">
    <p>Row {{ rowLetter }}</p>
    <app-seat
      *ngFor="let num of seatNums"
      [num]="num"
      [row]="row"
      [rowLetter]="rowLetter"
    >
    </app-seat>
  </section>`,
  styleUrl: './row.component.css',
})
export class RowComponent {
  @Input() row!: Row;
  @Input() rowLetter!: RowLetter;

  seatNums!: RowNumber[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['row'] && changes['rowLetter']) {
      this.seatNums = Object.keys(this.row) as RowNumber[];
    }
  }
}
