import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../models';

export const selectTaskState = createFeatureSelector<AppState>('tasks');

export const selectBoards = createSelector(
  selectTaskState,
  (state: AppState) => state.boards
);

export const selectActivatedBoard = createSelector(
  selectTaskState,
  (state: AppState) => state.activatedBoard
);

export const selectSidebarState = createSelector(
  selectTaskState,
  (state: AppState) => state.isSidebarOpen
);

export const changeActivatedBoard = createSelector(
  selectTaskState,
  (state: AppState) => state.activatedBoard
);
