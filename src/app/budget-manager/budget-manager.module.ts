import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BudgetManagerRoutingModule } from './budget-manager-routing.module';
import { BudgetManagerComponent } from './components/budget-manager/budget-manager.component';
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable
} from '@angular/material/table';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatFormField, MatFormFieldModule, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator';
import {MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatToolbarRow} from '@angular/material/toolbar';
import {MatDivider} from '@angular/material/divider';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {DateAdapter, MatNativeDateModule, MatOption, NativeDateAdapter} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MatSelect} from '@angular/material/select';


@NgModule({
  declarations: [
    BudgetManagerComponent
  ],
  imports: [
    CommonModule,
    BudgetManagerRoutingModule,
    MatRow,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatCell,
    MatHeaderCell,
    MatHeaderCellDef,
    MatColumnDef,
    MatTable,
    MatProgressSpinner,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatPaginator,
    MatExpansionPanel,
    MatIconButton,
    MatIcon,
    MatSort,
    MatSortModule,
    MatExpansionModule,
    MatCard,
    MatToolbarRow,
    MatDivider,
    MatCardTitle,
    MatCardContent,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSuffix,
    FormsModule,
    MatSelect,
    MatOption,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter }, // Définir l'adaptateur de date
  ],
})
export class BudgetManagerModule { }
