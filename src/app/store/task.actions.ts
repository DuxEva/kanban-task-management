import { createAction, props } from '@ngrx/store';
import { Board } from '../models';

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: string }>()
);

export const removeTask = createAction(
  '[Task] Remove Task',
  props<{ task: string }>()
);

export const updateTask = createAction(
  '[Task] Update Task',
  props<{ task: string }>()
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

export const changeActivedBoard = createAction(
  '[Task] Change Actived Board',
  props<{ title: string }>()
);
