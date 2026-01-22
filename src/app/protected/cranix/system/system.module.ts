import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

//own modules
import { CranixSharedModule } from 'src/app/shared/cranix-shared.module';
import { SystemPage } from './system.page';
import { SystemStatusComponent }  from './status/system-status.component';
import { SystemConfigComponent }  from './config/system-config.component';
import { SystemAddonsComponent }  from './addons/system-addons.component';
import { SystemAclsComponent } from './acls/system-acls.component';
import { SystemServicesComponent } from './services/system-services.component';
import { ManageAclsComponent } from 'src/app/protected/cranix/system/acls/manage-acls/manage-acls.component';
import { MailserverComponent } from './mailserver/mailserver.component'


const routes: Routes = [
  {
    path: 'system',
    component: SystemPage,
    children: [
      {
        path: 'status',
        component:  SystemStatusComponent
      },
      {
        path: 'services',
        component: SystemServicesComponent
      },
      {
        path: 'config',
        component: SystemConfigComponent
      },
      {
        path: 'addons',
        component: SystemAddonsComponent
      },
      {
        path: 'acls',
        component: SystemAclsComponent
      },
      {
        path: 'mailserver',
        component: MailserverComponent
      },
      {
        path: '', pathMatch: 'full',
        redirectTo: 'status'
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
    MailserverComponent,
    ManageAclsComponent,
    SystemAclsComponent,
    SystemPage,
    SystemStatusComponent,
    SystemServicesComponent,
    SystemConfigComponent,
    SystemAddonsComponent,
    SystemAclsComponent]
})
export class SystemPageModule { }
