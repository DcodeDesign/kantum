import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Note} from '../../interfaces/note.interface';
import {NoteListComponent} from './note-list/note-list.component';
import {ChildrenCollectionMenu, CollectionMenu} from '../../interfaces/collection-menu.interface';
import {
  DialogCollectionsEditionComponent
} from '../collections/dialog-collections-edition/dialog-collections-edition.component';
import {MatDialog} from '@angular/material/dialog';
import {selectAllCollection} from '../../stores/collection/collection.selectors';
import {map} from 'rxjs';
import {Store} from '@ngrx/store';

export const DEFAULT_COLLECTIONS = {
  ALL: 'All',
  ARCHIVE: 'Archives'
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements AfterViewInit, OnInit {
  @ViewChild(NoteListComponent, {static: true}) noteListComponent: NoteListComponent | undefined;

  selectedNotes: Note[] = [];
  toggleSideNav = false;

  treeList: CollectionMenu[] = [];

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

  private buildTreeList(collections: any[]): CollectionMenu[] {
    const children = collections.map(collection => ({
      id: collection.id,
      name: collection.name,
      icon: 'label',
      createdAt: collection.createdAt,
      action: (collectionName: string | undefined) => this.showCollections(collectionName),
    }));

    const treeList: CollectionMenu[] = [
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

    return treeList;
  }

  ngOnInit(): void {
    this.noteListComponent?.loadNote([DEFAULT_COLLECTIONS.ALL]);
  }

  ngAfterViewInit(): void {

  }

  onSelectedNotes($event: Note[]) {
    this.selectedNotes = $event;
  }

  archiveNotes() {

  }

  addNote() {
    this.toggleSideNav = !this.toggleSideNav;
    this.noteListComponent?.addNewNote();
  }

  deleteNotes() {

  }

  search($event: string | null) {

  }

  addCollections() {
    this.openDialogCollectionEdition();
  }

  showCollections(collectionName: string | undefined) {
    if (collectionName) {
      this.noteListComponent?.loadNote([collectionName]);
    }
  }

  onToggleSideNav() {
    this.toggleSideNav = !this.toggleSideNav;
  }

  openDialogCollectionEdition(): void {
    const dialogRef = this.dialog.open(DialogCollectionsEditionComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: undefined) => {
      console.log('The dialog was closed');
    });
  }
}
