import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetComponent } from './components/timesheet.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MatDivider} from '@angular/material/divider';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatToolbarRow} from '@angular/material/toolbar';
import {NgxColorsModule} from 'ngx-colors';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatCheckbox} from '@angular/material/checkbox';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import {MatDialogActions, MatDialogContent, MatDialogModule, MatDialogTitle} from '@angular/material/dialog';
import {MatList, MatListItem} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {FilterByDatePipe} from './pipes/filter-by-date.pipe';
import { TotalTimeTasksComponent } from './components/total-time-task/total-time-tasks.component';
import { DecimalConvertToHourPipe } from './pipes/decimal-convert-to-hour.pipe';
import {
  CreateTaskTemplateModalComponent
} from './components/create-task-template-modal/create-task-template-modal.component';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    TimesheetComponent,
    CreateTaskModalComponent,
    CreateTaskTemplateModalComponent,
    FilterByDatePipe,
    TotalTimeTasksComponent,
    DecimalConvertToHourPipe
  ],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    MatTabsModule,
    HttpClientModule,
    MatIconButton,
    MatIcon,
    MatTable,
    MatColumnDef,
    MatCellDef,
    MatCell,
    MatHeaderCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    FormsModule,
    MatButton,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    MatToolbarRow,
    NgxColorsModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCheckbox,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatList,
    MatListItem,
    MatDialogModule,
    MatExpansionModule
  ]
})
export class TimesheetModule { }
