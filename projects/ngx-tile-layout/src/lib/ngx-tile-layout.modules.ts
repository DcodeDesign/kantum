import {NgModule} from '@angular/core';
import {NgForOf, NgTemplateOutlet} from '@angular/common';
import {NgxTileLayoutComponent} from './ngx-tile-layout.component';

@NgModule({
  declarations: [
    NgxTileLayoutComponent
  ],
  exports: [
    NgxTileLayoutComponent
  ],
  imports: [
    NgForOf,
    NgTemplateOutlet
  ]
})
export class NgxTileLayoutModules {}
