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

  // OPEN POPUPS

  on(taskActions.openEditTaskModel, (state, { isEditTaskOpen }) => ({
    ...state,
    isEditTaskOpen,
  })),

  on(taskActions.openCreateBoardModel, (state, { isCreateBoardOpen }) => ({
    ...state,
    isCreateBoardOpen,
  })),

  on(taskActions.openDeleteBoardModel, (state, { isDeleteBoardOpen }) => ({
    ...state,
    isDeleteBoardOpen,
  })),

  on(taskActions.openDeleteTaskModel, (state, { isDeleteTaskOpen }) => ({
    ...state,
    isDeleteTaskOpen,
  })),

  on(taskActions.showModel, (state, { showModel }) => ({
    ...state,
    showModel,
  }))
);
