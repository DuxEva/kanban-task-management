import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState, Task } from '../../models';
import * as taskSelectors from '../../store/task.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
})
export class TaskDetailsComponent implements OnInit {
  taskForm!: FormGroup;
  selectedTask$!: Observable<Task>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      name: new FormControl(''),
    });

    this.selectedTask$ = this.store.pipe(select(taskSelectors.seletedTask));
    this.selectedTask$.subscribe((task) => {
      console.log(task);
    });
  }

  // get completedSubtasksCount(): number {
  //   return this.taskForm.value.subtasks.filter((subtask) => subtask.isCompleted).length;
  // }
}
