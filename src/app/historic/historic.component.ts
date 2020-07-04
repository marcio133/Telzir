import { StorageService } from './../_services/storage.service';
import { Component, OnInit } from '@angular/core';
import { HistoricData } from '../_utils/models';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
})
export class HistoricComponent implements OnInit {
  historic: HistoricData[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.storageService.getHistoric().subscribe(res => {
      const temporaryHistoric = [];
      Object.keys(res).forEach(key => temporaryHistoric.push(res[key]));
      this.historic = temporaryHistoric;
      console.log(this.historic);
    });
  }
}
