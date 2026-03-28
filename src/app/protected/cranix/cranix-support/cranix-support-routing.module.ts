import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CranixSupportPage } from './cranix-support.page';

const routes: Routes = [
  {
    path: '',
    component: CranixSupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CranixSupportPageRoutingModule {}
