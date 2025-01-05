import {ChangeDetectorRef, Component} from '@angular/core';
import {Note} from '../interfaces/note.interface';
import {NotesService} from '../services/notes.service';
import {CollectionService} from '../services/collection.service';
import {DialogService} from '../services/dialog.service';
import {Collection} from '../interfaces/collection.interface';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {
  toggleSideNav = false;
  searchText: string | null | undefined;

  constructor(
    public noteService: NotesService,
    public collectionService: CollectionService,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {
  }

  onSelectedNotes(selectedNotes: Note[]) {
    this.noteService.selectedNotes = selectedNotes;
    this.cdr.detectChanges();
  }

  openAddNoteDialog() {
    this.dialogService.openAddNoteDialog(this.collectionService.collectionNameSelected);
  }

  openDeleteNotesDialog() {
    this.dialogService.openDeletedNotesDialog(this.noteService.selectedNotes)
      .afterClosed().subscribe(notes => {
      if (notes && notes.length > 0) {
        this.noteService.deleteNotes(notes)
      }
    });
  }

  openArchiveNotesDialog() {
    this.dialogService.openArchivedNotesDialog(this.noteService.selectedNotes)
      .afterClosed().subscribe(notes => {
      if (notes && notes.length > 0) {
        this.noteService.archivedNotes(notes)
      }
    });
  }

  onSearchNotes(searchText: string | null | undefined) {
    this.searchText = searchText;
  }

  onChangedCollectionNotes() {
    this.dialogService.openChangedCollectionNotesDialog(this.noteService.selectedNotes)
      .afterClosed().subscribe((value) => {
      if (
        value?.selectedNotes &&
        value?.selectedNotes.length > 0 &&
        value?.selectedCollections &&
        value?.selectedCollections.length > 0) {

        this.noteService.updateNotesCollections(value.selectedNotes, value.selectedCollections);
      }
    });
  }

  onToggleSideNav() {
    this.toggleSideNav = !this.toggleSideNav;
  }
}
