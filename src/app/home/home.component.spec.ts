import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { CalcRateService } from "../_services/calc-rate.service";
import { StorageService } from "../_services/storage.service";
import { HttpClientModule } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let storageService: StorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
      providers: [CalcRateService, StorageService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    storageService = TestBed.get(StorageService);
  });

  it("expect form to be defined after ngOnInit", () => {
    component.ngOnInit();

    expect(component.form).toBeDefined();
  });

  it("should return error message onSubmit when both ddds are equals", () => {
    component.form.get("origin").setValue("011");
    component.form.get("destiny").setValue("011");

    component.onSubmit();

    expect(component.errorMessage).not.toBeNull();
    expect(component.errorMessage).toBeDefined();
  });

  it("result and resultNoPlan should be defined on onSubmit when ddds are diferents", () => {
    component.form.patchValue({
      origin: '011',
      destiny: '016',
      plan: 'FaleMais30',
      duration: '30'
    });

    component.onSubmit();

    expect(component.result).toBeDefined();
    expect(component.resultNoPlan).toBeDefined();
  });

  it("storageService.saveQuery must be called on onSubmit when ddds are diferents", () => {
    spyOn(storageService, 'saveQuery').and.returnValue(Observable.from([ 'teste' ]));
    component.form.patchValue({
      origin: '011',
      destiny: '016',
      plan: 'FaleMais30',
      duration: '30'
    });

    component.onSubmit();

    expect(storageService.saveQuery).toHaveBeenCalled();
  });
});
