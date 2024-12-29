import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionCheckboxListComponent } from './collection-checkbox-list.component';

describe('CollectionCheckboxListComponent', () => {
  let component: CollectionCheckboxListComponent;
  let fixture: ComponentFixture<CollectionCheckboxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionCheckboxListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionCheckboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
