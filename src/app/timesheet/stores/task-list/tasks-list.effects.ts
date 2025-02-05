import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import {loadTasks, loadTasksSuccess} from './task-list.actions';
import {ITask} from '../../interfaces/task.interface';

@Injectable()
export class NoteEffects {
  constructor(private actions$: Actions) {}

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTasks),
      map(() => {
        const tasks: ITask[] = JSON.parse(localStorage.getItem('tasks') || '[]') || [];
        return loadTasksSuccess({ tasks });
      })
    )

  });

}
