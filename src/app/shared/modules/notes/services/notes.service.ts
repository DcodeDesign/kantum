import { Injectable } from '@angular/core';
import {addNote, deleteNote, updateAllNotes} from '../stores/note/note.actions';
import {Store} from '@ngrx/store';
import {Note} from '../interfaces/note.interface';
import { v4 as uuidv4 } from 'uuid';
import {DEFAULT_COLLECTIONS} from '../components/notes/notes.component';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {selectAllNotes} from '../stores/note/note.selectors';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private selectedNoteSubject = new BehaviorSubject<Note[]>([]);
  public selectedNote$ = this.selectedNoteSubject.asObservable();

  constructor(private store: Store) { }

  getNotesByCollections(collections: string[] = []): Observable<Note[]> {
    return this.store.select(selectAllNotes).pipe(
      map(notes =>
        notes.filter(note => {
          if (Array.isArray(note?.collections) && collections.length > 0) {
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
    this.store.dispatch(addNote({ note: this.mapNote(note) }));
  }

  updateAllNotes(notes: Note[]) {
    this.store.dispatch(updateAllNotes({ notes }));
  }

  saveNote(note: Note) {
    this.store.dispatch(addNote({ note: this.mapNote(note) }));
  }

  deleteNote(id: string) {
    this.store.dispatch(deleteNote({ id }));
  }

  selectedNote(note: Note) {
    if (!note) return;

    const currentNotes = this.selectedNoteSubject.getValue();
    const index = currentNotes.findIndex((selectedNote: Note) => selectedNote?.id === note?.id);

    if (index !== -1) {
      currentNotes.splice(index, 1);
    } else {
      currentNotes.push(note);
    }

    this.selectedNoteSubject.next([...currentNotes]);
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
