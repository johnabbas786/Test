import { Injectable } from '@angular/core';

export interface Task {
  name: string;
  todo: string;
  date: string;
  isChecked:boolean
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  tasks: Task[] = [];
  currentTask: Task = {
    name: '',
    todo: '',
    date: '',
    isChecked:false
  };
 
}
