import { Component, OnInit } from '@angular/core';
import {NgxMaterialThemesService} from '../../services/ngx-material-themes.service';

@Component({
  selector: 'ngx-theme-switcher',
  templateUrl: './ngx-material-themes-switcher.component.html',
  styleUrls: ['./ngx-material-themes-switcher.component.scss']
})
export class NgxMaterialThemesSwitcherComponent implements OnInit {
  isDarkMode = false;

  constructor(private themeService: NgxMaterialThemesService) {}

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
  }
}
