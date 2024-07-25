import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

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
    this.appService.submitData(this.todo)
    this.closeForm();
  }
}
