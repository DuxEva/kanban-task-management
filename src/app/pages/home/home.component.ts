import { Component, Input, OnInit } from '@angular/core';
import * as taskSelectors from '../../store/task.selectors';
import * as taskActions from '../../store/task.actions';
import { select, Store } from '@ngrx/store';
import { AppState, Board } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  tasks$!: Observable<Board[]>;
  selectedBoard$!: Observable<Board>;
  isSidebarOpen!: boolean;
  boards!: Board[];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .pipe(select(taskSelectors.selectSidebarState))
      .subscribe((isOpen) => {
        this.isSidebarOpen = isOpen;
      });

    this.tasks$ = this.store.pipe(select(taskSelectors.selectBoards));
    this.selectedBoard$ = this.store.pipe(
      select(taskSelectors.selectActivatedBoard)
    );

    this.store.dispatch(taskActions.loadTasks());

    this.store.pipe(select(taskSelectors.selectBoards)).subscribe((boards) => {
      this.boards = boards;
      console.log(this.boards);
    });
  }
}
