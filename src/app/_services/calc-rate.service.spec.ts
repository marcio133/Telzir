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

  it('calcRate should return 0 on result and 38 on resultNoPlan ', inject([CalcRateService], (service: CalcRateService) => {
    const data = {
      duration: 20,
      plan: 'FaleMais 30',
      origin: '011',
      destiny: '016'
    };
    const finalResult = service.calcRate(data);

    expect(finalResult.result).toBe(0);
    expect(finalResult.resultNoPlan).toBe(38);
  }));
});
