import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { takeLast } from 'rxjs';
import { format } from 'path';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isPopupVisible = false;
  todos: any[] = [];
  pendingTask: any[] = [];
  futureTask: any[] = [];

  constructor(private appService: AppService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.appService.task$.subscribe((tasks) => {
      this.todos = tasks;
      this.categorizedTasks();
    });
  }

  categorizedTasks() {
    const today: any = this.datePipe.transform(new Date(), 'YYYY-MM-DD');
    this.pendingTask = this.todos.filter((task: any) => task.date <= today);
    this.futureTask = this.todos.filter((task) => task.date > today);
  }

  // showPopUp(){{
  //   this.isPopupVisible=true;
  // }}
  //  closePopup(){
  //   this.isPopupVisible=false
  //  }
}
