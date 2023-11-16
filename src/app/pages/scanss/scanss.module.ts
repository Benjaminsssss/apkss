import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanssPageRoutingModule } from './scanss-routing.module';

import { ScanssPage } from './scanss.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanssPageRoutingModule
  ],
  declarations: [ScanssPage]
})
export class ScanssPageModule {}
