import { Observable } from 'rxjs';
import { Time } from '../models/time';

export abstract class SmartTableData {
  abstract getBatteryData():  Observable<any[]>;
  abstract getCurrentTime(): Time;
}
