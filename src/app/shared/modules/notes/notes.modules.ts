import {isDevMode, NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {noteReducer} from './stores/note/note.reducer';
import {metaNoteReducers} from './stores/note/localStorageSyncNote.reducer';
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
import {MatSelectModule} from '@angular/material/select';
import {NotesComponent} from './components/notes.component';
import {MatChipListbox, MatChipRow} from '@angular/material/chips';
import {MatInput} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';

import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {CollectionsEditionComponent} from './components/collections-edition/collections-edition.component';

import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {collectionReducer} from './stores/collection/collection.reducer';
import {metaCollectionReducers} from './stores/collection/localStorageSyncCollection.reducer';
import {MatList, MatListItem} from '@angular/material/list';

import {NotesService} from './services/notes.service';
import {
  CollectionCheckboxListComponent
} from './components/collection-checkbox-list/collection-checkbox-list.component';

import {NoteCheckboxListComponent} from './components/note-checkbox-list/note-checkbox-list.component';
import {CollectionMenuComponent} from './components/collection-menu/collection-menu.component';
import {NoteComponent} from './components/note-list/note/note.component';
import {EditionNoteComponent} from './components/note-list/note/edition-note/edition-note.component';
import {NoteDetailComponent} from './components/note-list/note/note-detail/note-detail.component';
import {DialogAddNoteComponent} from './components/dialogs/dialog-add-note/dialog-add-note.component';
import {DialogArchivedNotesComponent} from './components/dialogs/dialog-archived-notes/dialog-archived-notes.component';
import {
  DialogChangedCollectionNotesComponent
} from './components/dialogs/dialog-changed-collection-notes/dialog-changed-collection-notes.component';
import {DialogDeletedNotesComponent} from './components/dialogs/dialog-deleted-notes/dialog-deleted-notes.component';
import {
  DialogCollectionsEditionComponent
} from './components/dialogs/dialog-collections-edition/dialog-collections-edition.component';
import {NoteListComponent} from './components/note-list/note-list.component';

@NgModule({
  declarations: [
    NoteComponent,
    EditionNoteComponent,
    NoteDetailComponent,
    DialogAddNoteComponent,

    DialogArchivedNotesComponent,
    DialogChangedCollectionNotesComponent,
    DialogDeletedNotesComponent,

    NoteCheckboxListComponent,
    CollectionCheckboxListComponent,

    ToolbarComponent,
    CollectionMenuComponent,
    SideNavComponent,

    NotesComponent,
    NoteListComponent,

    CollectionsEditionComponent,
    DialogCollectionsEditionComponent
  ],
  exports: [
    NoteComponent,
    EditionNoteComponent,
    NoteDetailComponent,
    DialogAddNoteComponent,

    DialogArchivedNotesComponent,
    DialogChangedCollectionNotesComponent,
    DialogDeletedNotesComponent,

    NoteCheckboxListComponent,
    CollectionCheckboxListComponent,

    ToolbarComponent,
    CollectionMenuComponent,
    SideNavComponent,

    NotesComponent,
    NoteListComponent,

    CollectionsEditionComponent,
    DialogCollectionsEditionComponent
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
    MatChipListbox,
    MatChipRow,
    MatInput,
    MatCheckbox,
    CdkTextareaAutosize,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatCheckbox,

    NgxColorsModule,

    NgxTextColorContrastModules,
    NgxTileLayoutModules,
    NgxMaterialThemesModules,
    MatList,
    MatListItem,

    StoreModule.forRoot(
      {notes: noteReducer, collections: collectionReducer},
      {metaReducers: [metaNoteReducers, metaCollectionReducers]}
    ),

    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()})
  ],
  providers: [
    NotesService
  ]
})
export class NotesModules {
}
