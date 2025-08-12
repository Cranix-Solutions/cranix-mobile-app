import { ActionBTNRenderer } from 'src/app/pipes/ag-action-renderer';
import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { AddDeviceComponent } from 'src/app/protected/cranix/devices/add-device/add-device.component';
import { AddPrinterComponent } from 'src/app/protected/cranix/devices/add-printer/add-printer.component';
import { AgChartsModule } from 'ag-charts-angular';
import { AgGridModule } from 'ag-grid-angular';
import { ApplyBTNRenderer } from 'src/app/pipes/ag-apply-renderer';
import { ApplyCheckBoxBTNRenderer } from 'src/app/pipes/ag-apply-checkbox-renderer';
import { CanActivateViaAcls } from '../services/auth-guard.service';
import { CheckBoxBTNRenderer } from 'src/app/pipes/ag-checkbox-renderer';
import { CommonModule } from '@angular/common';
import { CranixListComponent } from 'src/app/shared/cranix-list/cranix-list.component'
import { CranixMdListComponent } from 'src/app/shared/cranix-md-list/cranix-md-list.component'
import { CranixNoticesComponent } from './cranix-notices/cranix-notices.component';
import { CranixPtmViewComponent } from 'src/app/shared/cranix-ptm-view/cranix-ptm-view.component'
import { CranixSearchComponent } from './cranix-search/cranix-search.component';
import { CranixSearchListComponent } from './cranix-search/cranix-search-list.component';
import { CranixToolbarComponent } from './cranix-toolbar/cranix-toolbar.component';
import { CreateSupport } from 'src/app/shared/actions/create-support/create-support-page';
import { CustomerActionRenderer } from 'src/app/pipes/ag-customer-action-renderer';
import { DateCellRenderer } from 'src/app/pipes/ag-date-renderer';
import { DateTimeCellRenderer } from 'src/app/pipes/ag-datetime-renderer';
import { DeviceActionBTNRenderer } from 'src/app/pipes/ag-device-renderer';
import { DeviceIdCellRenderer } from 'src/app/pipes/ag-deviceid-renderer';
import { DownloadSoftwaresComponent } from 'src/app/shared/actions/download-softwares/download-softwares.component'
import { EditBTNRenderer } from 'src/app/pipes/ag-edit-renderer';
import { EventRenderer } from 'src/app/pipes/ag-ptm-event-renderer';
import { FileSystemUsageRenderer } from 'src/app/pipes/ag-filesystem-usage-renderer';
import { FilesCollectComponent } from 'src/app/shared/actions/files-collect/files-collect.component'
import { FilesUploadComponent } from 'src/app/shared/actions/files-upload/files-upload.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupActionBTNRenderer } from 'src/app/pipes/ag-group-renderer';
import { GroupIdCellRenderer } from 'src/app/pipes/ag-groupid-renderer';
import { GroupMembersPage } from 'src/app/shared/actions/group-members/group-members.page';
import { HwconfIdCellRenderer } from 'src/app/pipes/ag-hwconfid-renderer';
import { InstituteActionCellRenderer } from 'src/app/pipes/ag-institute-action-renderer';
import { InstituteStatusRenderer } from 'src/app/pipes/ag-institute-status-renderer'
import { IonicModule } from '@ionic/angular';
import { ManageDhcpComponent } from 'src/app/shared/actions/manage-dhcp/manage-dhcp.component'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { PipesModule } from 'src/app/pipes/pipe-modules';
import { PrinterActionBTNRenderer } from 'src/app/pipes/ag-printer-renderer';
import { QuillModule } from 'ngx-quill';
import { RoomActionBTNRenderer } from 'src/app/pipes/ag-room-renderer';
import { RoomIdCellRenderer } from 'src/app/pipes/ag-roomid-render';
import { RoomRenderer } from 'src/app/pipes/ag-ptm-room-renderer';
import { SelectColumnsComponent } from 'src/app/shared/select-columns/select-columns.component';
import { SetContractComponent } from 'src/app/shared/actions/set-contract/set-contract.component'
import { SetValidityComponent } from 'src/app/shared/actions/set-validity/set-validity.component'
import { SetpasswordComponent } from 'src/app/shared/actions/setpassword/setpassword.component'
import { SetquotaComponent } from 'src/app/shared/actions/setquota/setquota.component';
import { ShowImportComponent } from 'src/app/shared/actions/show-import/show-import.component'
import { SoftwareEditBTNRenderer } from 'src/app/pipes/ag-software-edit-renderer';
import { TranslateModule } from '@ngx-translate/core';
import { UpdateRenderer } from 'src/app/pipes/ag-update-renderer';
import { UserActionBTNRenderer } from 'src/app/pipes/ag-user-renderer';
import { UserIdCellRenderer } from 'src/app/pipes/ag-userid-renderer';
import { UserIdToNameCellRenderer } from 'src/app/pipes/ag-userid-to-name-renderer';
import { WindowRef } from 'src/app/shared/models/ohters'
import { YesNoBTNRenderer } from 'src/app/pipes/ag-yesno-renderer';
import { simpleToolbarOptions } from 'src/app/shared/models/constants'

@NgModule({
  declarations: [
    ActionBTNRenderer,
    ActionsComponent,
    AddDeviceComponent,
    AddPrinterComponent,
    ApplyBTNRenderer,
    ApplyCheckBoxBTNRenderer,
    CheckBoxBTNRenderer,
    CranixListComponent,
    CranixMdListComponent,
    CranixNoticesComponent,
    CranixPtmViewComponent,
    CranixSearchComponent,
    CranixSearchListComponent,
    CranixToolbarComponent,
    CreateSupport,
    CustomerActionRenderer,
    DateCellRenderer,
    DateTimeCellRenderer,
    DeviceActionBTNRenderer,
    DeviceIdCellRenderer,
    DownloadSoftwaresComponent,
    EditBTNRenderer,
    EventRenderer,
    FileSystemUsageRenderer,
    FilesCollectComponent,
    FilesUploadComponent,
    GroupActionBTNRenderer,
    GroupIdCellRenderer,
    GroupMembersPage,
    HwconfIdCellRenderer,
    InstituteActionCellRenderer,
    InstituteStatusRenderer,
    ManageDhcpComponent,
    ObjectsEditComponent,
    PrinterActionBTNRenderer,
    RoomActionBTNRenderer,
    RoomIdCellRenderer,
    RoomRenderer,
    SelectColumnsComponent,
    SetContractComponent,
    SetValidityComponent,
    SetpasswordComponent,
    SetquotaComponent,
    ShowImportComponent,
    SoftwareEditBTNRenderer,
    UpdateRenderer,
    UserActionBTNRenderer,
    UserIdCellRenderer,
    UserIdToNameCellRenderer,
    YesNoBTNRenderer,
  ],
  imports: [
    AgChartsModule,
    AgGridModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    PipesModule,
    QuillModule.forRoot({ modules: { toolbar: simpleToolbarOptions}, }),
    ReactiveFormsModule,
    TranslateModule,
  ], exports: [
    AgChartsModule,
    AgGridModule,
    CommonModule,
    CranixListComponent,
    CranixMdListComponent,
    CranixNoticesComponent,
    CranixPtmViewComponent,
    CranixSearchComponent,
    CranixSearchListComponent,
    CranixToolbarComponent,
    FormsModule,
    IonicModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    PipesModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [WindowRef,CanActivateViaAcls ]
})
export class CranixSharedModule { }
