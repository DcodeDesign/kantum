import {Injectable} from '@angular/core';
import {addNote, deleteNote, updateAllNotes, updateNote} from '../stores/note/note.actions';
import {Store} from '@ngrx/store';
import {Note} from '../interfaces/note.interface';
import {v4 as uuidv4} from 'uuid';
import {map, Observable} from 'rxjs';
import {selectAllNotes} from '../stores/note/note.selectors';

import {MatDialog} from '@angular/material/dialog';
import {DEFAULT_COLLECTIONS} from '../constants/default-collections.constant';
import {DialogDeletedNotesComponent} from '../components/dialogs/dialog-deleted-notes/dialog-deleted-notes.component';
import {
  DialogArchivedNotesComponent
} from '../components/dialogs/dialog-archived-notes/dialog-archived-notes.component';
import {DialogAddNoteComponent} from '../components/dialogs/dialog-add-note/dialog-add-note.component';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  selectedNotes: Note[] = [];

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) { }

  getNotesByCollections(collections: string[] = []): Observable<Note[]> {
    return this.store.select(selectAllNotes).pipe(
      map(notes =>
        notes.filter(note => {
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

  saveNote(note: Note) {
    this.store.dispatch(addNote({note: this.mapNote(note)}));
  }

  deleteNote(id: string) {
    this.store.dispatch(deleteNote({id}));
  }

  selectedNote(noteSelected: { note: Note, isSelected: boolean }) {
    if (!noteSelected?.note) return;

    const index = this.selectedNotes.findIndex((selectedNote: Note) => selectedNote?.id === noteSelected?.note?.id);

    if (index !== -1) {
      this.selectedNotes.splice(index, 1);
    } else {
      this.selectedNotes.push(noteSelected.note);
    }

    return this.selectedNotes;
  }

  openDeletedNotesDialog(): void {
    this.dialog.open(DialogDeletedNotesComponent, {
      data: {
        selectedNotes: this.selectedNotes
      }
    });
  }

  openArchivedNotesDialog(): void {
    this.dialog.open(DialogArchivedNotesComponent, {
      data: {
        selectedNotes: this.selectedNotes
      }
    });
  }

  openAddNoteDialog(collectionNameSelected: string | undefined): void {
    const newNote = {
      id: undefined,
      title: undefined,
      content: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      color: undefined,
      collections: [collectionNameSelected, DEFAULT_COLLECTIONS.ALL]
    };

    this.dialog.open(DialogAddNoteComponent, {
      data: {
        note: newNote
      }
    });
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
