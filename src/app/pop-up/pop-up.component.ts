import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent implements OnInit {
  todo = {
    name: '',
    todo: '',
    date: '',
    isChecked: false,
    key: ''
  };

  constructor(
    private appService: AppService,
    private dialogRef: MatDialogRef<PopUpComponent>,
    
  ) {}

  ngOnInit() {
    if (this.appService.currentTask.name !== '') {
      this.todo = this.appService.currentTask;
    }
  }

  closeForm() {
    this.dialogRef.close();
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
    this.appService.submitData(this.todo)
    this.closeForm();
  }
}
