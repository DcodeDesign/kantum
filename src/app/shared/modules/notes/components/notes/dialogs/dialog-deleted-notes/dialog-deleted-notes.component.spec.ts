import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeletedNotesComponent } from './dialog-deleted-notes.component';

describe('DialogAddNoteComponent', () => {
  let component: DialogDeletedNotesComponent;
  let fixture: ComponentFixture<DialogDeletedNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDeletedNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeletedNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
