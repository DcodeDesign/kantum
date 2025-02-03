import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {NotesModule} from './modules/notes/notes.module';
import {MatCheckbox} from '@angular/material/checkbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotesModule,
    MatCheckbox
  ],
  exports: []
})
export class SharedModule { }
