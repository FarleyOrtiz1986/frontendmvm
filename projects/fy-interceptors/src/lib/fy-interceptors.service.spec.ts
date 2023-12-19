import { TestBed } from '@angular/core/testing';

import { FyInterceptorsService } from './fy-interceptors.service';

describe('FyInterceptorsService', () => {
  let service: FyInterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FyInterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
