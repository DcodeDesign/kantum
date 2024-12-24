import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Note} from '../../shared/interfaces/note.interface';
import {NoteListComponent} from './note-list/note-list.component';
import {CollectionMenu} from '../../shared/interfaces/collection-menu.interface';
import {
  DialogCollectionsEditionComponent
} from './dialogs/dialog-collections-edition/dialog-collections-edition.component';
import {MatDialog} from '@angular/material/dialog';
import {selectAllCollection} from '../../stores/collection/collection.selectors';
import {map} from 'rxjs';
import {Store} from '@ngrx/store';
import {DialogDeletedNotesComponent} from './dialogs/dialog-deleted-notes/dialog-deleted-notes.component';
import {DialogArchivedNotesComponent} from './dialogs/dialog-archived-notes/dialog-archived-notes.component';
import {
  DialogChangedCollectionNotesComponent
} from './dialogs/dialog-changed-collection-notes/dialog-changed-collection-notes.component';
import {DialogAddNoteComponent} from './dialogs/dialog-add-note/dialog-add-note.component';


export const DEFAULT_COLLECTIONS = {
  ALL: 'All',
  ARCHIVE: 'Archives'
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  @ViewChild(NoteListComponent, {static: true}) noteListComponent: NoteListComponent | undefined;

  selectedNotes: Note[] = [];
  toggleSideNav = false;

  treeList: CollectionMenu[] = [];
  protected collectionNameSelected: string | undefined;

  constructor(
    private dialog: MatDialog,
    private store: Store
  ) {
    this.store.select(selectAllCollection).pipe(
      map((collections) => collections?.slice()?.reverse())
    ).subscribe(collections => {
      this.treeList = this.buildTreeList(collections);
    })
  }

  onSelectedNotes(selectedNotes: Note[]) {
    this.selectedNotes = selectedNotes;
  }

  addNote() {
    this.openDialogAddNote();
  }

  deleteNotes() {
    this.openDeletedNotes();
  }

  archiveNotes() {
    this.openArchivedNotes();
  }

  changedCollectionNotes() {
    this.openChangedCollectionNotes();
  }

  search($event: string | null) {

  }

  addCollections() {
    this.openDialogCollectionEdition();
  }

  showCollections(collectionName: string | undefined) {
    if (collectionName) {
      this.collectionNameSelected = collectionName;
    }
  }

  onToggleSideNav() {
    this.toggleSideNav = !this.toggleSideNav;
  }

  private buildTreeList(collections: any[]): CollectionMenu[] {
    const children = collections.map(collection => ({
      id: collection.id,
      name: collection.name,
      icon: 'label',
      createdAt: collection.createdAt,
      action: (collectionName: string | undefined) => this.showCollections(collectionName),
    }));

    return [
      {
        name: DEFAULT_COLLECTIONS.ALL,
        icon: 'label',
        action: (collectionName: string | undefined) => this.showCollections(collectionName),
      },
      ...(children.length > 0
        ? [{
          name: 'My collections',
          children,
        }]
        : []),
      {
        name: 'Ajouter une collection',
        icon: 'new_label',
        action: () => this.addCollections(),
      },
      {
        name: DEFAULT_COLLECTIONS.ARCHIVE,
        icon: 'archive',
        action: (collectionName: string | undefined) => this.showCollections(collectionName),
      },
    ];
  }

  openDeletedNotes(): void {
    this.dialog.open(DialogDeletedNotesComponent, {
      data: {
        selectedNotes: this.selectedNotes
      }
    });
  }

  openArchivedNotes(): void {
    this.dialog.open(DialogArchivedNotesComponent, {
      data: {
        selectedNotes: this.selectedNotes
      }
    });
  }

  openChangedCollectionNotes(): void {
    this.dialog.open(DialogChangedCollectionNotesComponent, {
      data: {
        selectedNotes: this.selectedNotes
      }
    });
  }

  openDialogAddNote(): void {
    console.log(this.collectionNameSelected);
    const newNote = {
      id: undefined,
      title: undefined,
      content: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      color: undefined,
      collections: [this.collectionNameSelected, DEFAULT_COLLECTIONS.ALL]
    };

    this.dialog.open(DialogAddNoteComponent, {
      data: {
        note: newNote
      }
    });
  }

  openDialogCollectionEdition(): void {
    const dialogRef = this.dialog.open(DialogCollectionsEditionComponent);
  }
}
