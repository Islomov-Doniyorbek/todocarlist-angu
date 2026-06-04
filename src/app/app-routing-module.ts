import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { CarList } from './car-list/car-list';
import { CarForm } from './car-form/car-form';


const routes:Routes = [
  {path: '', component: Home},
  {path: 'list', component: CarList},
  {path: 'new', component: CarForm},
  {path: 'edit/:id', component: CarForm},
]


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
