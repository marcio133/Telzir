import { Injectable } from '@angular/core';
import { plans_min, rates } from '../_utils/constants';

@Injectable()
export class CalcRateService {
  plans_min = plans_min;
  rates = rates;
  constructor() { }

  calcRate(data: any) {
    const result = (data.duration - this.plans_min[data.plan]) * this.rates[`${data.origin}-${data.destiny}`];
    if (result > 0) {
      return result;
    } else {
      return 0;
    }
  }
}
