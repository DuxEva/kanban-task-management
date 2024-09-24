import { createReducer, on } from '@ngrx/store';
import * as taskActions from './task.actions';
import { AppState } from '../models';

export const initialState: AppState = {
  boards: [],
  activatedBoard: { name: '', columns: [] },
  isSidebarOpen: false,
  isActionOpen: false,
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

  // delete task

  on(taskActions.deleteTask, (state, { task }) => {
    const updatedColumns = state.activatedBoard.columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter((t) => t.title !== task.title),
    }));

    return {
      ...state,
      activatedBoard: {
        ...state.activatedBoard,
        columns: updatedColumns,
      },
      seletedTask: state.seletedTask?.title === task.title ? { title: '', description: '', status: '', subtasks: [] } : state.seletedTask,
      boards: state.boards.map((board) => ({
        ...board,
        columns:
          board.name === state.activatedBoard.name
            ? updatedColumns
            : board.columns,
      })),
    };
  }),

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

  // Delete Board

  on(taskActions.deleteBoard, (state, { board }) => {
    const updatedBoards = state.boards.filter((b) => b.name !== board.name);

    return {
      ...state,
      boards: updatedBoards,
      activatedBoard: updatedBoards[0] || { name: '', columns: [] },
    };
  }),

  on(taskActions.updateTask, (state, { taskTitle, status }) => {
    const updatedColumns = state.activatedBoard.columns.map((column) => {
      const updatedTasks = column.tasks.filter((t) => t.title !== taskTitle);

      if (column.name === status) {
        const updatedTask = state.activatedBoard.columns
          .flatMap((col) => col.tasks)
          .find((t) => t.title === taskTitle);

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
      seletedTask:
        state.seletedTask?.title === taskTitle
          ? {
              ...state.seletedTask,
              status,
            }
          : state.seletedTask,
      boards: state.boards.map((board) => ({
        ...board,
        columns:
          board.name === state.activatedBoard.name
            ? updatedColumns
            : board.columns,
      })),
    };
  }),

  on(taskActions.addTask, (state, { task }) => {
    const targetColumnIndex = state.activatedBoard.columns.findIndex(
      (column) => column.name === task.status
    );

    if (targetColumnIndex === -1) {
      return state;
    }

    const updatedColumns = state.activatedBoard.columns.map((column) => {
      if (column.name === task.status) {
        return {
          ...column,
          tasks: [...column.tasks, task],
        };
      }

      return column;
    });

    return {
      ...state,
      activatedBoard: {
        ...state.activatedBoard,
        columns: updatedColumns,
      },
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
  })),

  on(taskActions.isActionOpen, (state, { isActionOpen }) => ({
    ...state,
    isActionOpen,
  }))
);
