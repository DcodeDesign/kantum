import {Component, Inject} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Note} from '../../../interfaces/note.interface';

@Component({
  selector: 'app-dialog-add-note',
  templateUrl: './dialog-deleted-notes.component.html',
  styleUrl: './dialog-deleted-notes.component.scss'
})
export class DialogDeletedNotesComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogDeletedNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {selectedNotes: Note[]},
  ) {
  }
}
