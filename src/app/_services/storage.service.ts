import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HistoricData } from '../_utils/models';

@Injectable()
export class StorageService {

  constructor(private httpClient: HttpClient) { }

  saveQuery(data: HistoricData) {
    return this.httpClient.post('https://bliivetell.firebaseio.com/query.json', data);
  }

  getHistoric() {
    return this.httpClient.get('https://bliivetell.firebaseio.com/query.json');
  }

}
