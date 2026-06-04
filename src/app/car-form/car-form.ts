import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from '../models/reservation';

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
      this.loadReservation(+reservationId)
      
    }
    console.log(this.activatedRoute.snapshot.params);
    
  }

  loadReservation(reservationId: number):void {
    this.carService.getReservationById(+reservationId).subscribe({
        next: (data) => {
          this.reservationForm.patchValue({
          ...data
        })
        },
        error: (err)=>{
          console.log(err);
          
        }
      })
  }

  onSubmit(){
    const reservationId = this.activatedRoute.snapshot.paramMap.get('id')
    
    if(reservationId){
        this.carService.updateReservation(+reservationId, {
          ...this.reservationForm.value, id: +reservationId
        }).subscribe({
          next: (data)=>{
            this.reservationForm.reset()
            this.router.navigate(['/list'])

          },error: (err)=>{
            console.log(err);
            
          }
        })
      
      
    }else{
        
        const data = {...this.reservationForm.value, id: Date.now()}
        this.carService.addReservation(data).subscribe({
          next: (data)=>{
            this.reservationForm.reset();
            this.router.navigate(['/list'])
            console.log(data);
            
          },
          error: (err)=>{
            console.log(err);
            
          }
        })
        
      }
    
    
    
  }
  
}
