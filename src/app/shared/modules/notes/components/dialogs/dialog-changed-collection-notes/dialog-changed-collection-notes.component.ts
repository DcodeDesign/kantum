import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Note} from '../../../interfaces/note.interface';
import {Collection} from '../../../interfaces/collection.interface';

@Component({
  selector: 'app-dialog-add-note',
  templateUrl: './dialog-changed-collection-notes.component.html',
  styleUrl: './dialog-changed-collection-notes.component.scss'
})
export class DialogChangedCollectionNotesComponent {
  private selectedNotes: Note[] = [];
  private selectCollections: Collection[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogChangedCollectionNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {selectedNotes: Note[]}
  ) {
  }

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

    this.dialogRef.close(
      {
        selectedNotes: selectedNotes,
        selectedCollections: this.selectCollections
      }
    );
  }

  selectedCollections(collections: Collection[]) {
    this.selectCollections = collections;
  }
}
