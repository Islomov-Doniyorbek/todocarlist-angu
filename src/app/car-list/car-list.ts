import { Component, inject, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Reservation } from '../models/reservation';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-car-list',
  imports: [TitleCasePipe, DatePipe, RouterLink],
  templateUrl: './car-list.html',
  styleUrl: './car-list.css',
  standalone: true,
})
export class CarList implements OnInit {
  reservationList: Reservation[] = []
  reservationService = inject(CarService)

  ngOnInit(): void {
    this.reservationList = this.reservationService.getReservations()
  }

  deleteReservation(id:number):void {
    this.reservationService.deleteReservation(id);
    this.reservationList = this.reservationService.getReservations()
  }

  updateReservation(item:Reservation):void {
    this.reservationService.updateReservation(item.id, item)
    this.reservationList = this.reservationService.getReservations()
  }
  
}
