import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RowComponent } from './row/row.component';
import { APIService } from './api.service';
import { AllSeats, Row, RowLetter } from './seats';
import * as data from '../../server/src/DB/data.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RowComponent],
  template: `
    <h1 class="title">Tickets</h1>
    <section class="seats-grid">
      <app-row
        *ngFor="let letter of rowLetters"
        [row]="getFirstRow(letter)"
        [rowLetter]="letter"
      ></app-row>
    </section>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  rowLetters!: RowLetter[];
  seatRows!: AllSeats;
  APIService: APIService = inject(APIService);

  getFirstRow(letter: RowLetter): Row {
    return this.seatRows[letter] as Row;
  }

  ngOnInit() {
    this.APIService.getAllSeats().subscribe({
      next: (seats: AllSeats) => {
        this.seatRows = seats;
        this.rowLetters = Object.keys(seats) as RowLetter[];
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  constructor() {}
}
