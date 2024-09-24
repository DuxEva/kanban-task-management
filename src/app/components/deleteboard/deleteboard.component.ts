import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, Board, Task } from '../../models';
import * as taskActions from '../../store/task.actions';
import * as taskSelectors from '../../store/task.selectors';

@Component({
  selector: 'app-delete-board',
  templateUrl: './deleteboard.component.html',
  styleUrl: './deleteboard.component.css',
})
export class DeleteboardComponent {
  @Input() board: Board | undefined;
  @Input() task: Task | undefined;
  @Input() showModel: string | undefined;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(taskSelectors.selectShowModelState)
      .subscribe((showModel) => {
        this.showModel = showModel;
      });
  }

  deleteBoardOrTask() {
    if (this.showModel === 'deleteBoard') {
      this.store
        .select(taskSelectors.selectActivatedBoard)
        .subscribe((board) => {
          this.board = board;
        });

      if (!this.board) return;
      this.store.dispatch(taskActions.deleteBoard({ board: this.board }));
    } else if (this.showModel === 'deleteTask') {
      this.store.select(taskSelectors.seletedTask).subscribe((task) => {
        this.task = task;
      });

      if (!this.task) return;

      this.store.dispatch(taskActions.deleteTask({ task: this.task }));
    }
    this.store.dispatch(taskActions.showModel({ showModel: '' }));
  }

  closeModel() {
    this.store.dispatch(taskActions.showModel({ showModel: '' }));
  }
}
