import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {NotesModules} from './modules/notes/notes.modules';
import {MatCheckbox} from '@angular/material/checkbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotesModules,
    MatCheckbox
  ],
  exports: []
})
export class SharedModule { }
