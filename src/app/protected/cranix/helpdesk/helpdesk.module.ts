import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'
import { IonicModule } from '@ionic/angular';

import { CranixSharedModule } from 'src/app/shared/cranix-shared.module';
import { HelpdeskPageRoutingModule } from './helpdesk-routing.module';
import { HelpdeskPage } from './helpdesk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CranixSharedModule,
    HelpdeskPageRoutingModule,
    QuillModule.forRoot()
  ],
  declarations: [HelpdeskPage]
})
export class HelpdeskPageModule {}
