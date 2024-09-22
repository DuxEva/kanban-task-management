import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, Board } from '../../models';
import * as taskActions from '../../store/task.actions';
import * as taskSelectors from '../../store/task.selectors';

@Component({
  selector: 'app-delete-board',
  templateUrl: './deleteboard.component.html',
  styleUrl: './deleteboard.component.css',
})
export class DeleteboardComponent {
  board!: Board;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(taskSelectors.selectActivatedBoard).subscribe((board) => {
      this.board = board;
    });
  }

  deleteBoard() {
    this.store.dispatch(taskActions.deleteBoard({ board: this.board }));
    this.store.dispatch(taskActions.showModel({ showModel: '' }));
  }

  closeModel() {
    this.store.dispatch(taskActions.showModel({ showModel: '' }));
  }
}
