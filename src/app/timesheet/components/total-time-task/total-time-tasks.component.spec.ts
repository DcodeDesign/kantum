import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalTimeTasksComponent } from './total-time-tasks.component';

describe('TotalTimeTaskComponent', () => {
  let component: TotalTimeTasksComponent;
  let fixture: ComponentFixture<TotalTimeTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalTimeTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalTimeTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
