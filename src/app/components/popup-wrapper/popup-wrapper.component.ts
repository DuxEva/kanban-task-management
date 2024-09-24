import { Component } from '@angular/core';
import { AppState } from '../../models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as taskActions from '../../store/task.actions';
import * as taskSelectors from '../../store/task.selectors';

@Component({
  selector: 'app-popup-wrapper',
  templateUrl: './popup-wrapper.component.html',
  styleUrl: './popup-wrapper.component.css',
})
export class PopupWrapperComponent {
  isOpen!: boolean;
  popupType$!: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.popupType$ = this.store.select(taskSelectors.selectShowModelState);
    this.popupType$.subscribe((showModel) => {
      console.log(showModel);
    });
  }

  toggleDialogue() {
    this.store.dispatch(taskActions.showModel({ showModel: '' }));
    this.popupType$ = this.store.select(taskSelectors.selectShowModelState);
  }
}
