import { createAction, props } from '@ngrx/store';
import {Collection} from '../../shared/interfaces/collection.interface';

export const addCollection = createAction('[Collection] Add Collection', props<{ collection: Collection }>());
export const updateCollection = createAction('[Collection] Update Collection', props<{ collection: Collection }>());
export const updateAllCollections = createAction('[Collection] Update All Collections', props<{ collections: Collection[] }>());
export const deleteCollection = createAction('[Collection] Delete Collection', props<{ id: string }>());
export const loadCollections = createAction('[Collection] Load Collections');
export const loadCollectionsSuccess = createAction('[Collection] Load Collections Success', props<{ collections: Collection[] }>());
