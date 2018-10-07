import { CalcRateService } from '../_services/calc-rate.service';
import { Component, OnInit } from '@angular/core';
import { ddds, plans, rates } from '../_utils/constants';
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
  homeMessage = 'Vamos te ajudar a calcular suas despesas.';
  rates = rates;
  loading = false;
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
    this.loading = true;
    if (this.form.get('origin').value !== this.form.get('destiny').value) {
      const resultService = this.calcService.calcRate(this.form.value);
      const data = this.form.value;
      data.date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
      if (this.rates[`${this.form.get('origin').value}-${this.form.get('destiny').value}`]) {
        data.price = Math.round(resultService.result * 100) / 100 ;
        data.normalPrice = Math.round(resultService.resultNoPlan * 100) / 100;
        this.result = data.price;
        this.resultNoPlan = data.normalPrice;
      } else {
        this.result = undefined;
        this.resultNoPlan = undefined;
        data.price = undefined;
        data.normalPrice = undefined;
        this.homeMessage = 'Opa, parece que não podemos fazer essa consulta.';
      }
      this.storageService.saveQuery(data).subscribe(res => {
      });
    } else {
      this.errorMessage = 'Os ddds de origem e destino precisam ser diferentes.';
    }
    document.getElementById('result').scrollIntoView();
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

}
