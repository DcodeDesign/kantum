import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Note} from '../../interfaces/note.interface';
import {NoteListComponent} from './note-list/note-list.component';
import {noteMenu} from '../../interfaces/note-menu.interface';

export const DEFAULT_COLLECTIONS = {
  ALL: 'All',
  ARCHIVE: 'Archives'
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements AfterViewInit {
  @ViewChild(NoteListComponent, {static: true}) noteListComponent: NoteListComponent | undefined;

  selectedNotes: Note[] = [];
  toggleSideNav = false;

  treeList: noteMenu[] = [
    {
      name: 'Collections',
      children: [
        {
          name: DEFAULT_COLLECTIONS.ALL,
          icon: 'label',
          action: (collectionsName) => {
            this.showCollections(collectionsName)
          }
        }
      ]
    },
    {
      name: 'Ajouter une collection',
      icon: 'add',
      action: () => {
        this.addCollections()
      }
    },
    {
      name: DEFAULT_COLLECTIONS.ARCHIVE,
      icon: 'archive',
      action: (collectionsName) => {
        this.showCollections(collectionsName)
      }
    }
  ];

  ngAfterViewInit(): void {
    this.noteListComponent?.loadNote([DEFAULT_COLLECTIONS.ALL]);
  }

  onSelectedNotes($event: Note[]) {
    this.selectedNotes = $event;
  }

  archiveNotes() {

  }

  addNote() {
    this.noteListComponent?.addNewNote();
  }

  deleteNotes() {

  }

  search($event: string | null) {

  }

  addCollections() {

  }

  showCollections(collectionName: string | undefined) {
    if (collectionName) {
      this.noteListComponent?.loadNote([collectionName]);
    }
  }

  onToggleSideNav() {
    this.toggleSideNav = !this.toggleSideNav;
  }
}
