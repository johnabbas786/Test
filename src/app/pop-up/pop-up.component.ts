import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {

  inVisible=true;
  todo ={
    name:'',
    todo:'',
    Date:'',
    status:'',
  };
  constructor(private router: Router,
    private appService: AppService){}

  CloseForm(){
    this.inVisible=false;
    this.router.navigate([''])
  }
  onSubmit(){
    console.log('form submitted',this.todo);
    this.CloseForm()
  }
  
}