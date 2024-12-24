import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {loadCollections, loadCollectionsSuccess} from './collection.actions';
import { map } from 'rxjs/operators';
import {Collection} from '../../shared/interfaces/collection.interface';

@Injectable()
export class CollectionEffects {
  constructor(private actions$: Actions) {}

  loadCollections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCollections),
      map(() => {
        const collections: Collection[] = JSON.parse(localStorage.getItem('collections') || '[]') || [];
        return loadCollectionsSuccess({ collections });
      })
    )

  });

}
