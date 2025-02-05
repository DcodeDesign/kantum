import { Injectable } from '@angular/core';
import {CreateTaskModalComponent} from '../components/create-task-modal/create-task-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {
  CreateTaskTemplateModalComponent
} from '../components/create-task-template-modal/create-task-template-modal.component';

@Injectable({
  providedIn: 'root'
})
export class TimesheetDialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openTaskModal() {
    return this.dialog.open(CreateTaskModalComponent, {
      maxWidth: '100vw',
      width: '100%',
      panelClass: 'full-screen-modal',
      autoFocus: false
    });
  }

  openTaskTemplateModal() {
    return this.dialog.open(CreateTaskTemplateModalComponent, {
      maxWidth: '100vw',
      width: '100%',
      panelClass: 'full-screen-modal',
      autoFocus: false
    });
  }

}
