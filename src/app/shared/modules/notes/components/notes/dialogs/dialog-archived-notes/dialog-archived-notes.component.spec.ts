import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogArchivedNotesComponent } from './dialog-archived-notes.component';

describe('DialogAddNoteComponent', () => {
  let component: DialogArchivedNotesComponent;
  let fixture: ComponentFixture<DialogArchivedNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogArchivedNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogArchivedNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
