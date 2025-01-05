import { createReducer, on } from '@ngrx/store';
import {
  addNote,
  updateNote,
  deleteNote,
  loadNotesSuccess,
  updateAllNotes,
  archiveNotes,
  deleteNotes, updateNotesCollections
} from './note.actions';
import {initialNoteState} from '../../interfaces/note.interface';
import {DEFAULT_COLLECTIONS} from '../../constants/default-collections.constant';

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
  })),
  on(archiveNotes, (state, { notesToArchive }) => {
    const updatedNotes = state.notes.map(note =>
      notesToArchive.find(archivedNote => archivedNote.id === note.id)
        ? { ...note, collections: [DEFAULT_COLLECTIONS.ARCHIVE] }
        : note
    );

    return { ...state, notes: updatedNotes };
  }),
  on(deleteNotes, (state, { notes }) => ({
    ...state,
    notes: state.notes.filter(
      existingNote => !notes.some(noteToDelete => noteToDelete.id === existingNote.id)
    )
  })),
  on(updateNotesCollections, (state, { notes, collections }) => ({
    ...state,
    notes: state.notes.map(existingNote => {
      const matchingNote = notes.find(note => note.id === existingNote.id);
      return matchingNote
        ? {
          ...existingNote,
          collections: [
            ...collections.map(collection => collection.name),
            DEFAULT_COLLECTIONS.ALL
          ].filter((collection): collection is string => collection !== null)
        }
        : existingNote;

    })
  }))
);
