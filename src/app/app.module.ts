import {isDevMode, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { SharedModule } from './shared/shared.module';

import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

import { ServiceWorkerModule } from '@angular/service-worker';
import {NotesModules} from './shared/modules/notes/notes.modules';

import {NgxMaterialThemesModules, ThemePreviewComponent} from 'ngx-material-themes';
import {NgxResponsiveColumnsModules} from 'ngx-responsive-columns';
import {NgxTextColorContrastModules} from 'ngx-text-color-contrast';
import {NgxTileLayoutModules} from 'ngx-tile-layout';

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
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
