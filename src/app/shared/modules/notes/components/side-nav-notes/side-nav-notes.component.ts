import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NotesComponent} from '../notes/notes.component';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Note} from '../../interfaces/note.interface';

interface noteMenu {
  name: string;
  children?: noteMenu[];
  action?:  ((param?: string | undefined) => void) | undefined;
  icon?: string;
}

@Component({
  selector: 'app-side-nav-notes',
  templateUrl: './side-nav-notes.component.html',
  styleUrl: './side-nav-notes.component.scss'
})
export class SideNavNotesComponent implements OnInit, OnDestroy {
  @ViewChild(NotesComponent) notesComponent: NotesComponent | undefined;
  showFiller = false;

  TREE_DATA: noteMenu[] = [
    {
      name: 'Collections',
      children: [
        {
          name: 'All',
          icon: 'label',
          action: (nameCollection: string | undefined) => this.showCollection(nameCollection)
        }
      ]
    },
    {
      name: 'Ajouter une collection',
      icon: 'add',
      action: () => this.addCollection()
    },
    {
      name: 'Archive',
      icon: 'archive',
      action: () => this.showArchive()
    }
  ];

  dataSource = this.TREE_DATA;

  childrenAccessor = (node: noteMenu) => node.children ?? [];

  hasChild = (_: number, node: noteMenu) => !!node.children && node.children.length > 0;

  noteCollections = new FormControl([]);
  noteCollectionList: string[] = ['All'];

  search = new FormControl(null);
  noteSelected: Note[] = [];

  addNewNote() {
    this?.notesComponent?.addNewNote();
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {

  }

  clearSearch() {
    this.search.reset();
  }

  addCollection() {
    console.log('addCollection');
  }

  showArchive() {
    console.log('showArchive')
    return this.notesComponent?.loadNote(['archive'])
  }

  private showCollection(nameCollection: string | undefined) {
    if(nameCollection) {
      this.notesComponent?.loadNote([nameCollection])
    }
  }

  onNotesSelectedEmitter($event: Note[]) {
    this.noteSelected = $event;
  }
}
