import {Component, Inject} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { NOTE_MODE } from '../../../enums/note-mode.enum';
import {Note} from '../../../interfaces/note.interface';

@Component({
  selector: 'app-dialog-add-note',
  templateUrl: './dialog-add-note.component.html',
  styleUrl: './dialog-add-note.component.scss'
})
export class DialogAddNoteComponent {
  protected readonly NOTE_MODE = NOTE_MODE;

  constructor(
    public dialogRef: MatDialogRef<DialogAddNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {note: Note},
  ) {
  }
}
