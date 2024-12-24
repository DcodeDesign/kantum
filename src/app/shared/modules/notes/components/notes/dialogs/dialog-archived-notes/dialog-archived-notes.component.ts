import {Component, Inject} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Note} from '../../../../shared/interfaces/note.interface';

@Component({
  selector: 'app-dialog-add-note',
  templateUrl: './dialog-archived-notes.component.html',
  styleUrl: './dialog-archived-notes.component.scss'
})
export class DialogArchivedNotesComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogArchivedNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {selectedNotes: Note[]},
  ) {
  }
}
