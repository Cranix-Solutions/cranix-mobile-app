import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { QuillModule } from 'ngx-quill';

//own modules
import { CanActivateViaAcls } from 'src/app/services/auth-guard.service';
import { CranixSharedModule } from 'src/app/shared/cranix-shared.module';
import { TicketsPage } from './tickets.page';
import { DetailsPage } from './details/details.page';

const routes: Routes = [
  {
    path: 'tickets',
    canActivate: [CanActivateViaAcls],
    component: TicketsPage
  },
  {
    path: 'tickets/:id',
    canActivate: [CanActivateViaAcls],
    component: DetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
    CranixSharedModule,
    QuillModule.forRoot()
  ],
  declarations: [TicketsPage, DetailsPage]
})
export class TicketsPageModule {}
