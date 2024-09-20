import { createReducer, on } from '@ngrx/store';
import * as taskActions from './task.actions';
import { AppState } from '../models';

export const initialState: AppState = {
  boards: [],
  activatedBoard: { name: '', columns: [] },
  isSidebarOpen: false,
  error: '',
  showModel: '',
  seletedTask: { title: '', description: '', status: '', subtasks: [] },
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

  on(taskActions.selectTask, (state, { task }) => ({
    ...state,
    seletedTask: task,
  })),

  // update subtask of a task

  on(taskActions.updateSubtask, (state, { taskTitle, subTaskTitle }) => ({
    ...state,
    seletedTask: {
      ...state.seletedTask,
      subtasks: state.seletedTask.subtasks.map((subtask) =>
        subtask.title === subTaskTitle
          ? { ...subtask, isCompleted: !subtask.isCompleted }
          : subtask
      ),
    },

    activatedBoard: {
      ...state.activatedBoard,
      columns: state.activatedBoard.columns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
          task.title === taskTitle
            ? {
                ...task,
                subtasks: task.subtasks.map((subtask) =>
                  subtask.title === subTaskTitle
                    ? { ...subtask, isCompleted: !subtask.isCompleted }
                    : subtask
                ),
              }
            : task
        ),
      })),
    },

    boards: state.boards.map((board) => ({
      ...board,
      columns: board.columns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
          task.title === taskTitle
            ? {
                ...task,
                subtasks: task.subtasks.map((subtask) =>
                  subtask.title === subTaskTitle
                    ? { ...subtask, isCompleted: !subtask.isCompleted }
                    : subtask
                ),
              }
            : task
        ),
      })),
    })),
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
