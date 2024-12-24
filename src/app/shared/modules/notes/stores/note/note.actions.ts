import { createAction, props } from '@ngrx/store';
import {Note} from '../../shared/interfaces/note.interface';

export const addNote = createAction('[Note] Add Note', props<{ note: Note }>());
export const updateNote = createAction('[Note] Update Note', props<{ note: Note }>());
export const updateAllNotes = createAction('[Note] Update All Notes', props<{ notes: Note[] }>());
export const deleteNote = createAction('[Note] Delete Note', props<{ id: string }>());
export const loadNotes = createAction('[Note] Load Notes');
export const loadNotesSuccess = createAction('[Note] Load Notes Success', props<{ notes: Note[] }>());
