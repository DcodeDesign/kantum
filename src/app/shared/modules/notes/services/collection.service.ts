import {Injectable} from '@angular/core';
import {CollectionMenu} from '../interfaces/collection-menu.interface';
import {selectAllCollection} from '../stores/collection/collection.selectors';
import {map, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Collection} from '../interfaces/collection.interface';
import {MatDialog} from '@angular/material/dialog';
import {Note} from '../interfaces/note.interface';
import {DEFAULT_COLLECTIONS} from '../constants/default-collections.constant';
import {
  DialogChangedCollectionNotesComponent
} from '../components/dialogs/dialog-changed-collection-notes/dialog-changed-collection-notes.component';
import {
  DialogCollectionsEditionComponent
} from '../components/dialogs/dialog-collections-edition/dialog-collections-edition.component';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  collectionNameSelected = DEFAULT_COLLECTIONS.ALL;

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {
  }

  getTreeList(): Observable<CollectionMenu[]> {
    return this.getCollection().pipe(
      map((collections) => this.buildTreeList(collections))
    )
  }

  private getCollection(): Observable<Collection[]> {
    return this.store.select(selectAllCollection).pipe(
      map((collections) => collections?.slice()?.reverse())
    )
  }

  private buildTreeList(collections: any[]): CollectionMenu[] {
    const children = collections.map(collection => ({
      id: collection.id,
      name: collection.name,
      icon: 'label',
      createdAt: collection.createdAt,
      action: (collectionName: string | undefined) => this.showCollections(collectionName),
    }));

    return [
      {
        name: DEFAULT_COLLECTIONS.ALL,
        icon: 'label',
        action: (collectionName: string | undefined) => this.showCollections(collectionName),
      },
      ...(children.length > 0
        ? [{
          name: 'My collections',
          children,
        }]
        : []),
      {
        name: 'Ajouter une collection',
        icon: 'new_label',
        action: () => this.openCollectionEditionDialog(),
      },
      {
        name: DEFAULT_COLLECTIONS.ARCHIVE,
        icon: 'archive',
        action: (collectionName: string | undefined) => this.showCollections(collectionName),
      },
    ];
  }

  openCollectionEditionDialog() {
    this.dialog.open(DialogCollectionsEditionComponent);
  }

  openChangedCollectionNotesDialog(selectedNotes: Note[]): void {
    this.dialog.open(DialogChangedCollectionNotesComponent, {
      data: {
        selectedNotes: selectedNotes
      }
    });
  }

  showCollections(collectionName: string | undefined) {
    if (collectionName) {
      this.collectionNameSelected = collectionName;
    }
  }

}
