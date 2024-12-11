import {isDevMode, NgModule} from '@angular/core';
import {NotesComponent} from './components/notes/notes.component';
import {NoteCardComponent} from './components/note-card/note-card.component';
import {StoreModule} from '@ngrx/store';
import {noteReducer} from './stores/note.reducer';
import {metaReducers} from './stores/localStorageSync.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {NgxColorsModule} from 'ngx-colors';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxTextColorContrastModules} from 'ngx-text-color-contrast';
import {NgxTileLayoutModules} from 'ngx-tile-layout';
import {NgxMaterialThemesModules} from 'ngx-material-themes';
import {MatToolbarRow} from '@angular/material/toolbar';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {MatTree, MatTreeNode, MatTreeNodeDef, MatTreeNodePadding, MatTreeNodeToggle} from '@angular/material/tree';
import {MatSelectModule, MatSelectTrigger} from '@angular/material/select';
import {SideNavNotesComponent} from './components/side-nav-notes/side-nav-notes.component';
import {MatChipListbox, MatChipRow} from '@angular/material/chips';
import {MatInput} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    NotesComponent,
    NoteCardComponent,
    SideNavNotesComponent
  ],
  exports: [
    NotesComponent,
    NoteCardComponent,
    SideNavNotesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    DragDropModule,
    CdkTextareaAutosize,
    MatToolbarRow,
    MatDrawerContainer,
    MatDrawer,
    MatButton,
    NgxMaterialThemesModules,
    MatTreeNode,
    MatTreeNodeDef,
    MatTree,
    MatTreeNodePadding,
    MatTreeNodeToggle,
    MatFormFieldModule,
    MatSelectModule,


    NgxColorsModule,

    NgxTextColorContrastModules,
    NgxTileLayoutModules,
    NgxMaterialThemesModules,

    StoreModule.forRoot(
      {notes: noteReducer},
      {metaReducers}
    ),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    MatChipListbox,
    MatChipRow,
    MatInput,
    MatCheckbox,
  ],
})
export class NotesModules {}
