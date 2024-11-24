import {NgModule} from '@angular/core';
import {NgxMaterialThemesService} from './services/ngx-material-themes.service';
import {NgxMaterialThemesSwitcherComponent} from './components/theme-switcher/ngx-material-themes-switcher.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {
  MatLargeIconButtonDirective,
  MatMediumIconButtonDirective, MatSmallIconButtonDirective, MatTinyIconButtonDirective
} from './directives/mat-icon-button-sizes.directives';
import {ThemePreviewComponent} from './components/theme-preview/theme-preview';

@NgModule({
  declarations: [
    NgxMaterialThemesSwitcherComponent,

    MatLargeIconButtonDirective,
    MatMediumIconButtonDirective,
    MatSmallIconButtonDirective,
    MatTinyIconButtonDirective,
  ],
  exports: [
    NgxMaterialThemesSwitcherComponent,

    MatLargeIconButtonDirective,
    MatMediumIconButtonDirective,
    MatSmallIconButtonDirective,
    MatTinyIconButtonDirective,

  ],
  imports: [
    MatSlideToggleModule,
  ],
  providers: [
    NgxMaterialThemesService
  ]
})
export class NgxMaterialThemesModules {}
