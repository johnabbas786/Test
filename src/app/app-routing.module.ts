import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopUpComponent } from './pop-up/pop-up.component';

const routes: Routes = [
  {
    path: 'Pop',
    component: PopUpComponent,
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
