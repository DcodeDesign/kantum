import {Component, OnInit} from '@angular/core';
import {startOfMonth, endOfMonth, eachDayOfInterval, subMonths, addMonths, subDays, addDays} from 'date-fns';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as XLSX from 'xlsx';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
export class TimesheetComponent implements OnInit {
  displayedMonth = new Date();
  displayedColumns: string[] = [];
  daysInMonth: Date[] = [];

  vacancesScolairesBelgique: any = {
    2024: [
      {
        libelle: "Rentrée scolaire",
        date: new Date(2024, 7, 26)
      },
      {
        libelle: "Fête de la Communauté française",
        date: new Date(2024, 8, 27)
      },
      {
        libelle: "Congé d'automne (Toussaint)",
        debut: new Date(2024, 9, 21),
        fin: new Date(2024, 10, 3)
      },
      {
        libelle: "Vacances d'hiver (Noël)",
        debut: new Date(2024, 11, 23),
        fin: new Date(2025, 0, 5)
      },
      {
        libelle: "Congé de détente (Carnaval)",
        debut: new Date(2024, 1, 24),
        fin: new Date(2024, 2, 9)
      },
      {
        libelle: "Lundi de Pâques",
        date: new Date(2024, 3, 21)
      },
      {
        libelle: "Jeudi de l'Ascension",
        date: new Date(2024, 4, 9)
      },
      {
        libelle: "Lundi de Pentecôte",
        date: new Date(2024, 5, 20)
      },
      {
        libelle: "Vacances d'été",
        debut: new Date(2024, 6, 5)
      }
    ],
    2025: [
      {
        libelle: "Fête de la Communauté française",
        date: new Date(2025, 8, 26)
      },
      {
        libelle: "Congé d'automne (Toussaint)",
        debut: new Date(2025, 9, 20),
        fin: new Date(2025, 10, 2)
      },
      {
        libelle: "Vacances d'hiver (Noël)",
        debut: new Date(2025, 11, 22),
        fin: new Date(2026, 0, 4)
      },
      {
        libelle: "Congé de détente (Carnaval)",
        debut: new Date(2025, 1, 24),
        fin: new Date(2025, 2, 9)
      },
      {
        libelle: "Lundi de Pâques",
        date: new Date(2025, 3, 21)
      },
      {
        libelle: "Jeudi de l'Ascension",
        date: new Date(2025, 4, 29)
      },
      {
        libelle: "Lundi de Pentecôte",
        date: new Date(2025, 5, 9)
      },
      {
        libelle: "Vacances d'été",
        debut: new Date(2025, 6, 5),
        fin: new Date(2025, 7, 25)
      }
    ]
  };

  private apiUrl = 'https://date.nager.at/api/v3/publicholidays';
  protected holidays: any;
  protected selectedDay = new Date();
  protected currentTime = new Date();

  tasksByDay: { [key: string]: any[] } = {}; // Pour stocker les tâches par jour
  project: string = '';
  tache: string = '';
  description: string = '';
  salesOrderItem: string = '';
  heures: number = 0;

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null | undefined;

  constructor(private http: HttpClient) {
    this.updateDaysInMonth();

    setInterval(() => {
      this.currentTime = new Date();
    }, 60000);
  }

  ngOnInit(): void {
    this.loadHolidays();

    this.selectedDay = new Date();
  }

  getHolidays(year: number, country: string ): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + year + '/' + country);
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
    this.displayedMonth = subMonths(this.displayedMonth, 1);
    this.updateDaysInMonth();
  }

  nextMonth() {
    this.displayedMonth = addMonths(this.displayedMonth, 1);
    this.updateDaysInMonth();
  }

  previousDay() {
    this.selectedDay = subDays(this.selectedDay, 1);
  }

  nextDay() {
    this.selectedDay = addDays(this.selectedDay, 1);
  }

  isWeekend(day: Date): boolean {
    const dayOfWeek = day.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  }

  isHoliday(day: Date): boolean {
    return this.holidays.some((holiday: { date: string | number | Date , types: string[]}) => {
      return new Date(holiday.date).toDateString() === day.toDateString() && !holiday?.types.includes('Bank');
    });
  }

  isSchoolHoliday(day: Date): boolean {
    const year = day.getFullYear();
    const holidaysForYear = this.vacancesScolairesBelgique[year];

    if (!holidaysForYear) return false;

    return holidaysForYear.some((holiday: { date: Date | string | number; debut: Date | number; fin: Date | number }) => {

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

  isToday(day: Date): boolean {
    const today = new Date();
    return day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear();
  }

  selectDay(day: Date): void {
    this.selectedDay = day;
  }

  isSelected(day: Date): boolean {
    return this.selectedDay?.toDateString() === day.toDateString();
  }

  addTask(): void {
    if (!this.selectedDay) return;

    const dateKey = this.selectedDay.toDateString();
    if (!this.tasksByDay[dateKey]) {
      this.tasksByDay[dateKey] = [];
    }

    this.tasksByDay[dateKey].push({
      projet: this.project,
      tache: this.tache,
      description: this.description,
      salesOrderItem: this.salesOrderItem,
      heures: this.heures
    });

    this.project = '';
    this.tache = '';
    this.description = '';
    this.salesOrderItem = '';
    this.heures = 0;
  }

  exportToXLSX(): void {
    const data = [];

    data.push(['Date', 'Projet', 'Tâche', 'Description', 'Sales Order Item', 'Heures passées']);

    for (const dateKey in this.tasksByDay) {
      const tasks = this.tasksByDay[dateKey];
      tasks.forEach(task => {
        const date = new Date(dateKey);
        data.push([
          date,
          task.projet,
          task.tache,
          task.description,
          task.salesOrderItem,
          task.heures
        ]);
      });
    }

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = { Sheets: { 'Timesheet': ws }, SheetNames: ['Timesheet'] };
    XLSX.writeFile(wb, `timesheet-${this.displayedMonth.getFullYear()}-${this.displayedMonth.getMonth() + 1}.xlsx`);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
  },
  {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
  },
  {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
  },
  {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
  },
  {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
  },
  {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
  },
  {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
  },
  {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
  },
  {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`,
  },
  {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`,
  },
];
