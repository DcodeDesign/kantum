import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotesComponent} from './shared/modules/notes/components/notes.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'notes', loadChildren: () => import('./shared/modules/notes/notes.module').then(m => m.NotesModule) },
  { path: 'timesheet', loadChildren: () => import('./timesheet/timesheet.module').then(m => m.TimesheetModule) },
  { path: 'budget-manager', loadChildren: () => import('./budget-manager/budget-manager.module').then(m => m.BudgetManagerModule) },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
