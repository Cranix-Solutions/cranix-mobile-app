import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'
import { IonicModule } from '@ionic/angular';

import { CranixSharedModule } from 'src/app/shared/cranix-shared.module';
import { CranixSupportPageRoutingModule } from './cranix-support-routing.module';
import { CranixSupportPage } from './cranix-support.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CranixSharedModule,
    CranixSupportPageRoutingModule,
    QuillModule.forRoot()
  ],
  declarations: [CranixSupportPage]
})
export class CranixSupportPageModule {}
