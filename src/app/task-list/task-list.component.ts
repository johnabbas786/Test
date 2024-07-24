import { Component, OnInit } from '@angular/core';

import { AppService, Task } from '../app.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  checked = false;
  today = new Date();
  selectedView = 'All Task';

  constructor(
    private appService: AppService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.tasks = this.appService.tasks;
    this.changeView(this.selectedView);
  }

  deleteTask(task: Task) {
    const deleteTask:any = this.appService.tasks.indexOf(task);
    if(deleteTask > -1){
      this.appService.tasks.splice(deleteTask, 1);
      this.changeView(this.selectedView);
    }
  }

  changeView(view: any) {
    const todayFormatedDate: any = this.datePipe.transform(
      this.today,
      'YYYY-MM-dd'
    );
    if(view?.target?.value){
      this.selectedView = view.target.value;
    }
    if (this.selectedView === 'Pending Task') {
      this.tasks = this.appService.tasks.filter(
        (t) => t.date <= todayFormatedDate && !t.isChecked
      );
    } else if (this.selectedView === 'Future Task') {
      this.tasks = this.appService.tasks.filter(
        (t) => t.date > todayFormatedDate && !t.isChecked
      );
    } else if (this.selectedView === 'All Task') {
      this.tasks = this.appService.tasks;
    }else if (this.selectedView === 'Complete Task') {
      this.tasks = this.appService.tasks.filter(
        (t) => t.isChecked 
      );
    }
  }

  onEdit(task: Task) {
    const editTask:any = this.appService.tasks.find(t => t === task)
    this.appService.currentTask = editTask
    this.router.navigate(['pop']);
  }

  completeTask(task:Task, index:number) {
    this.appService.tasks.find(t => t === task ? t.isChecked = !t.isChecked : null);
    if(this.selectedView !== 'All Task'){
      this.tasks.splice(index,1)
    }
  }

  onCreateTask() {
    this.appService.currentTask = {
      name: '',
      todo: '',
      date: '',
      isChecked: false,
    };
    this.router.navigate(['pop']);
  }
}
