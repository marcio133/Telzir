import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricComponent } from './historic.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from '../_services/storage.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { DataTableModule } from 'angular5-data-table';

describe('HistoricComponent', () => {
  let component: HistoricComponent;
  let fixture: ComponentFixture<HistoricComponent>;

  @Injectable()
  class StubStorageService {
      public getHistoric() {
        return Observable.from([ ['item1', 'item2', 'item3'] ]);
      }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricComponent ],
      imports: [BrowserModule, HttpClientModule, DataTableModule.forRoot()],
      providers: [{ provide: StorageService, useClass: StubStorageService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getData on ngOnInit', () => {
    var spy = spyOn(component, 'getData');

    component.ngOnInit();

    expect(component.getData).toHaveBeenCalled();
  });

  it('historic must not be empty after getData() have been called', () => {
    component.getData();

    expect(component.historic.length).toBe(3);
  });
});
