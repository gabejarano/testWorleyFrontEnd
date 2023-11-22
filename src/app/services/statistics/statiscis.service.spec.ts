import { TestBed } from '@angular/core/testing';

import { StatiscisService } from './statiscis.service';

describe('StatiscisService', () => {
  let service: StatiscisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatiscisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
