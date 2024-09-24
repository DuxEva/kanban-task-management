import {
  Component,
  PLATFORM_ID,
  Inject,
  OnChanges,
  Input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { AppState, Board } from '../../models';
import * as taskActions from '../../store/task.actions';
import * as taskSelectors from '../../store/task.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnChanges {
  @Input() isDarkMode = true;
  isSidebarOpen!: boolean;
  isCreateTaskOpen = false;
  isActionOpened: boolean = false;
  selectedBoard!: Board;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private store: Store<AppState>
  ) {
    this.store
      .select(taskSelectors.selectShowModelState)
      .subscribe((showModel) => {
        this.isCreateTaskOpen = showModel === 'createTask';
      });
  }

  ngOnChanges() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = localStorage.getItem('theme') === 'dark';
    }

    this.store
      .pipe(select(taskSelectors.selectActivatedBoard))
      .subscribe((board) => {
        this.selectedBoard = board;
      });

    this.store
      .pipe(select(taskSelectors.selectSidebarState))
      .subscribe((isOpen) => {
        this.isSidebarOpen = isOpen;
      });
  }

  createNewTask() {
    this.store.dispatch(taskActions.showModel({ showModel: 'createTask' }));
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.store.dispatch(
      taskActions.openSidebar({ isSidebarOpen: this.isSidebarOpen })
    );
  }

  openActions() {
    this.isActionOpened = !this.isActionOpened;
  }

  openEditTask() {
    this.store.dispatch(taskActions.showModel({ showModel: 'addColumn' }));
  }

  openDeleteTask() {
    this.store.dispatch(taskActions.showModel({ showModel: 'deleteBoard' }));
  }
}
