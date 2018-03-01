import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowConsultantComponent } from './consultants/show-consultant/show-consultant.component';

const routes: Routes = [
  { path: '', redirectTo: 'consultants/1', pathMatch: 'full'  },
  { path: 'consultants', redirectTo: 'consultants/1', pathMatch: 'full'},
  { path: 'consultants/:id', component: ShowConsultantComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
