import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

//own modules
import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { CephalixService } from 'src/app/services/cephalix.service';
import { LanguageService } from 'src/app/services/language.service';
import { SelectColumnsComponent } from 'src/app/shared/select-columns/select-columns.component';
import { InstituteStatus } from 'src/app/shared/models/cephalix-data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
@Component({
  standalone: false,
  selector: 'cranix-institutes-status',
  templateUrl: './institutes-status.component.html',
  styleUrls: ['./institutes-status.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstitutesStatusComponent implements OnInit {
  objectKeys: string[] = [];
  displayedColumns: string[] = ['cephalixInstituteId', 'created', 'uptime', 'version', 'lastUpdate', 'availableUpdates', 'errorMessages', 'rootUsage', 'srvUsage', 'homeUsage', 'runningKernel', 'installedKernel'];
  sortableColumns: string[] = ['cephalixInstituteId', 'created', 'uptime', 'version', 'lastUpdate', 'availableUpdates', 'errorMessages', 'rootUsage', 'srvUsage', 'homeUsage', 'runningKernel', 'installedKernel'];
  columnDefs = [];
  defaultColDef = {};
  gridApi: GridApi;
  rowSelection;
  context;
  title = 'app';
  rowData = [];
  objectIds: number[] = [];
  now: number = 0;
  selectedStatus: InstituteStatus = null;
  disabled: boolean = false;

  constructor(
    public authService: AuthenticationService,
    public cephalixService: CephalixService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    public route: Router,
    private storage: Storage
  ) {
    this.context = { componentParent: this };
    this.objectKeys = Object.getOwnPropertyNames(new InstituteStatus());
  }

  ngOnInit() {
    this.now = new Date().getTime();
    this.storage.get('InstitutesStatusComponent.displayedColumns').then((val) => {
      let myArray = JSON.parse(val);
      if (myArray) {
        this.displayedColumns = myArray;
      }
    });
  }
  ionViewWillEnter() {
    this.authService.log('WillEnter EVENT')
    let subs = this.cephalixService.getStatusOfInstitutes().subscribe({
      next: (val) => {
        val.sort((status1: InstituteStatus, status2: InstituteStatus) => {
          let i1 = this.objectService.getObjectById('institute', status1.cephalixInstituteId)
          let i2 = this.objectService.getObjectById('institute', status2.cephalixInstituteId)
          return i1.name.toUpperCase() < i2.name.toUpperCase() ? -1 : 1
        });
        this.rowData = val;
      },
      error: (err) => { this.authService.log(err) },
      complete: () => { subs.unsubscribe() }
    })
  }
  
  errorStatus(status: InstituteStatus) {
    if (status.errorMessages) {
      return "danger";
    }
    return "success"
  }

  fileSystemError(fs: string) {
    if (!fs) {
      return false
    }
    let result = fs.split(" ");
    if (result) {
      if (Number(result[1].replace('%', '')) > 80) {
        return true
      }
      else if (Number(result[2].replace('%', '')) > 80) {
        return true
      }
    }
    return false
  }
  fsStatus(status: InstituteStatus) {
    if (this.fileSystemError(status.rootUsage) ||
      this.fileSystemError(status.srvUsage) ||
      this.fileSystemError(status.homeUsage)) {
      return "danger"
    }
    return "success"
  }

  connectStatus(status: InstituteStatus) {
    if (this.now - status.created > 36000000) {
      return "danger"
    }
    return "success"
  }
  showStatus(status: InstituteStatus) {
    this.selectedStatus = status;
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }
  headerHeightSetter() {
    var padding = 20;
    var height = headerHeightGetter() + padding;
    this.gridApi.setGridOption('headerHeight',height);
  }
  onQuickFilterChanged(quickFilter) {
    this.gridApi.setGridOption('quickFilterText', (<HTMLInputElement>document.getElementById(quickFilter)).value);
  }

  //TODO RESPONSE
  public redirectToUpdate = (cephalixInstituteId: number) => {
    let sub = this.cephalixService.updateById(cephalixInstituteId).subscribe({
      next: (val) => { this.authService.log(val) },
      error: (error) => { this.authService.log(error) },
      complete: () => { sub.unsubscribe(); }
    });
  }
  /**
 * Open the actions menu with the selected object ids.
 * @param ev
 */
  async openActions(ev: any) {
    if (this.gridApi.getSelectedRows().length > 0) {
      for (let i = 0; i < this.gridApi.getSelectedRows().length; i++) {
        this.objectIds.push(this.gridApi.getSelectedRows()[i].id);
      }
    }
    const popover = await this.popoverCtrl.create({
      component: ActionsComponent,
      event: ev,
      componentProps: {
        objectType: "sync-object",
        objectIds: this.objectIds,
        selection: this.gridApi.getSelectedRows(),
        gridApi: this.gridApi
      },
      animated: true,
      showBackdrop: true
    });
    (await popover).present();
  }
  redirectToEdit(status: InstituteStatus) {
    this.objectService.selectedObject = this.objectService.getObjectById("institute", status.cephalixInstituteId);
    this.route.navigate([`/pages/cephalix/institutes/${status.cephalixInstituteId}`]);
  }

  /**
  * Function to Select the columns to show
  * @param ev
  */
  async openCollums(ev: any) {
    const modal = await this.modalCtrl.create({
      component: SelectColumnsComponent,
      componentProps: {
        columns: this.objectKeys,
        selected: this.displayedColumns,
        objectPath: "InstitutesStatusComponent.displayedColumns"
      },
      animated: true,
      backdropDismiss: false
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.createColumnDefs();
      }
    });
    (await modal).present().then((val) => {
      this.authService.log("most lett vegrehajtva.")
    })
  }

  sortStatus(status1: InstituteStatus, status2: InstituteStatus) {
    console.log(status1, status2)
    if (status1 && status2) {
      let i1 = this.objectService.getObjectById('institute', status1.cephalixInstituteId)
      let i2 = this.objectService.getObjectById('institute', status2.cephalixInstituteId)
      return i1.name < i2.name ? 1 : -1
    }
    return 0
  }
}

function headerHeightGetter() {
  var columnHeaderTexts = document.querySelectorAll('.ag-header-cell-text');

  var columnHeaderTextsArray = [];

  columnHeaderTexts.forEach(node => columnHeaderTextsArray.push(node));

  var clientHeights = columnHeaderTextsArray.map(
    headerText => headerText.clientHeight
  );
  var tallestHeaderTextHeight = Math.max(...clientHeights);
  return tallestHeaderTextHeight;
}
