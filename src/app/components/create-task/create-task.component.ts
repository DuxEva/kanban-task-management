import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, Board, Column, Task } from '../../models';
import * as taskActions from '../../store/task.actions';
import * as taskSelectors from '../../store/task.selectors';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  boards: Board[] = [];
  columns$!: Observable<Column[]>;
  selectedBoard!: Board;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      subtasks: this.fb.array([]),
    });

    this.store
      .pipe(select(taskSelectors.selectActivatedBoard))
      .subscribe((board: Board) => {
        this.selectedBoard = board;
      });

    if (this.selectedBoard && this.selectedBoard.columns.length > 0) {
      const firstColumn = this.selectedBoard.columns[0].name;
      this.taskForm.patchValue({
        status: firstColumn,
      });
    }
  }

  get subtasks() {
    return this.taskForm.get('subtasks') as FormArray;
  }

  addSubtask() {
    this.subtasks.push(this.fb.control('', Validators.required));
  }

  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }

  onSubmit() {
    this.taskForm.markAllAsTouched();
    if (this.taskForm.invalid) {
      return;
    }

    const task: Task = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      status: this.taskForm.value.status,
      subtasks: this.taskForm.value.subtasks.map((title: string) => ({
        title,
        isCompleted: false,
      })),
    };

    this.store.dispatch(taskActions.addTask({ task }));
    this.store.dispatch(taskActions.showModel({ showModel: '' }));

    this.taskForm.reset();
  }
}
