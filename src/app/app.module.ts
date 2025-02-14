import {isDevMode, LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { SharedModule } from './shared/shared.module';

import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

import { ServiceWorkerModule } from '@angular/service-worker';
import {NotesModule} from './shared/modules/notes/notes.module';


import {MatDivider} from '@angular/material/divider';
import {StoreModule} from '@ngrx/store';
import {noteReducer} from './shared/modules/notes/stores/note/note.reducer';
import {collectionReducer} from './shared/modules/notes/stores/collection/collection.reducer';
import {metaNoteReducers} from './shared/modules/notes/stores/note/localStorageSyncNote.reducer';
import {metaCollectionReducers} from './shared/modules/notes/stores/collection/localStorageSyncCollection.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {tasksListReducer} from './timesheet/stores/task-list/tasks-list.reducer';
import {metaTasksReducers} from './timesheet/stores/task-list/localStorageSyncTasks.reducer';
import {
  metaTaskTemplateListReducers
} from './timesheet/stores/task-template-list/localStorageSyncTaskTemplateList.reducer';
import {taskTemplateListReducer} from './timesheet/stores/task-template-list/task-template-list.reducer';

import {NgxMaterialThemesModules, ThemePreviewComponent} from 'ngx-material-themes';
import {NgxTileLayoutModules} from '../../projects/ngx-tile-layout/src/lib/ngx-tile-layout.modules';
import {Breakpoint, BREAKPOINTS} from '../../projects/ngx-responsive-columns/src/lib/services/breakpoint.token';
import {
  NgxResponsiveColumnsModules
} from '../../projects/ngx-responsive-columns/src/lib/ngx-responsive-columns.modules';
import {
  NgxTextColorContrastModules
} from '../../projects/ngx-text-color-contrast/src/lib/ngx-text-color-contrast.modules';

registerLocaleData(localeFr, 'fr');

const customBreakpoints: Breakpoint[] = [
  { width: 1536, cols: 6 },
  { width: 1280, cols: 4 },
  { width: 1024, cols: 3 },
  { width: 768, cols: 2 },
  { width: 640, cols: 2 },
  { width: 480, cols: 1 },
  { width: 0, cols: 1 },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MatToolbar,
    MatIconButton,
    MatIcon,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

    NotesModule,

    NgxMaterialThemesModules,
    NgxResponsiveColumnsModules,
    NgxTextColorContrastModules,
    NgxTileLayoutModules,
    ThemePreviewComponent,

    MatDivider,

    StoreModule.forRoot(
      {
        notes: noteReducer,
        collections: collectionReducer,
        tasks: tasksListReducer,
        taskTemplateList: taskTemplateListReducer
      },
      {
        metaReducers: [
          metaNoteReducers,
          metaCollectionReducers,
          metaTasksReducers,
          metaTaskTemplateListReducers
        ]}
    ),

    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()})
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: BREAKPOINTS, useValue: customBreakpoints },
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
