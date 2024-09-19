import {
  Component,
  PLATFORM_ID,
  Inject,
  OnChanges,
  Input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../models';
import * as taskActions from '../../store/task.actions';
import * as taskSelectors from '../../store/task.selectors';
import { clear } from 'console';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnChanges {
  @Input() isDarkMode = true;
  isCreateTaskOpen = false;
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
  }

  onAddTaskOnCurrentBoard() {
    this.store.dispatch(taskActions.showModel({ showModel: 'createTask' }));
  }
}
