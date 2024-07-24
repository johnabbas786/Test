import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent implements OnInit {
  inVisible = true;
  todo = {
    name: '',
    todo: '',
    date: '',
    isChecked:false
  };

  constructor(private router: Router, private appService: AppService) {}

  ngOnInit() {
    if(this.appService.currentTask.name !== ''){
      this.todo =  this.appService.currentTask
    }
  }

  closeForm() {
    this.inVisible = false;
    this.router.navigate(['']);
  }

  onSubmit() {
    if(this.appService?.currentTask.name !== ''){
      const task: any = this.appService.tasks.find(t => t === this.appService.currentTask);
      task.name = this.todo.name
      task.todo = this.todo.todo
      task.date = this.todo.date
    }else{
      this.appService.tasks.push(this.todo)
    }
    this.closeForm()
  }
      
}