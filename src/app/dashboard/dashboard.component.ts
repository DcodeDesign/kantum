import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dashboardLinks = [
    { title: 'Notes', description: 'Prise de notes', textIcon :"N" ,icon: 'history_edu', route: 'notes' },
    { title: 'Timesheets', description: 'Gestion de timesheet', textIcon :"T" ,icon: 'hourglass_empty', route: 'timesheet' },
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
