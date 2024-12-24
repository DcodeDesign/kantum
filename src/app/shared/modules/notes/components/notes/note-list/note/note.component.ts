import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Note} from '../../../../shared/interfaces/note.interface';
import {NOTE_MODE} from '../../../../shared/enums/note-mode.enum';
import {ISelectedNote} from '../../../../shared/interfaces/selected-note.interface';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {
  @Input() note: Note | undefined;
  @Input() noteMode: NOTE_MODE = NOTE_MODE.DETAIL;

  @Output() cancelEdition = new EventEmitter<void>();
  @Output() closeEdition = new EventEmitter<void>();
  @Output() noteIdEditionMode = new EventEmitter<string>();
  @Output() resizeTextArea = new EventEmitter<void>();
  @Output() notesSelected = new EventEmitter<ISelectedNote>();

  protected readonly NOTE_MODE = NOTE_MODE;

  constructor() {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {}

  editionNote(note: Note) {
    this.noteMode = NOTE_MODE.EDITION;
    this.noteIdEditionMode.emit(note.id);
  }

  onCancelEdition() {
    this.noteMode = NOTE_MODE.DETAIL;
    this.cancelEdition.emit();
  }

  onCloseEdition() {
    this.noteMode = NOTE_MODE.DETAIL;
    this.closeEdition.emit();
  }

  onResizeTextArea() {
    this.resizeTextArea.emit();
  }

  noteSelected(selectedNote: ISelectedNote) {
    this.notesSelected.emit(selectedNote);
  }
}
