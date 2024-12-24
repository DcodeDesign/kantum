import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectAllCollection} from '../../../stores/collection/collection.selectors';
import {Collection} from '../../interfaces/collection.interface';
import {addCollection, deleteCollection, updateCollection} from '../../../stores/collection/collection.actions';
import {FormControl, Validators} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-collections-edition',
  templateUrl: './collections-edition.component.html',
  styleUrl: './collections-edition.component.scss'
})
export class CollectionsEditionComponent implements OnInit {
  protected collectionList: Collection[] = [];
  mouseOveredId: string | null = null;

  constructor(private store: Store) {}

  collectionNameForm = new FormControl(null, Validators.required);

  ngOnInit(): void {
    this.loadCollection();
  }

  loadCollection() {
    this.store.select(selectAllCollection).pipe(
      map((collections) => collections?.slice()?.reverse())
    ).subscribe(collections => this.collectionList = collections);
  }

  addCollections() {
    if(!this.collectionNameForm.valid) return;

    const newCollection = {
      id: uuidv4(),
      name: this.collectionNameForm.value ?? null,
      createdAt: new Date()
    }

    this.store.dispatch(addCollection({collection: newCollection}));
  }

  editCollection(collection: Collection) {
    this.store.dispatch(updateCollection({collection}));
  }

  deleteCollection(id: string) {
    this.store.dispatch(deleteCollection( {id}));
  }

  onClearSearch() {
    this.collectionNameForm.reset();
  }
}
