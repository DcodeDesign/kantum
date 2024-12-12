import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnChanges {
  @ViewChild('drawer', {static: true}) drawer: MatDrawer | undefined;
  @Input() toggleSideNav = false;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['toggleSideNav']) {
      this.drawer?.toggle()
    }
  }
}
