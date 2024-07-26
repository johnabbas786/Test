import { Component, OnInit } from '@angular/core';

import { AppService, Task } from '../app.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
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
    private datePipe: DatePipe,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.tasks = this.appService.tasks;
    this.appService.fetchData().subscribe((todo:any) => {
      for (let key in todo) {
        let item = todo[key];
        item.key = key
        this.appService.tasks.push(item)
      }
      this.changeView(this.selectedView);
    });
  }
  
  deleteTask(task: Task) {
    this.appService.deleteTask(task.key).subscribe(() => {
      const deleteTask: any = this.appService.tasks.indexOf(task);
    if (deleteTask > -1) {
      this.appService.tasks.splice(deleteTask, 1);
      this.changeView(this.selectedView);
    }
    })
  }

  changeView(view: any) {
    const todayFormatedDate: any = this.datePipe.transform(
      this.today,
      'YYYY-MM-dd'
    );
    if (view?.target?.value) {
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
    } else if (this.selectedView === 'Complete Task') {
      this.tasks = this.appService.tasks.filter((t) => t.isChecked);
    }
  }
  onEdit(task: Task) {
    const editTask: any = this.appService.tasks.find((t) => t === task);
    this.appService.currentTask = editTask;
    const dialogRef = this.dialog.open(PopUpComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.changeView(this.selectedView);
    });
  }

  completeTask(task: Task, index: number) {
    this.appService.tasks.find((t) =>
      t === task ? (t.isChecked = !t.isChecked) : null
    );
    if (this.selectedView !== 'All Task') {
      this.tasks.splice(index, 1);
    }
  }

  onCreateTask() {
    this.appService.currentTask = {
      name: '',
      todo: '',
      date: '',
      isChecked: false,
      key: ''
    };
    const dialog = this.dialog.open(PopUpComponent);
    
  }
}
