import { Component, Input, OnInit } from '@angular/core';
import { AppState, Task } from '../../models';
import { Store } from '@ngrx/store';
import * as taskActions from '../../store/task.actions';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent implements OnInit {
  @Input() task!: Task;
  taskForm!: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      name: new FormControl(this.task?.title || ''),
    });
  }

  get completedSubtasksCount(): number {
    return this.task.subtasks.filter((subtask) => subtask.isCompleted).length;
  }

  openTaskDetails(): void {
    this.store.dispatch(taskActions.showModel({ showModel: 'taskDetails' }));
  }
}
