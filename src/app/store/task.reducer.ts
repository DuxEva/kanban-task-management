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

  on(taskActions.updateTask, (state, { taskTitle, status }) => {
    // Find the column that matches the new status
    const targetColumnIndex = state.activatedBoard.columns.findIndex(
      (column) => column.name === status
    );

    // If the column for the new status is found
    if (targetColumnIndex === -1) {
      return state; // Or handle the case where the column is not found
    }

    // Update activatedBoard columns
    const updatedColumns = state.activatedBoard.columns.map((column) => {
      // Find the task and remove it from its current column
      const updatedTasks = column.tasks.filter((t) => t.title !== taskTitle);

      // If this column matches the new status, add the task to it
      if (column.name === status) {
        const updatedTask = state.activatedBoard.columns
          .flatMap((col) => col.tasks)
          .find((t) => t.title === taskTitle);

        // Ensure the task exists and has a valid title before updating
        if (updatedTask && updatedTask.title) {
          return {
            ...column,
            tasks: [...updatedTasks, { ...updatedTask, status }],
          };
        }
      }

      return {
        ...column,
        tasks: updatedTasks,
      };
    });

    return {
      ...state,
      activatedBoard: {
        ...state.activatedBoard,
        columns: updatedColumns,
      },
      // Ensure selectedTask is updated only if it exists and the title matches
      seletedTask:
        state.seletedTask?.title === taskTitle
          ? {
              ...state.seletedTask,
              status,
            }
          : state.seletedTask,
      // Make sure boards are also updated with the new column structure
      boards: state.boards.map((board) => ({
        ...board,
        columns:
          board.name === state.activatedBoard.name
            ? updatedColumns
            : board.columns,
      })),
    };
  }),

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
