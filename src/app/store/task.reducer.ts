import { createReducer, on } from '@ngrx/store';
import * as taskActions from './task.actions';
import { AppState } from '../models';

export const initialState: AppState = {
  boards: [],
  activatedBoard: { name: '', columns: [] },
  isSidebarOpen: false,
  error: '',
  showModel: '',
};

export const taskReducer = createReducer(
  initialState,
  on(taskActions.loadTasks, (state) => ({
    ...state,
  })),
  on(taskActions.getTasksSuccess, (state, { data }) => ({
    ...state,
    boards: data.boards,
    activatedBoard: data.boards[0],
  })),
  on(taskActions.getTasksFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(taskActions.changeActivateddBoard, (state, { title }) => ({
    ...state,
    activatedBoard: state.boards.find((board) => board.name === title) || {
      name: '',
      columns: [],
    },
  })),

  on(taskActions.addBoard, (state, { board }) => ({
    ...state,
    boards: [...state.boards, board],
  })),

  // OPEN POPUPS

  on(taskActions.showModel, (state, { showModel }) => ({
    ...state,
    showModel,
  })),

  on(taskActions.openSidebar, (state, { isSidebarOpen }) => ({
    ...state,
    isSidebarOpen,
  }))
);
