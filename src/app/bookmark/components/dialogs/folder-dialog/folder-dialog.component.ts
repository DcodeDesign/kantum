import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-folder-dialog',
  templateUrl: './folder-dialog.component.html',
  styleUrl: './folder-dialog.component.scss'
})
export class FolderDialogComponent {
  folderName: string = '';
  constructor(public dialogRef: MatDialogRef<FolderDialogComponent>) {}
}
