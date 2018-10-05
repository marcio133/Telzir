import { CalcRateService } from './_services/calc-rate.service';
import { Component, OnInit } from '@angular/core';
import { ddds, plans } from './_utils/constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  ddds = ddds;
  plans = plans;
  form: FormGroup;
  result: number;
  resultNoPlan: number;
  constructor(private calcService: CalcRateService) { }

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
      this.result = this.calcService.calcRate(this.form.value).result;
      this.resultNoPlan = this.calcService.calcRate(this.form.value).resultNoPlan;
    }
  }
}
