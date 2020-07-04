import { Injectable } from '@angular/core';
import { plans_min, rates } from '../_utils/constants';
import { StorageService } from './storage.service';
import { Call, Simulation } from '../_utils/models';

@Injectable()
export class CalcRateService {
  plans_min = plans_min;
  rates = rates;
  constructor( private storageService: StorageService) {}

  calcRate(call: Call): Simulation {
    const result =
      (call.duration - this.plans_min[call.plan]) *
      this.rates[`${call.origin}-${call.destiny}`] *
      1.1;

    const resultNoPlan = call.duration * this.rates[`${call.origin}-${call.destiny}`];
    const simulation = {
      result: result > 0 ? result : 0,
      resultNoPlan
    };
    this.saveResult(simulation, call);

    return simulation;
  }

  saveResult(simulation: Simulation, call: Call): void {
    const date = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
    const request = {
      ...simulation,
      ...call,
      date
    };
    this.storageService.saveQuery(request).subscribe(() => {
    });
  }
}
