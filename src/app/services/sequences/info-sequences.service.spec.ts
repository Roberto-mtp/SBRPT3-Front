import { TestBed } from '@angular/core/testing';

import { InfoSequencesService } from './info-sequences.service';

describe('InfoSequencesService', () => {
  let service: InfoSequencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoSequencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
