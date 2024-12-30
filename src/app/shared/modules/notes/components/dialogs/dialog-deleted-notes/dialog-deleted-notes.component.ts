import {Component, Inject} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Note} from '../../../interfaces/note.interface';

@Component({
  selector: 'app-dialog-add-note',
  templateUrl: './dialog-deleted-notes.component.html',
  styleUrl: './dialog-deleted-notes.component.scss'
})
export class DialogDeletedNotesComponent {
  private selectedNotes: Note[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogDeletedNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {selectedNotes: Note[]},
  ) { }

  selectionChange(notes: Note[]) {
    this.selectedNotes = notes;
  }

  onClosed(): void {
    this.dialogRef.close();
  }

  onConfirmed(): void {
    const selectedNotes = this.selectedNotes.length > 0
      ? this.selectedNotes
      : this.data.selectedNotes;
    this.dialogRef.close(selectedNotes);
  }
}
