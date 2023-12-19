import { TestBed } from '@angular/core/testing';

import { ValoresFijosService } from './valores-fijos.service';

describe('ValoresFijosService', () => {
  let service: ValoresFijosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValoresFijosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
