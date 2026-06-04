import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
  cdr = inject(ChangeDetectorRef)

  ngOnInit(): void {
    // this.reservationList = this.reservationService.getReservations()
    this.loadReservation();
  }

  loadReservation():void {
    this.reservationService.getReservations().subscribe({
      next: (data: Reservation[]) => {
        console.log(data);
        
        this.reservationList = data
        this.cdr.detectChanges()
      },
      error: (err) =>{
        console.log(err);
        
      }
    })
  }

  deleteReservation(id:number):void {
    this.reservationService.deleteReservation(id).subscribe({
      next: (data)=>{
        console.log(data);
        this.loadReservation()
      },error: (err)=>{
        console.log(err);
        
      }
    });
    // this.reservationList = this.reservationService.getReservations()
  }

  updateReservation(item:Reservation):void {
    this.reservationService.updateReservation(item.id, item)
    // this.reservationList = this.reservationService.getReservations()
  }
  
}
