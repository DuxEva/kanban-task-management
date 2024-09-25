import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState, Board, Task } from '../../models';
import * as taskSelectors from '../../store/task.selectors';
import * as taskActions from '../../store/task.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
})
export class TaskDetailsComponent implements OnInit {
  isActionOpened: boolean = false;

  taskForm!: FormGroup;
  selectedTask$!: Observable<Task>;
  selectedBoard$!: Observable<Board>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      name: new FormControl(''),
    });

    this.selectedTask$ = this.store.pipe(select(taskSelectors.seletedTask));
    this.selectedBoard$ = this.store.pipe(
      select(taskSelectors.selectActivatedBoard)
    );
  }

  updateTaskStatus(event: Event, task: Task) {
    const taskStatus = (event.target as HTMLSelectElement).value;
    if (taskStatus === '') return;
    if (taskStatus !== task.status) {
      this.store.dispatch(
        taskActions.updateTask({ taskTitle: task.title, status: taskStatus })
      );
    }
  }

  toggleSubtaskStatus(taskTitle: string, subtaskTitle: string) {
    this.store.dispatch(
      taskActions.updateSubtask({ taskTitle, subTaskTitle: subtaskTitle })
    );
  }

  openDeleteTask() {
    this.store.dispatch(taskActions.showModel({ showModel: 'deleteTask' }));
    this.isActionOpened = !this.isActionOpened;
  }
  openActions() {
    this.isActionOpened = !this.isActionOpened;
  }

  closeModel() {
    this.store.dispatch(taskActions.showModel({ showModel: '' }));
  }
}
