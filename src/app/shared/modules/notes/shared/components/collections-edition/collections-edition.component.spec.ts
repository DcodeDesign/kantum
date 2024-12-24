import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsEditionComponent } from './collections-edition.component';

describe('CollectionsEditionComponent', () => {
  let component: CollectionsEditionComponent;
  let fixture: ComponentFixture<CollectionsEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionsEditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionsEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
