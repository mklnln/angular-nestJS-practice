import { Component, Input } from '@angular/core';
import { RowComponent } from '../row/row.component';
import { APIService } from '../api.service';
import { Row, RowLetter, RowNumber } from '../seats';

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [RowComponent],
  template: `
    <button
      class="seat-button"
      (click)="[reserveSeat()]"
      [attr.disabled]="this.reserved ? 'disabled' : null"
    >
      {{ this.seatID }}
    </button>
  `,
  styleUrl: './seat.component.css',
})
export class SeatComponent {
  @Input() num!: RowNumber;
  @Input() rowLetter!: RowLetter;
  @Input() row!: Row;
  seatID!: string;
  reserved!: boolean | undefined;

  ngOnChanges(): void {
    this.seatID = `${this.rowLetter}` + `${this.num}`;
    this.reserved = this.row[this.num].reserved;
  }

  constructor(private APIService: APIService) {}

  reserveSeat() {
    this.APIService.reserveSeat(this.seatID).subscribe(
      (res) => {
        this.row = res.body[this.rowLetter];
        console.log(res);
        this.reserved = true;
      },
      (err) => console.log(err)
    );
  }
}
