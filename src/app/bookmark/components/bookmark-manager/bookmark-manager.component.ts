
import {FolderDialogComponent} from '../dialogs/folder-dialog/folder-dialog.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {NestedTreeControl} from '@angular/cdk/tree';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];
interface Bookmark {
  id: number;
  name: string;
  url: string;
}

export interface Folder {
  id: number;
  name: string;
  bookmarks: Bookmark[];
  subfolders: Folder[];
  expanded: boolean;
}

@Component({
  selector: 'app-bookmark-manager',
  templateUrl: './bookmark-manager.component.html',
  styleUrl: './bookmark-manager.component.scss'
})
export class BookmarkManagerComponent {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

 /* treeControl = new NestedTreeControl<Folder>(node => node.subfolders);
  dataSource = new MatTreeNestedDataSource<Folder>();
  folders: Folder[] = [];
  userForm: FormGroup;
  bookmarkForm: FormGroup;
  bookmarkFormVisible = false;
  currentFolder: Folder | null = null;
  editingBookmark: Bookmark | null = null;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.userForm = this.fb.group({
      username: [''],
      password: ['']
    });
    this.bookmarkForm = this.fb.group({
      name: [''],
      url: [''],
      username: [''],
      password: ['']
    });
    this.dataSource.data = this.folders;
  }

  hasChild = (_: number, node: Folder) => !!node.subfolders && node.subfolders.length > 0;

  openFolderDialog() {
    const dialogRef = this.dialog.open(FolderDialogComponent);
    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.folders.push({expanded: false, id: Date.now(), name, bookmarks: [], subfolders: [] });
        this.dataSource.data = this.folders;
      }
    });
  }

  openSubFolderDialog(folder: Folder) {
    const dialogRef = this.dialog.open(FolderDialogComponent);
    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        folder.subfolders.push({expanded: false, id: Date.now(), name, bookmarks: [], subfolders: [] });
        this.dataSource.data = [...this.folders];
      }
    });
  }

  openBookmarkForm(folder: Folder, bookmark: Bookmark | null) {
    this.currentFolder = folder;
    this.editingBookmark = bookmark;
    this.bookmarkForm.setValue({
      name: bookmark ? bookmark.name : '',
      url: bookmark ? bookmark.url : '',
      username: '',
      password: ''
    });
    this.bookmarkFormVisible = true;
  }

  saveBookmark() {
    if (this.currentFolder) {
      if (this.editingBookmark) {
        this.editingBookmark.name = this.bookmarkForm.value.name;
        this.editingBookmark.url = this.bookmarkForm.value.url;
      } else {
        this.currentFolder.bookmarks.push({
          id: Date.now(),
          name: this.bookmarkForm.value.name,
          url: this.bookmarkForm.value.url
        });
      }
    }
    this.bookmarkFormVisible = false;
  } */
}
