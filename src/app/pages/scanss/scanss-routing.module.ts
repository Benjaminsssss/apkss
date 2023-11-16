import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanssPage } from './scanss.page';

const routes: Routes = [
  {
    path: '',
    component: ScanssPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanssPageRoutingModule {}
