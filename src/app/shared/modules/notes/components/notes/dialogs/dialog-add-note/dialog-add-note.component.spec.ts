import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddNoteComponent } from './dialog-add-note.component';

describe('DialogAddNoteComponent', () => {
  let component: DialogAddNoteComponent;
  let fixture: ComponentFixture<DialogAddNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
