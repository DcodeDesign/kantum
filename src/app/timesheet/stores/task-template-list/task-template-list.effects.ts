import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import {ITask, ITaskTemplateList} from '../../interfaces/task.interface';
import {loadTaskTemplateList, loadTaskTemplateListSuccess} from './task-template-list.actions';

@Injectable()
export class NoteEffects {
  constructor(private actions$: Actions) {}

  loadTaskTemplateList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTaskTemplateList),
      map(() => {
        const taskTemplateList: ITaskTemplateList[] = JSON.parse(localStorage.getItem('taskTemplateList') || '[]') || [];
        return loadTaskTemplateListSuccess({ taskTemplateList });
      })
    )

  });

}
