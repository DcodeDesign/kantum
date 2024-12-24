import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from '../../interfaces/note.interface';

@Component({
  selector: 'app-note-checkbox-list',
  templateUrl: './note-checkbox-list.component.html',
  styleUrl: './note-checkbox-list.component.scss'
})
export class NoteCheckboxListComponent implements OnInit {
  @Input() notes: Note[] = [];
  @Output() selectionChange = new EventEmitter<Note[]>();

  selectedNotes: Note[] = [];

  ngOnInit(): void {
    this.selectedNotes = this.notes;
  }

  toggleNoteSelection(note: Note, isChecked: boolean): void {
    if (isChecked) {
      this.selectedNotes.push(note);
    } else {
      this.selectedNotes = this.selectedNotes.filter(n => n.id !== note.id);
    }
    this.selectionChange.emit(this.selectedNotes);
  }

  isChecked(note: Note): boolean {
    return this.selectedNotes.some(n => n.id === note.id);
  }
}
