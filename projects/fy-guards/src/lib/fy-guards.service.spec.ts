import { TestBed } from '@angular/core/testing';

import { FyGuardsService } from './fy-guards.service';

describe('FyGuardsService', () => {
  let service: FyGuardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FyGuardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
