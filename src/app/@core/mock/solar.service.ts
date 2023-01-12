import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of as observableOf,  Observable } from 'rxjs';
import { SolarData } from '../data/solar';

@Injectable()
export class SolarService extends SolarData {
  private value = 42;

  private _jsonURL = 'assets/billing_periods.json';

  constructor(private http: HttpClient) {
    super();
  }

  // Returns billing period data from json file.
  getBillingPeriodData(): Observable<any[]> {
    return this.http.get<any[]>(this._jsonURL);
  }

  getSolarData(): Observable<number> {
    return observableOf(this.value);
  }
}
