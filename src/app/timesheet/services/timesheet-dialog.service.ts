import { Injectable } from '@angular/core';
import {TaskModalComponent} from '../components/task-modal/task-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class TimesheetDialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openTaskModal() {
    return this.dialog.open(TaskModalComponent, {
      maxWidth: '100vw',
      width: '100%',
      panelClass: 'full-screen-modal'
    });
  }

}
