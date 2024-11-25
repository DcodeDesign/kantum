import {isDevMode, NgModule} from '@angular/core';
import {NotesComponent} from './components/notes.component';
import {NoteCardComponent} from './components/note-card/note-card.component';
import {StoreModule} from '@ngrx/store';
import {noteReducer} from './stores/note.reducer';
import {metaReducers} from './stores/localStorageSync.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {NgxColorsModule} from 'ngx-colors';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxTextColorContrastModules} from 'ngx-text-color-contrast';
import {NgxTileLayoutModules} from 'ngx-tile-layout';

@NgModule({
  declarations: [
    NotesComponent,
    NoteCardComponent
  ],
  exports: [
    NotesComponent,
    NoteCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    DragDropModule,
    CdkTextareaAutosize,

    NgxColorsModule,

    StoreModule.forRoot(
      {notes: noteReducer},
      {metaReducers}
    ),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    NgxTextColorContrastModules,
    NgxTileLayoutModules,
  ],
})
export class NotesModules {}
