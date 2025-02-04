import { TestBed } from '@angular/core/testing';

import { TimesheetDialogService } from './timesheet-dialog.service';

describe('TimesheetDialogService', () => {
  let service: TimesheetDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesheetDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
