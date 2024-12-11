import { createSelector, createFeatureSelector } from '@ngrx/store';
import {Note, NoteState} from '../interfaces/note.interface';

export const selectNotesState = createFeatureSelector<NoteState>('notes');
export const selectAllNotes = createSelector(selectNotesState, (state) => state.notes);
