import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCheckboxListComponent } from './note-checkbox-list.component';

describe('NoteCheckboxListComponent', () => {
  let component: NoteCheckboxListComponent;
  let fixture: ComponentFixture<NoteCheckboxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteCheckboxListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteCheckboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
