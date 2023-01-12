/* eslint-disable @typescript-eslint/naming-convention */
export enum BatteryAction {
    CHARGE = 'Charging',
    NONE = 'Not Charging',
    DISCHARGE = 'Discharging',
  }
  export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
  }

  export interface BillPeriod {
    period: number;
    time: string;
  }

  export interface BatteryData {
    period: string;
    action: string;
    billingPeriod: string;
    stateofcharging: number;
    charging: number;
    discharging: number;
  }
