import { Injectable } from '@angular/core';
import {DialogDeletedNotesComponent} from '../components/dialogs/dialog-deleted-notes/dialog-deleted-notes.component';
import {
  DialogArchivedNotesComponent
} from '../components/dialogs/dialog-archived-notes/dialog-archived-notes.component';
import {DEFAULT_COLLECTIONS} from '../constants/default-collections.constant';
import {DialogAddNoteComponent} from '../components/dialogs/dialog-add-note/dialog-add-note.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Note} from '../interfaces/note.interface';
import {
  DialogCollectionsEditionComponent
} from '../components/dialogs/dialog-collections-edition/dialog-collections-edition.component';
import {
  DialogChangedCollectionNotesComponent
} from '../components/dialogs/dialog-changed-collection-notes/dialog-changed-collection-notes.component';
import {Collection} from '../interfaces/collection.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDeletedNotesDialog(selectedNotes: Note[]): MatDialogRef<DialogDeletedNotesComponent, any> {
    return this.dialog.open(DialogDeletedNotesComponent, {
      data: {
        selectedNotes: selectedNotes
      }
    });
  }

  openArchivedNotesDialog(selectedNotes: Note[]): MatDialogRef<DialogArchivedNotesComponent, any> {
    return this.dialog.open(DialogArchivedNotesComponent, {
      data: {
        selectedNotes: selectedNotes
      }
    });
  }

  openAddNoteDialog(collectionNameSelected: string | undefined): void {
    const newNote: Note = {
      id: undefined,
      title: undefined,
      content: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      color: undefined,
      collections: collectionNameSelected ?
        [collectionNameSelected, DEFAULT_COLLECTIONS.ALL] :
        [DEFAULT_COLLECTIONS.ALL]
    };

    this.dialog.open(DialogAddNoteComponent, {
      data: {
        note: newNote
      }
    });
  }

  openCollectionEditionDialog(): MatDialogRef<DialogCollectionsEditionComponent, any> {
    return this.dialog.open(DialogCollectionsEditionComponent);
  }

  openChangedCollectionNotesDialog(selectedNotes: Note[]): MatDialogRef<DialogChangedCollectionNotesComponent, {selectedNotes: Note[], selectedCollections: Collection[]}> {
    return this.dialog.open(DialogChangedCollectionNotesComponent, {
      data: {
        selectedNotes: selectedNotes
      }
    });
  }
}
