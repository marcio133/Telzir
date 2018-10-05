import { TestBed, inject } from '@angular/core/testing';

import { CalcRateService } from './calc-rate.service';

describe('CalcRateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalcRateService]
    });
  });

  it('should be created', inject([CalcRateService], (service: CalcRateService) => {
    expect(service).toBeTruthy();
  }));
});
