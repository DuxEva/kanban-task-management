import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AppState, Board } from '../../models';
import * as taskActions from '../../store/task.actions';
import * as taskSelectors from '../../store/task.selectors';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.css',
})
export class CreateBoardComponent {
  boardForm!: FormGroup;
  boards$!: Observable<Board[]>;
  showModel!: string;
  selectedBoard: Board | undefined;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.boards$ = this.store.select((state) => state.boards);
  }

  ngOnInit(): void {
    this.boardForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      columns: this.fb.array([this.createColumn()]),
    });

    this.store
      .pipe(select(taskSelectors.selectShowModelState))
      .subscribe((showModel) => {
        this.showModel = showModel;
      });

    if (this.showModel === 'addColumn') {
      this.store
        .pipe(select(taskSelectors.selectActivatedBoard))
        .subscribe((board) => {
          this.selectedBoard = board;
        });
    }
  }

  get columns(): FormArray {
    return this.boardForm.get('columns') as FormArray;
  }

  createColumn(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      tasks: [[]],
    });
  }

  addColumn(): void {
    this.columns.push(this.createColumn());
  }

  deleteColumn(index: number): void {
    this.columns.removeAt(index);
  }

  onSubmit(): void {
    if (this.boardForm.valid) {
      if (this.showModel === 'addColumn') {
        this.store
          .pipe(select(taskSelectors.selectActivatedBoard))
          .subscribe((board) => {
            if (board) {
              this.selectedBoard = board;

              this.boardForm.patchValue({
                name: this.selectedBoard.name,
              });

              this.columns.clear();

              this.selectedBoard.columns.forEach((col) => {
                const columnGroup = this.fb.group({
                  name: [col.name, Validators.required],
                  tasks: [col.tasks || []],
                });
                this.columns.push(columnGroup);
              });
            }
          });
      }

      const board: Board = {
        name: this.boardForm.value.name,
        columns: this.boardForm.value.columns,
      };
      this.store.dispatch(taskActions.addBoard({ board }));
      this.store.dispatch(taskActions.showModel({ showModel: '' }));
    } else {
      console.log('Please fill all the required fields');
    }
  }
}
