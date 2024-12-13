import {isDevMode, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { SharedModule } from './shared/shared.module';

import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';

import { ServiceWorkerModule } from '@angular/service-worker';
import {NotesModules} from './shared/modules/notes/notes.modules';

import {NgxMaterialThemesModules, ThemePreviewComponent} from 'ngx-material-themes';
import {Breakpoint, BREAKPOINTS, NgxResponsiveColumnsModules} from 'ngx-responsive-columns';
import {NgxTextColorContrastModules} from 'ngx-text-color-contrast';
import {NgxTileLayoutModules} from 'ngx-tile-layout';

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

    NotesModules,

    NgxMaterialThemesModules,
    NgxResponsiveColumnsModules,
    NgxTextColorContrastModules,
    NgxTileLayoutModules,
    ThemePreviewComponent,
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: BREAKPOINTS, useValue: customBreakpoints },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
