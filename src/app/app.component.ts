import { Component, OnInit } from '@angular/core';
import { ddds, plans } from './_utils/constants';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  ddds = ddds;
  plans = plans;
  form: FormGroup;

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      origin: new FormControl(null),
      destiny: new FormControl(),
      duration: new FormControl(),
      plan: new FormControl()
    });
  }
}
