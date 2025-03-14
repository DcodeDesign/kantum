import {Injectable} from '@angular/core';
import {CollectionMenu} from '../interfaces/collection-menu.interface';
import {selectAllCollection} from '../stores/collection/collection.selectors';
import {map, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Collection} from '../interfaces/collection.interface';
import {DEFAULT_COLLECTIONS} from '../constants/default-collections.constant';
import {DialogService} from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  collectionNameSelected = DEFAULT_COLLECTIONS.ALL;

  constructor(
    private store: Store,
    private dialogService: DialogService
  ) { }

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
          name: 'Collections',
          children,
        }]
        : []),
      {
        name: 'Ajouter une collection',
        icon: 'new_label',
        action: () => this.dialogService.openCollectionEditionDialog(),
      },
      {
        name: DEFAULT_COLLECTIONS.ARCHIVE,
        icon: 'archive',
        action: (collectionName: string | undefined) => this.showCollections(collectionName),
      },
    ];
  }

  showCollections(collectionName: string | undefined) {
    if (collectionName) {
      this.collectionNameSelected = collectionName;
    }
  }

}
