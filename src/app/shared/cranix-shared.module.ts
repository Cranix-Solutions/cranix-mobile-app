import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgChartsModule } from 'ag-charts-angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolbarComponent } from 'src/app/protected/toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { 
  IonicSelectableComponent,
  IonicSelectableHeaderTemplateDirective,
  IonicSelectableValueTemplateDirective,
  IonicSelectablePlaceholderTemplateDirective
 } from 'ionic-selectable'

import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipe-modules';
import { GroupMembersPage } from 'src/app/shared/actions/group-members/group-members.page';
import { CanActivateViaAcls } from '../services/auth-guard.service';
import { AddDeviceComponent } from 'src/app/protected/cranix/devices/add-device/add-device.component';
import { AddPrinterComponent } from 'src/app/protected/cranix/devices/add-printer/add-printer.component';
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { CreateSupport } from 'src/app/shared/actions/create-support/create-support-page';
import { SetpasswordComponent } from 'src/app/shared/actions/setpassword/setpassword.component'
import { SetquotaComponent } from 'src/app/shared/actions/setquota/setquota.component';
import { ManageDhcpComponent } from 'src/app/shared/actions/manage-dhcp/manage-dhcp.component'
import { FilesUploadComponent } from 'src/app/shared/actions/files-upload/files-upload.component'
import { FilesCollectComponent } from 'src/app/shared/actions/files-collect/files-collect.component'
import { DownloadSoftwaresComponent } from 'src/app/shared/actions/download-softwares/download-softwares.component'
import { SetContractComponent } from 'src/app/shared/actions/set-contract/set-contract.component'
import { SetValidityComponent } from 'src/app/shared/actions/set-validity/set-validity.component'
import { ShowImportComponent } from 'src/app/shared/actions/show-import/show-import.component'
import { WindowRef } from 'src/app/shared/models/ohters'
import { CranixMdListComponent } from 'src/app/shared/cranix-md-list/cranix-md-list.component'
import { CranixPtmViewComponent } from 'src/app/shared/cranix-ptm-view/cranix-ptm-view.component'
import { QuillModule } from 'ngx-quill';
import { simpleToolbarOptions } from 'src/app/shared/models/constants'

@NgModule({
  declarations: [
    ActionsComponent,
    AddDeviceComponent,
    AddPrinterComponent,
    CreateSupport,
    CranixMdListComponent,
    CranixPtmViewComponent,
    ObjectsEditComponent,
    DownloadSoftwaresComponent,
    FilesCollectComponent,
    FilesUploadComponent,
    GroupMembersPage,
    ManageDhcpComponent,
    SetpasswordComponent,
    SetquotaComponent,
    ShowImportComponent,
    SetContractComponent,
    SetValidityComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    AgChartsModule,
    IonicSelectableComponent,
    IonicSelectableHeaderTemplateDirective,
    IonicSelectableValueTemplateDirective,
    IonicSelectablePlaceholderTemplateDirective,
    FormsModule,
    IonicModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    PipesModule,
    TranslateModule,
    QuillModule.forRoot({
      modules: { toolbar: simpleToolbarOptions},
    }),
  ], exports: [
    CommonModule,
    AgChartsModule,
    FormsModule,
    IonicModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    PipesModule,
    ReactiveFormsModule,
    TranslateModule,
    ToolbarComponent,
    CranixMdListComponent,
    CranixPtmViewComponent,
    IonicSelectableComponent,
    IonicSelectableHeaderTemplateDirective,
    IonicSelectableValueTemplateDirective,
    IonicSelectablePlaceholderTemplateDirective
  ],
  providers: [WindowRef,CanActivateViaAcls ]
})
export class CranixSharedModule { }
