/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ProgressInfo} from '../../../@core/data/stats-progress-bar';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import { SolarService } from '../../../@core/mock/solar.service';
import { BatteryAction, BatteryData, BillPeriod } from '../../../@core/models/helper';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent implements OnInit{

  Battery_DATA: BatteryData[] = [];
  BillPeriod_DATA: BillPeriod[] = [];

  progressInfoData: ProgressInfo[];
  alive = true;

  action = '';
  liveBillingPeriod = '';
  liveCharginPerHour = 0;
  liveDisharginPerHour = 0;

  color = '#3DCC93';
  percentage = 0;
  arrayColor: any = [];
  totalPin = 12;
  pinColor = '#efefed';

  dataSource: BatteryData[];


  settings = {

    actions: {
      add: false,
      edit: false,
      delete: false,
      // position: 'right',
    },
    columns: {
      period: {
        title: 'Period',
        type: 'number',
      },
      action: {
        title: 'Action',
        type: 'string',
      },
      billingPeriod: {
        title: 'Billing Period',
        type: 'string',
      },
      stateofcharging: {
        title: 'Charging State',
        type: 'string',
      },
      charging: {
        title: 'Charging kWh',
        type: 'number',
      },
      discharging: {
        title: 'Discharging kWh',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private batteryService: SmartTableService,
    private billingPeriodService: SolarService,
    ) {

    this.dataSource = this.Battery_DATA;
    this.billingPeriodService
      .getBillingPeriodData()
      .subscribe((billingPeriodsData: any[]) => {
        this.BillPeriod_DATA = billingPeriodsData;
      });

  }

  // Load table information and battery information on initiation.
  ngOnInit(): void {

    this.batteryService.getBatteryData().subscribe((batteryData: any[]) => {

      this.dataSource = Array.from({ length: batteryData.length }, (_, k) =>
        this.createBatteryData(k, batteryData),
      );

      const promise = new Promise((resolve, reject) => {

        const time = this.batteryService.getCurrentTime();
        let currentBatteryPeriod = time.Hour * 2;
        if (time.Minute <= 30) {
          currentBatteryPeriod++;
        }
        if (time.Minute > 30) {
          currentBatteryPeriod = currentBatteryPeriod + 2;
        }

        const batteryPeriod = batteryData.find(
          (p) => p.Period === currentBatteryPeriod,
        );

        this.action = this.getDisplayText(
          batteryPeriod?.Action || 'Error Battery',
        );
        this.percentage = batteryPeriod?.['State-of-Charge'] || 0;
        this.liveBillingPeriod =
          this.dataSource.find((d) => Number(d.period) === currentBatteryPeriod)
            ?.billingPeriod || '';
        this.liveCharginPerHour =
          this.dataSource.find((d) => Number(d.period) === currentBatteryPeriod)
            ?.charging || 0;
        this.liveDisharginPerHour =
          this.dataSource.find((d) => Number(d.period) === currentBatteryPeriod)
            ?.discharging || 0;

        resolve([
          this.percentage,
          this.liveBillingPeriod,
          this.liveCharginPerHour,
          this.liveDisharginPerHour,
          this.dataSource,
        ]);
      });

      promise.then(
        () => {
          this.source.load(this.dataSource);
          this.renderArrayColor(this.percentage);
        },
      );
    });

  }

  // Manipulate battery information.
  createBatteryData(id: number, dataB: any[]): BatteryData {
    return {
      action: dataB[id]?.Action,
      period: dataB[id]?.Period,
      billingPeriod:
        this.BillPeriod_DATA.find((p) => p.period === dataB[id]?.Period)?.time ||
        '',
      stateofcharging: dataB[id]?.['State-of-Charge'],
      charging: dataB[id]?.['Charged-kwH'],
      discharging: dataB[id]?.['Discharged-kwH'],
    };
  }

  // Battery status display text.
  getDisplayText(text: string): string {
    switch (text) {
      case 'CHARGE': {
        return BatteryAction.CHARGE;
      }
      case 'NONE': {
        return BatteryAction.NONE;
      }
      case 'DISCHARGE': {
        return BatteryAction.DISCHARGE;
      }
      default: {
        return '';
      }
    }
  }

  // Battery cell making method.
  renderArrayColor(chargepercentage: number): any[] {
    const part = 100 / this.totalPin;
    let currentLevel = 0 + part;
    for (let i = 0; i < this.totalPin; i++) {
      if (chargepercentage >= currentLevel) {
        this.arrayColor.push({ full: true, color: this.color, width: '7px' });
        currentLevel += part;
      } else {
        const newWidth = ((chargepercentage - currentLevel + part) * 7) / 20;
        this.arrayColor.push({
          full: false,
          color: this.pinColor,
          width: newWidth + 'px',
        });
        for (let j = i + 1; j < this.totalPin; j++) {
          this.arrayColor.push({
            full: true,
            color: this.pinColor,
            width: '7px',
          });
        }
        break;
      }
    }
    return this.arrayColor;
  }

}
