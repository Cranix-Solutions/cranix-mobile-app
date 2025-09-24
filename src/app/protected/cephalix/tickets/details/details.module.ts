import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill'

import { DetailsPageRoutingModule } from './details-routing.module';
import { DetailsPage, EditArticle } from './details.page';
import { CranixSharedModule } from 'src/app/shared/cranix-shared.module';

@NgModule({
  imports: [
    CommonModule,
    CranixSharedModule,
    DetailsPageRoutingModule,
    QuillModule.forRoot()
  ],
  declarations: [DetailsPage, EditArticle],
  providers: []
})
export class DetailsPageModule { }
