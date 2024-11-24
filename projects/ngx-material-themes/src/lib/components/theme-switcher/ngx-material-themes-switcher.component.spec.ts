import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMaterialThemesSwitcherComponent } from './ngx-material-themes-switcher.component';

describe('ThemeSwitcherComponent', () => {
  let component: NgxMaterialThemesSwitcherComponent;
  let fixture: ComponentFixture<NgxMaterialThemesSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxMaterialThemesSwitcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxMaterialThemesSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
