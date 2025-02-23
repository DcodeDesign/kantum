import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BudgetManagerComponent} from './components/budget-manager/budget-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'budget-manager', pathMatch: 'full' },
  { path: 'budget-manager', component: BudgetManagerComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetManagerRoutingModule { }
