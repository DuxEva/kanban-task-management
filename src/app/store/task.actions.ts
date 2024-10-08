import { createAction, props } from '@ngrx/store';
import { Board, Task } from '../models';

export const addBoard = createAction(
  '[Sidebar Component] Add Board',
  props<{ board: Board }>()
);

export const removeTask = createAction(
  '[Task] Remove Task',
  props<{ task: string }>()
);

export const updateTask = createAction(
  '[Task] Update Task',
  props<{ taskTitle: string; status: string }>()
);

export const addColumn = createAction(
  '[Task] Add Column',
  props<{ name: string }>()
);

export const getTasks = createAction('[Task] Get Tasks');

export const getTasksSuccess = createAction(
  '[Task] Get Tasks Success',
  props<{ data: any }>()
);

export const getTasksFailure = createAction(
  '[Task] Get Tasks Failure',
  props<{ error: any }>()
);

export const loadTasks = createAction('[Task] Load Tasks');

export const changeActivateddBoard = createAction(
  '[Task] Change Activated Board',
  props<{ title: string }>()
);

export const selectTask = createAction(
  '[Task] Select Task',
  props<{ task: Task }>()
);

export const deleteBoard = createAction(
  '[Task] Delete Board',
  props<{ board: Board }>()
);

// delete task

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ task: Task }>()
);

// update subtask of a task

export const updateSubtask = createAction(
  '[Task] Update Subtask',
  props<{ taskTitle: string; subTaskTitle: string }>()
);

// ADD TASK

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());

export const isActionOpen = createAction(
  '[Task] Is Action Open',
  props<{ isActionOpen: boolean }>()
);

// OPEN POPUPS

export const openSidebar = createAction(
  '[Task] Open Sidebar',
  props<{ isSidebarOpen: boolean }>()
);

export const openEditTaskModel = createAction(
  '[Task] Open Create Task Model',
  props<{ isEditTaskOpen: boolean }>()
);

export const openCreateBoardModel = createAction(
  '[Task] Open Create Board Model',
  props<{ isCreateBoardOpen: boolean }>()
);

export const openDeleteBoardModel = createAction(
  '[Task] Open Delete Board Model',
  props<{ isDeleteBoardOpen: boolean }>()
);

export const openDeleteTaskModel = createAction(
  '[Task] Open Delete Task Model',
  props<{ isDeleteTaskOpen: boolean }>()
);

export const showModel = createAction(
  '[Task] Show Model',
  props<{ showModel: string }>()
);
