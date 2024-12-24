import { createSelector, createFeatureSelector } from '@ngrx/store';
import {NoteState} from '../../shared/interfaces/note.interface';

export const selectNotesState = createFeatureSelector<NoteState>('notes');
export const selectAllNotes = createSelector(selectNotesState, (state) => state.notes);
