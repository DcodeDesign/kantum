import { createReducer, on } from '@ngrx/store';
import {
  addCollection,
  deleteCollection,
  loadCollectionsSuccess,
  updateAllCollections,
  updateCollection
} from './collection.actions';
import {Collection, initialCollectionState} from '../../interfaces/collection.interface';

export const collectionReducer = createReducer(
  initialCollectionState,
  on(loadCollectionsSuccess, (state, { collections }) => ({ ...state, collections })),
  on(addCollection, (state, { collection }) => ({ ...state, collections: [...state.collections, collection] })),
  on(updateCollection, (state, { collection }) => ({
    ...state,
    collections: state.collections.map(n => n.id === collection.id ? collection : n)
  })),
  on(updateAllCollections, (state, { collections }) => ({
    ...state,
    collections: collections
  })),
  on(deleteCollection, (state, { id }) => ({
    ...state,
    collections: state.collections.filter((collection: Collection) => collection.id !== id)
  }))
);
