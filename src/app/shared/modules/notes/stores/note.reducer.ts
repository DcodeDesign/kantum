import { createReducer, on } from '@ngrx/store';
import {addNote, updateNote, deleteNote, loadNotesSuccess, updateAllNotes} from './note.actions';
import {initialNoteState} from '../interfaces/note.interface';

export const noteReducer = createReducer(
  initialNoteState,
  on(loadNotesSuccess, (state, { notes }) => ({ ...state, notes })),
  on(addNote, (state, { note }) => ({ ...state, notes: [...state.notes, note] })),
  on(updateNote, (state, { note }) => ({
    ...state,
    notes: state.notes.map(n => n.id === note.id ? note : n)
  })),
  on(updateAllNotes, (state, { notes }) => ({
    ...state,
    notes: notes
  })),
  on(deleteNote, (state, { id }) => ({
    ...state,
    notes: state.notes.filter(note => note.id !== id)
  }))
);
