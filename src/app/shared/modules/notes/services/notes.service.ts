import {Injectable} from '@angular/core';
import {
  addNote,
  archiveNotes,
  deleteNote,
  deleteNotes,
  updateAllNotes,
  updateNote,
  updateNotesCollections
} from '../stores/note/note.actions';
import {Store} from '@ngrx/store';
import {Note} from '../interfaces/note.interface';
import {v4 as uuidv4} from 'uuid';
import {map, Observable, take} from 'rxjs';
import {selectAllNotes} from '../stores/note/note.selectors';
import {DEFAULT_COLLECTIONS} from '../constants/default-collections.constant';
import {Collection} from '../interfaces/collection.interface';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  selectedNotes: Note[] = [];

  constructor(
    private store: Store
  ) { }

  getNotesByCollections(collections: string[] = []): Observable<Note[]> {
    return this.store.select(selectAllNotes).pipe(
      map(notes =>
        notes.filter(note => {
          this.selectedNotes = [];
          if (collections.length > 0) {
            const matchesAll = collections.every(collection => note?.collections?.includes(collection));
            const matchesAny = collections.some(collection => note?.collections?.includes(collection));

            return matchesAll || matchesAny;
          }

          return true;
        })
      ),
      map(filteredNotes => filteredNotes.slice().reverse())
    );
  }

  updateNote(note: Note) {
    this.store.dispatch(updateNote({note: this.mapNote(note)}));
  }

  updateAllNotes(notes: Note[]) {
    this.store.dispatch(updateAllNotes({notes}));
  }

  archivedNotes(notes: Note[]): void {
    this.store.dispatch(archiveNotes({notesToArchive: notes }));
  }

  saveNote(note: Note) {
    this.store.dispatch(addNote({note: this.mapNote(note)}));
  }

  deleteNote(id: string) {
    this.store.dispatch(deleteNote({id}));
  }

  deleteNotes(notes: Note[]) {
    this.store.dispatch(deleteNotes({notes}));
  }

  updateNotesCollections(notes: Note[], collections: Collection[]) {
    this.store.dispatch(updateNotesCollections({notes, collections}))
  }

  selectedNote(noteSelected: { note: Note; isSelected: boolean }): Note[] {
    if (!noteSelected?.note) {
      return this.selectedNotes;
    }

    if (!noteSelected.isSelected) {
      this.selectedNotes = this.selectedNotes.filter((selectedNote) => selectedNote.id !== noteSelected.note.id);
      return this.selectedNotes;
    }

    const index = this.selectedNotes.findIndex((selectedNote: Note) => selectedNote.id === noteSelected.note.id);
    if (index === -1) {
      this.selectedNotes.push(noteSelected.note);
    }

    return this.selectedNotes;
  }


  private mapNote(note?: any): Note {
    return {
      id: note?.id ?? uuidv4(),
      title: note?.title,
      content: note?.content,
      collections: note?.collections ?? [DEFAULT_COLLECTIONS.ALL],
      color: note?.color,
      createdAt: note?.createdAt ?? new Date(),
      updatedAt: new Date(),
    };
  }
}
