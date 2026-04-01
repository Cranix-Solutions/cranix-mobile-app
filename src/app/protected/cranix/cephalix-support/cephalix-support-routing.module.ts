import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CephalixSupportPage } from './cephalix-support.page';

const routes: Routes = [
  {
    path: '',
    component: CephalixSupportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CephalixSupportPageRoutingModule {}
