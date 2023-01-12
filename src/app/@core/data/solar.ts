import { Observable } from 'rxjs';

export abstract class SolarData {
  abstract getSolarData(): Observable<number>;
  abstract getBillingPeriodData(): Observable<any[]>;
}
