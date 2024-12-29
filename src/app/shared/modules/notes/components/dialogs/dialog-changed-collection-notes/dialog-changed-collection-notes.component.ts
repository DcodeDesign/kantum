import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Note} from '../../../interfaces/note.interface';

@Component({
  selector: 'app-dialog-add-note',
  templateUrl: './dialog-changed-collection-notes.component.html',
  styleUrl: './dialog-changed-collection-notes.component.scss'
})
export class DialogChangedCollectionNotesComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogChangedCollectionNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {selectedNotes: Note[]},
  ) {
  }

  ngOnInit(): void {

  }

  selectionNotesChange(notes: Note[]) {

  }
}
