import { StorageService } from './../_services/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html'
})
export class HistoricComponent implements OnInit {
  historic = [];
  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.storageService.getHistoric().subscribe(res => {
      let temporaryHistoric = [];
      Object.keys(res).forEach(key => temporaryHistoric.push(res[key]));
      this.historic = temporaryHistoric;
      console.log(this.historic);
    });
  }

}
