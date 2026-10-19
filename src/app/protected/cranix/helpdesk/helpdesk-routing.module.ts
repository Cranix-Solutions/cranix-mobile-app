import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpdeskPage } from './helpdesk.page';

const routes: Routes = [
  {
    path: 'helpdesk',
    component: HelpdeskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpdeskPageRoutingModule {}
