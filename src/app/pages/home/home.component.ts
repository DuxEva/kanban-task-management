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
  @Input() isSidebarOpen = true;
  tasks$!: Observable<Board[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.tasks$ = this.store.pipe(select(taskSelectors.selectBoards));
    this.store.dispatch(taskActions.loadTasks());
  }
}
