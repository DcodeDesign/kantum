import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangedCollectionNotesComponent } from './dialog-changed-collection-notes.component';

describe('DialogAddNoteComponent', () => {
  let component: DialogChangedCollectionNotesComponent;
  let fixture: ComponentFixture<DialogChangedCollectionNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogChangedCollectionNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogChangedCollectionNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
