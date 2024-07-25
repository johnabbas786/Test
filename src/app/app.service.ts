import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient){}

  fetchData(){
   return this.http.get<Task>('https://todo-portal-8c454-default-rtdb.firebaseio.com/posts.json')
  }

  submitData(todo: Task){
    this.http.post<Task>(
      'https://todo-portal-8c454-default-rtdb.firebaseio.com/posts.json',
      todo
    ).subscribe((responseData: Task) => {
      console.log(responseData)
    })
  }
 
}
