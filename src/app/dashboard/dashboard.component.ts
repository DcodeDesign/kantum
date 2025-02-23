import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NAVIGATION_ROUTES} from '../navigation-routes.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dashboardLinks = NAVIGATION_ROUTES;

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
