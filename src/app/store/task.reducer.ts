import { createReducer, on } from '@ngrx/store';
import * as taskActions from './task.actions';
import { AppState } from '../models';

export const initialState: AppState = {
  boards: [],
  activedBoard: { name: '', columns: [] },
  isSidebarOpen: true,
  error: '',
};

export const taskReducer = createReducer(
  initialState,
  on(taskActions.loadTasks, (state) => ({
    ...state,
  })),
  on(taskActions.getTasksSuccess, (state, { data }) => ({
    ...state,
    boards: data.boards,
    activedBoard: data.boards[0],
    isSidebarOpen: false,
  })),
  on(taskActions.getTasksFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(taskActions.changeActivedBoard, (state, { title }) => ({
    ...state,
    activedBoard: state.boards.find((board) => board.name === title) || {
      name: '',
      columns: [],
    },
  }))
);
