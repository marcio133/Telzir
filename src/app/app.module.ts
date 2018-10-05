import { CalcRateService } from './_services/calc-rate.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { StorageService } from './_services/storage.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [CalcRateService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
