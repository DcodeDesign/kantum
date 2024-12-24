import {Component, Inject} from '@angular/core';

import {NOTE_MODE} from "../../../../shared/enums/note-mode.enum";
import {Note} from '../../../../shared/interfaces/note.interface';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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
