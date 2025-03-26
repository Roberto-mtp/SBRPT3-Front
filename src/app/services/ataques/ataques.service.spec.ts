import { TestBed } from '@angular/core/testing';

import { AtaquesService } from './ataques.service';

describe('AtaquesService', () => {
  let service: AtaquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtaquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
