import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from '../../interfaces/note.interface';
import {selectAllCollection} from '../../../stores/collection/collection.selectors';
import {map} from 'rxjs';
import {Store} from '@ngrx/store';
import {Collection} from '../../interfaces/collection.interface';

@Component({
  selector: 'app-collection-checkbox-list',
  templateUrl: './collection-checkbox-list.component.html',
  styleUrl: './collection-checkbox-list.component.scss'
})
export class CollectionCheckboxListComponent implements OnInit {
  @Output() selectionChange = new EventEmitter<Collection[]>();

  selectedCollections: Collection[] = [];
  protected collectionList: Collection[] = [];

  constructor(private store: Store<Collection>,) {}

  ngOnInit(): void {
    this.loadCollection();
  }

  loadCollection() {
    this.store.select(selectAllCollection).pipe(
      map((collections) => collections?.slice()?.reverse())
    ).subscribe(collections => this.collectionList = collections);
  }

  toggleCollectionSelection(collection: Collection, isChecked: boolean): void {
    if (isChecked) {
      this.selectedCollections.push(collection);
    } else {
      this.selectedCollections = this.selectedCollections.filter(n => collection.name !== collection.name);
    }
    this.selectionChange.emit(this.selectedCollections);
  }

  isChecked(collection: Collection): boolean {
    return this.selectedCollections.some(n => n.name === collection.name);
  }
}
