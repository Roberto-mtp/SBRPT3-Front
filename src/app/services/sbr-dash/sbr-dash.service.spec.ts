import { TestBed } from '@angular/core/testing';

import { SbrDashService } from './sbr-dash.service';

describe('SbrDashService', () => {
  let service: SbrDashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SbrDashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
