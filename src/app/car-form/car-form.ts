import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-form',
  imports: [ReactiveFormsModule],
  templateUrl: './car-form.html',
  styleUrl: './car-form.css',
  standalone: true
})
export class CarForm {
  carService = inject(CarService)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  reservationForm: FormGroup = new FormGroup({
    checkIn: new FormControl('', [Validators.required]),
    checkOut: new FormControl('', [Validators.required]),
    clientName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    clientEmail: new FormControl('', [Validators.required]),
    carModel: new FormControl('', [Validators.required]),
    carNumber: new FormControl('', [Validators.required]),
  })

  constructor(){
    const reservationId = this.activatedRoute.snapshot.paramMap.get('id')

    if(reservationId){
      const reservation = this.carService.getReservationById(+reservationId)
      if(reservation){
        this.reservationForm.patchValue({
          checkIn: reservation.checkIn,
          checkOut: reservation.checkOut,
          clientName: reservation.clientName,
          clientEmail: reservation.clientEmail,
          carModel: reservation.carModel,
          carNumber: reservation.carNumber,
        })
      }

    }
    console.log(this.activatedRoute.snapshot.params);
    
  }

  onSubmit(){
    const reservationId = this.activatedRoute.snapshot.paramMap.get('id')
    
    if(reservationId){
      const reservation = this.carService.getReservationById(+reservationId)
      if(reservation){
        this.carService.updateReservation(+reservationId, {
          ...this.reservationForm.value, id: +reservationId
        })
        this.router.navigate(['/list'])
      }
      
    }else{
        
        const data = {...this.reservationForm.value, id: Date.now()}
        this.reservationForm.reset();
        this.carService.addReservation(data)
        
        this.router.navigate(['/list'])
        console.log(data);
      }
    
    
    
  }
  
}
