/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { SmartTableData } from '../data/smart-table';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Time } from '../models/time';


@Injectable()
export class SmartTableService extends SmartTableData {

  private _jsonURL = 'assets/battery_data.json';

  constructor(private http: HttpClient) {
    super();
  }

  getBatteryData(): Observable<any[]> {
    return this.http.get<any[]>(this._jsonURL);
  }

  // method return current time in hours and minutes.
  getCurrentTime(): Time {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();

    return { Hour: hour, Minute: minute};
  }

}
