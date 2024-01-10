import { Injectable } from '@angular/core';
import { AllSeats } from './seats';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class APIService {
  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // ! need error handling
  getAllSeats(): Observable<AllSeats> {
    return this.http.get<AllSeats>(this.url + '/all-seats');
  }
  // ! need error handling
  reserveSeat(seatID: string): Observable<any> {
    // todo add user info
    const body = { seat: seatID };
    return this.http.post(this.url + '/reserve-seat', body);
  }
}
