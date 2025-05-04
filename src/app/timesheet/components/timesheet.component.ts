import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {addDays, addMonths, eachDayOfInterval, endOfMonth, startOfMonth, subDays, subMonths} from 'date-fns';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as XLSX from 'xlsx';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TimesheetDialogService} from '../services/timesheet-dialog.service';
import {DATE_NAGER_URL, SCHOOL_VACATIONS_BE} from '../contants/timesheet.constant';
import * as uudi from 'short-uuid';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {ITask} from '../interfaces/task.interface';
import {Store} from '@ngrx/store';
import {selectAllTasks} from '../stores/task-list/task-list.selectors';
import {updateAllTasks} from '../stores/task-list/task-list.actions';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TimesheetComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  @ViewChild('tasks') tableTask: MatTable<ITask[]>;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  allSelected: boolean = false;

  displayedMonth = new Date();
  displayedColumns: string[] = [];
  daysInMonth: Date[] = [];

  holidays: any;

  tasks: any[] = [];
  project: string = '';
  task: string = '';
  description: string = '';
  salesOrderItem: string = '';
  hours: number = 0;

  selectedDays: Date[] = [];
  columnsToDisplay: string[] = ['date', 'project', 'task', 'description', 'salesOrderItem', 'hours', 'actions'];
  dataSource = new MatTableDataSource<ITask>([]);

  columnLabels: Record<string, string> = {
    date: 'Date',
    project: 'Projet',
    task: 'Tâche',
    description: 'Description',
    salesOrderItem: 'SO Item',
    hours: 'Heures',
    actions: 'Actions'
  };

  editedRow: any = null;
  originalData: any = null;
  private updateDataSourceData: ITask[] = [];
  private cloneDataSourceData: ITask[] = [];
  private firstExecution = true;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private timesheetDialogService: TimesheetDialogService,
    private store: Store
  ) {
    this.updateDaysInMonth();
  }

  ngOnInit(): void {
    this.loadHolidays();

    const date = new Date();
    date.setHours(0, 0, 0, 0);

    this.store.select(selectAllTasks).subscribe(tasks => {
      this.dataSource.data = [...tasks];
      this.cloneDataSourceData = [...this.dataSource.data];

      if(this.firstExecution) {
        this.selectDays(date);
        this.firstExecution = false;
      }
    })
  }

  editRow(row: any) {
    this.originalData = {...row};
    this.editedRow = row;
  }

  saveRow(element: ITask) {
    this.editedRow = null;

    if(this.updateDataSourceData.length > 0) {
      this.dataSource.data = this.updateDataSourceData;
    }

    this.updateDataSource();
  }

  changeRowValue(row: ITask, column: string, $event: Event) {
    this.updateDataSourceData = this.dataSource.data.map(item => {
      if(item.id === row.id) {
        return { ...item, [column]:($event.target as HTMLInputElement).value}
      }

      return item;
    })
    console.log(this.updateDataSourceData)
  }

  cancelEdit() {
    this.editedRow = null;
    this.updateDataSourceData = [];
  }

  deleteRow(element: any): void {
    this.dataSource.data = this.dataSource.data.filter(task => task?.id !== element.id);
    this.updateDataSource();
  }

  updateDataSource() {
    this.store.dispatch(updateAllTasks({ tasks: this.dataSource.data }));
    this.tableTask?.renderRows();
  }

  openTaskModal(): void {
    const dialogRef = this.timesheetDialogService.openTaskModal();

    dialogRef.afterClosed().subscribe((newTasks: any[]) => {
      if (newTasks && newTasks.length > 0) {
        this.addMultipleTasksToDay(newTasks);
      }
    });
  }

  openTaskTemplateModal(): void {
    this.timesheetDialogService.openTaskTemplateModal();
  }

  addMultipleTasksToDay(newTasks: any[]): void {
    this.tasks = [];
    this.selectedDays.forEach(day => {
      newTasks = newTasks.map(task => ({...task, date: day, id: uudi.generate()}));
      this.tasks.push(...newTasks);
    });

    this.dataSource.data = [...this.dataSource.data, ...this.tasks];

    this.updateDataSource();
  }

  getHolidays(year: number, country: string): Observable<any> {
    return this.http.get<any>(DATE_NAGER_URL + '/' + year + '/' + country);
  }

  loadHolidays(): void {
    const year = this.displayedMonth.getFullYear();
    const country = 'BE';
    this.getHolidays(year, country).subscribe(data => {
      this.holidays = data;
    });
  }

  updateDaysInMonth() {
    this.daysInMonth = eachDayOfInterval({
      start: startOfMonth(this.displayedMonth),
      end: endOfMonth(this.displayedMonth)
    });
    this.displayedColumns = this.daysInMonth.map((_, index) => `day-${index}`);
  }

  previousMonth() {
    this.selectedDays = [];
    this.displayedMonth = subMonths(this.displayedMonth, 1);
    this.updateDaysInMonth();
  }

  nextMonth() {
    this.selectedDays = [];
    this.displayedMonth = addMonths(this.displayedMonth, 1);
    this.updateDaysInMonth();
  }

  previousDay(day: any) {
    this.selectedDays = [subDays(day, 1)];
    this.cdr.markForCheck();
  }

  nextDay(day: any) {
    this.selectedDays = [addDays(day, 1)];
    this.cdr.markForCheck();
  }

  isWeekend(day: Date): boolean {
    const dayOfWeek = day.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  }

  isHoliday(day: Date): boolean {
    return this.holidays.some((holiday: { date: string | number | Date, types: string[] }) => {
      return new Date(holiday.date).toDateString() === day.toDateString() && !holiday?.types.includes('Bank');
    });
  }

  isSchoolHoliday(day: Date): boolean {
    const year = day.getFullYear();
    const holidaysForYear = SCHOOL_VACATIONS_BE[year];

    if (!holidaysForYear) return false;

    return holidaysForYear.some((holiday: {
      date: Date | string | number;
      debut: Date | number;
      fin: Date | number
    }) => {

      if (holiday.date && new Date(holiday.date).toDateString() === day.toDateString()) {
        return true;
      }

      if (holiday.debut && holiday.fin) {
        const dayTimestamp = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
        const startTimestamp = new Date(holiday.debut).getTime();
        const endTimestamp = new Date(holiday.fin).getTime();

        return dayTimestamp >= startTimestamp && dayTimestamp <= endTimestamp;
      }

      return false;
    });
  }

  selectDays(day: Date): void {
    const index = this.selectedDays.findIndex(d => d.getTime() === day.getTime());

    if (index !== -1) {
      this.selectedDays.splice(index, 1);
    } else {
      this.selectedDays.push(day);
    }

    if(this.selectedDays.length !== 0) {
      this.dataSource.filterPredicate = (task: ITask, filter: string) => {
        return this.selectedDays.length !== 0
          ? this.selectedDays.some(selectedDate => {
              return task.date.getTime() === selectedDate.getTime()
          })
          : true;
      }

      this.dataSource.filter = 'filter';
    } else {
      this.dataSource.data = this.cloneDataSourceData;
    }

    this.tableTask?.renderRows();
  }

  isSelected(day: Date): boolean {
    return this.selectedDays.some(selected => selected.getTime() === day.getTime());
  }

  exportToXLSX(): void {
    const data = [];

    data.push(['Date', 'Projet', 'Tâche', 'Description', 'Sales Order Item', 'Quantité']);

    const isFiltering = this.selectedDays.length > 0;
    const selectedTimestamps = new Set(this.selectedDays.map(day => day.getTime()));

    this.dataSource.data.forEach(task => {
      const isSelected = !isFiltering || selectedTimestamps.has(task.date.getTime());
      if (isSelected) {
        data.push([
          task.date,
          task.project,
          task.task,
          task.description,
          task.salesOrderItem,
          Number(task.hours)
        ]);
      }
    });

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = {Sheets: {'Timesheet': ws}, SheetNames: ['Timesheet']};
    XLSX.writeFile(wb, `timesheet-${this.displayedMonth.getFullYear()}-${this.displayedMonth.getMonth() + 1}.xlsx`);
  }

  applyFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = ((data: any, filter: string) => {
      let searchTerm = filter;
      let dataToReturn = true;
      for(let col in data) {
        let colToReturn = !searchTerm || data[col].toString().toLowerCase().includes(searchTerm)
        dataToReturn = dataToReturn && colToReturn;
      }
      return dataToReturn;
    }) as (data: any, filter: string) => boolean;

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  selectAllDays(checked: boolean): void {
    this.allSelected = checked;
    if(this.allSelected) {
      this.daysInMonth.forEach(date => {
        if(!this.isWeekend(date)) {
          this.selectDays(date)
        }
      });
    } else {
        this.selectedDays = [];
    }
  }

  getTooltipText(day: Date): string {
    let tooltipParts: string[] = [];

    if (this.isHoliday(day)) {
      tooltipParts.push('Jour férié');
    }
    if (this.isWeekend(day)) {
      tooltipParts.push('Week-end');
    }
    if (this.isSchoolHoliday(day)) {
      tooltipParts.push('Congé scolaire');
    }

    return tooltipParts.length > 0 ? tooltipParts.join(' - ') : ''; // Séparateur clair
  }

  protected readonly Number = Number;
}
