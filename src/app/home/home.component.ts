import { CalcRateService } from '../_services/calc-rate.service';
import { Component, OnInit } from '@angular/core';
import { ddds, plans } from '../_utils/constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ddds = ddds;
  plans = plans;
  form: FormGroup;
  result: number;
  resultNoPlan: number;
  errorMessage: string = null;
  constructor(private calcService: CalcRateService, private storageService: StorageService) { }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      origin: new FormControl(null, Validators.required),
      destiny: new FormControl(null, Validators.required),
      duration: new FormControl(null, Validators.compose(
        [Validators.min(1), Validators.required])),
      plan: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.form.get('origin').value !== this.form.get('destiny').value) {
      const resultService = this.calcService.calcRate(this.form.value);
      this.result = Math.round(resultService.result * 100) / 100 ;
      this.resultNoPlan = Math.round(resultService.resultNoPlan * 100) / 100;
      const data = this.form.value;
      data.date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
      data.price = this.result;
      data.normalPrice = this.resultNoPlan;
      this.storageService.saveQuery(data).subscribe(res => {
        console.log(res);
      });
    } else {
      this.errorMessage = 'Os ddds de origem e destino precisam ser diferentes.';
    }
  }

}
