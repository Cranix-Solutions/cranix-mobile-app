import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'
import { IonicModule } from '@ionic/angular';

import { CranixSharedModule } from 'src/app/shared/cranix-shared.module';
import { CephalixSupportPageRoutingModule } from './cephalix-support-routing.module';
import { CephalixSupportPage } from './cephalix-support.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CranixSharedModule,
    CephalixSupportPageRoutingModule,
    QuillModule.forRoot()
  ],
  declarations: [CephalixSupportPage]
})
export class CephalixSupportPageModule {}
