import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavNotesComponent } from './side-nav-notes.component';

describe('SideNavNotesComponent', () => {
  let component: SideNavNotesComponent;
  let fixture: ComponentFixture<SideNavNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideNavNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
