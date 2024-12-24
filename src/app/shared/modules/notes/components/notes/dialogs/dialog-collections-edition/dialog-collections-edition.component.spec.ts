import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCollectionsEditionComponent } from './dialog-collections-edition.component';

describe('DialogCollectionsEditionComponent', () => {
  let component: DialogCollectionsEditionComponent;
  let fixture: ComponentFixture<DialogCollectionsEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCollectionsEditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCollectionsEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
