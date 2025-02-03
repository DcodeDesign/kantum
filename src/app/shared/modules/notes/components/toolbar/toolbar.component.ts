import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDrawer} from '@angular/material/sidenav';
import {Note} from '../../interfaces/note.interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @Input() drawer: MatDrawer | undefined;
  @Input() selectedNotes: Note[] = [];

  @Output() toggleSideNav: EventEmitter<boolean> = new EventEmitter();

  @Output() search = new EventEmitter<string | null | undefined>();
  @Output() archiveNotes = new EventEmitter();
  @Output() deleteNotes = new EventEmitter();
  @Output() changesNoteCollection= new EventEmitter();
  @Output() changesColorNotes= new EventEmitter();
  @Output() addNote: EventEmitter<void> = new EventEmitter();

  searchForm = new FormControl(null);

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe(
      value => {
        this.search.emit(value);
      }
    );
  }

  onToggleSideNav(): void {
    this.toggleSideNav.emit();
  }

  onClearSearch() {
    this.searchForm.reset();
  }

  onArchiveNotes() {
    this.archiveNotes.emit();
  }

  onDeleteNotes() {
    this.deleteNotes.emit();
  }

  onAddNote() {
    this.addNote.emit();
  }

  onChangesNoteCollection() {
    this.changesNoteCollection.emit();
  }

  onChangesColorNotes(color: string) {
    this.changesColorNotes.emit(color);
  }
}
