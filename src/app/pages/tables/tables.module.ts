import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbProgressBarModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbProgressBarModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  exports: [SmartTableComponent],
})
export class TablesModule { }
