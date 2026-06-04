import { inject, Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private reservations: Reservation[] = [];
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:3000'
  constructor(){
    const savedReserv = localStorage.getItem('reservations')
    this.reservations = savedReserv ? JSON.parse(savedReserv) : []
  }

  getReservations(): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.apiUrl}/reservation`);
  }

  getReservationById(id:number): Observable<Reservation>{
    return this.http.get<Reservation>(`${this.apiUrl}/reservation/${id}`)
  }

  addReservation(reservation: Reservation):Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/reservation`, reservation)
  }

  deleteReservation(id: number):Observable<Reservation> {
    return this.http.delete<Reservation>(`${this.apiUrl}/reservation/${id}`)
    // this.reservations = this.reservations.filter((reservation) => reservation.id !== id)
    
    // localStorage.setItem('reservations', JSON.stringify(this.reservations))
  }

  updateReservation(id: number, updateReservation:Reservation):Observable<Reservation> {
    return this.http.put<Reservation>(
      `${this.apiUrl}/reservation/${id}`, updateReservation
    )
    
    // localStorage.setItem('reservations', JSON.stringify(this.reservations))
  }
}
