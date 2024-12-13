import { createSelector, createFeatureSelector } from '@ngrx/store';
import {CollectionState} from '../../interfaces/collection.interface';

export const selectCollectionsState = createFeatureSelector<CollectionState>('collections');
export const selectAllCollection = createSelector(selectCollectionsState, (state) => state.collections);
