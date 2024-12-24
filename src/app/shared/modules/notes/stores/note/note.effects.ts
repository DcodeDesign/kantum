import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadNotes, loadNotesSuccess } from './note.actions';
import { map } from 'rxjs/operators';
import {Note} from '../../shared/interfaces/note.interface';
import {of} from 'rxjs';

@Injectable()
export class NoteEffects {
  constructor(private actions$: Actions) {}

  loadNotes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNotes),
      map(() => {
        const notes: Note[] = JSON.parse(localStorage.getItem('notes') || '[]') || [];
        return loadNotesSuccess({ notes });
      })
    )

  });

}
