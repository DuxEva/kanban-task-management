import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
})
export class TaskDetailsComponent implements OnInit {
  taskForm!: FormGroup;

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      name: new FormControl(''),
    });
  }
}
