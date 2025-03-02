import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookmarkRoutingModule } from './bookmark-routing.module';
import { BookmarkManagerComponent } from './components/bookmark-manager/bookmark-manager.component';
import { FolderDialogComponent } from './components/dialogs/folder-dialog/folder-dialog.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField, MatInput} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FolderComponent } from './components/bookmark-manager/folder/folder.component';
import {MatLabel} from '@angular/material/form-field';
import {MatAccordion, MatExpansionPanel} from '@angular/material/expansion';
import {MatList, MatListItem, MatListModule} from '@angular/material/list';
import {MatTree, MatTreeModule, MatTreeNode, MatTreeNodeDef, MatTreeNodePadding} from '@angular/material/tree';
import {MatIcon} from '@angular/material/icon';
import {MatToolbarRow} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    BookmarkManagerComponent,
    FolderDialogComponent,
    FolderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BookmarkRoutingModule,
    MatDialogActions,
    MatButton,
    MatInput,
    FormsModule,
    MatFormField,
    MatDialogContent,
    MatDialogTitle,
    MatLabel,
    MatAccordion,
    MatExpansionPanel,
    MatList,
    MatListItem,
    MatListModule,
    MatTree,
    MatTreeNode,
    MatTreeNodeDef,
    MatTreeNodePadding,
    MatIconButton,
    MatIcon,
    MatTreeModule,
    MatToolbarRow
  ]
})
export class BookmarkModule { }
