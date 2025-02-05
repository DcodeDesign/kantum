import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {NotesModule} from './modules/notes/notes.module';
import {MatCheckbox} from '@angular/material/checkbox';
import {LocalStorageBackupService} from './services/local-storage-backup-service.service';
import { LocalStorageManagerComponent } from './components/local-storage-manager-component/local-storage-manager.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@NgModule({
  declarations: [
    LocalStorageManagerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotesModule,
    MatCheckbox,
    MatIcon,
    MatButton
  ],
  providers: [
    LocalStorageBackupService
  ],
  exports: [
    LocalStorageManagerComponent
  ]
})
export class SharedModule { }
