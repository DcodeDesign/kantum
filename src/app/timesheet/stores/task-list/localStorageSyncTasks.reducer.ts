import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as lodash from 'lodash';

const INIT_ACTION = '@ngrx/store/init';
const UPDATE_ACTION = '@ngrx/store/update-reducers';

const mergeReducer = (state: any, rehydratedState: any, action: any) => {
  if ((action.type === INIT_ACTION || action.type === UPDATE_ACTION) && rehydratedState) {
    state = lodash.merge(state, rehydratedState);
  }
  return state;
};

export function localStorageSyncTasksReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['tasks'],
    rehydrate: true,
    mergeReducer
  })(reducer);
}

export const metaTasksReducers: MetaReducer<any, any> = localStorageSyncTasksReducer;
