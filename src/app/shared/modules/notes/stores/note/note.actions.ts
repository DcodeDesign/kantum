import {createAction, props} from '@ngrx/store';
import {Note} from '../../interfaces/note.interface';
import {Collection} from '../../interfaces/collection.interface';

export const addNote = createAction('[Note] Add Note', props<{ note: Note }>());
export const updateNote = createAction('[Note] Update Note', props<{ note: Note }>());
export const updateAllNotes = createAction('[Note] Update All Notes', props<{ notes: Note[] }>());
export const deleteNote = createAction('[Note] Delete Note', props<{ id: string }>());
export const deleteNotes = createAction('[Note] Delete Notes', props<{ notes: Note[] }>());
export const loadNotes = createAction('[Note] Load Notes');
export const loadNotesSuccess = createAction('[Note] Load Notes Success', props<{ notes: Note[] }>());
export const archiveNotes = createAction('[Notes] Archive Notes', props<{ notesToArchive: Note[] }>());
export const colorNotes = createAction('[Notes] Color Notes', props<{ notes: Note[], color: string }>());
export const updateNotesCollections = createAction('[Notes] Update Notes Collections', props<{ notes: Note[], collections: Collection[] }>());
