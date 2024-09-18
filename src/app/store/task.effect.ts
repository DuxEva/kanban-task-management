import { inject, Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataService } from '../services/data.service';
import * as taskActions from './task.actions';

@Injectable()
export class TaskEffects {
  constructor(private dataService: DataService) {}

  private actions$ = inject(Actions);

  getTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.loadTasks),
      mergeMap(() =>
        this.dataService.getData().pipe(
          map((data) => {
            return taskActions.getTasksSuccess({ data });
          }),
          catchError((error) =>
            of(taskActions.getTasksFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
