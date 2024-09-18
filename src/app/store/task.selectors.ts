import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../models';
import { title } from 'process';

export const selectTaskState = createFeatureSelector<AppState>('tasks');

export const selectBoards = createSelector(
  selectTaskState,
  (state: AppState) => state.boards
);

export const selectActivedBoard = createSelector(
  selectTaskState,
  (state: AppState) => state.activedBoard
);

export const selectSidebarState = createSelector(
  selectTaskState,
  (state: AppState) => state.isSidebarOpen
);

export const changeActivedBoard = createSelector(
  selectTaskState,
  (state: AppState) => state.activedBoard
);
