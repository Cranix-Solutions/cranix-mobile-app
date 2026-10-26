import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

//own modules
import { CranixSharedModule } from 'src/app/shared/cranix-shared.module';
import { CanActivateViaAcls } from 'src/app/services/auth-guard.service';
import { WebmailComponent } from './webmail.component';
import { MailListComponent } from './mail-list.component';
import { MailViewComponent } from './mail-view.component';
import { MailComposeComponent } from './mail-compose.component';

const routes: Routes = [
  {
    path: 'webmail',
    canActivate: [CanActivateViaAcls],
    component: WebmailComponent,
    children: [
      {
        path: 'inbox',
        component: MailListComponent
      },
      {
        path: 'compose',
        component: MailComposeComponent
      },
      {
        path: '', pathMatch: 'full',
        redirectTo: 'inbox'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CranixSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    WebmailComponent,
    MailListComponent,
    MailViewComponent,
    MailComposeComponent
  ]
})
export class WebmailModule { }
