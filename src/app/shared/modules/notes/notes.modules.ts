import {isDevMode, NgModule} from '@angular/core';
import {NoteComponent} from './components/notes/note-list/note/note.component';
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
import {NotesComponent} from './components/notes/notes.component';
import {MatChipListbox, MatChipRow} from '@angular/material/chips';
import {MatInput} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';
import {NoteListComponent} from './components/notes/note-list/note-list.component';
import {SharedModule} from '../../shared.module';
import {ToolbarComponent} from './components/notes/toolbar/toolbar.component';
import {CollectionMenuComponent} from './components/notes/collection-menu/collection-menu.component';
import {SideNavComponent} from './components/notes/side-nav/side-nav.component';
import {CollectionsEditionComponent} from './components/collections/collections-edition/collections-edition.component';
import {
  DialogCollectionsEditionComponent
} from './components/collections/dialog-collections-edition/dialog-collections-edition.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {collectionReducer} from './stores/collection/collection.reducer';
import {metaCollectionReducers} from './stores/collection/localStorageSyncCollection.reducer';
import {MatList, MatListItem} from '@angular/material/list';
import {EditionNoteComponent} from './components/notes/note-list/note/edition-note/edition-note.component';
import {NoteDetailComponent} from './components/notes/note-list/note/note-detail/note-detail.component';
import {NotesService} from './services/notes.service';

@NgModule({
  declarations: [
    NoteComponent,
    EditionNoteComponent,
    NoteDetailComponent,

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

    NgxColorsModule,

    NgxTextColorContrastModules,
    NgxTileLayoutModules,
    NgxMaterialThemesModules,

    StoreModule.forRoot(
      {notes: noteReducer, collections: collectionReducer},
      {metaReducers: [metaNoteReducers, metaCollectionReducers]}
    ),

    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    MatList,
    MatListItem,
  ],
  providers: [
    NotesService
  ]
})
export class NotesModules {}
