import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopUpComponent } from './pop-up/pop-up.component';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';


const routes: Routes = [ 
  {
    path: 'list',
    component: TaskListComponent,
  },  
  {
    path: 'pop',
    component: PopUpComponent,
  }, 
  {
    path: '',
    redirectTo: 'list',
    pathMatch:'full'
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
