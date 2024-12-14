import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { Note } from '../../../../interfaces/note.interface';
import {NOTE_MODE} from '../../../../enums/note-mode.enum';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {
  @Input() note: Note | undefined;
  @Input() noteMode: NOTE_MODE = NOTE_MODE.DETAIL;

  @Output() cancelEdition: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeEdition: EventEmitter<void> = new EventEmitter<void>();
  @Output() noteIdEditionMode: EventEmitter<string> = new EventEmitter<string>();
  @Output() resizeTextArea: EventEmitter<void> = new EventEmitter<void>();

  protected readonly NOTE_MODE = NOTE_MODE;

  constructor() {}

  ngOnInit(): void {
    console.log(this.note);
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
}
