import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookmarkManagerComponent} from './components/bookmark-manager/bookmark-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'bookmark-manager', pathMatch: 'full' },
  { path: 'bookmark-manager', component: BookmarkManagerComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookmarkRoutingModule { }
