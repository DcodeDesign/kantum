import {Component, ViewChild} from '@angular/core';
import {Note} from '../interfaces/note.interface';
import {NotesService} from '../services/notes.service';
import {CollectionService} from '../services/collection.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  toggleSideNav = false;

  constructor(
    public noteService: NotesService,
    public collectionService: CollectionService
  ) {}

  onSelectedNotes(selectedNotes: Note[]) {
    this.noteService.selectedNotes = selectedNotes;
  }

  openAddNoteDialog() {
    this.noteService.openAddNoteDialog(this.collectionService.collectionNameSelected)
  }

  openDeleteNotesDialog() {
    this.noteService.openDeletedNotesDialog();
  }

  openArchiveNotesDialog() {
    this.noteService.openArchivedNotesDialog();
  }

  onSearchNotes($event: string | null) {

  }

  onChangedCollectionNotes() {
    this.collectionService.openChangedCollectionNotesDialog(this.noteService.selectedNotes);
  }

  onToggleSideNav() {
    this.toggleSideNav = !this.toggleSideNav;
  }
}
