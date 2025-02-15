import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

//own modules

import { AuthenticationService } from 'src/app/services/auth.service';
import { AddPrinterComponent } from './../add-printer/add-printer.component';
import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { PrintersService } from 'src/app/services/printers.service';
import { Printer } from 'src/app/shared/models/data-model'

@Component({
  standalone: false,
  selector: 'cranix-printers',
  templateUrl: './printers.component.html',
  styleUrls: ['./printers.component.scss'],
})
export class PrintersComponent implements OnInit {
  selectedRoom;
  objectKeys: string[] = [];
  displayedColumns: string[] = ['name', 'model', 'deviceName', 'acceptingJobs', 'activeJobs', 'windowsDriver'];
  context;
  selection: Printer[] = [];
  selectedIds: number[] = [];

  constructor(
    public authService: AuthenticationService,
    public alertController: AlertController,
    public languageS: LanguageService,
    public modalCtrl: ModalController,
    public objectService: GenericObjectService,
    public popoverCtrl: PopoverController,
    public printersService: PrintersService,
    public route: Router,
    private storage: Storage
  ) {
    this.context = { componentParent: this };
    this.objectKeys = Object.getOwnPropertyNames(new Printer());
  }
  ngOnInit() {
    this.storage.get('PrintersComponent.displayedColumns').then((val) => {
      let myArray = JSON.parse(val);
      if (myArray) {
        this.displayedColumns = myArray.concat(['actions']);
      }
    });
    delete this.objectService.selectedObject;
  }

  redirectToDelete(printer: Printer) {
    this.objectService.deleteObjectDialog(printer, 'printer', '')
  }
  /**
 * Open the actions menu with the selected object ids.
 * @param ev
 */
  async openActions(ev: any, object: Printer) {
    if (object) {
      this.objectService.selectedIds.push(object.id)
      this.objectService.selection.push(object)
    } else {
      if (this.objectService.selection.length == 0) {
        this.objectService.selectObject();
        return;
      }
    }
    const popover = await this.popoverCtrl.create({
      component: ActionsComponent,
      event: ev,
      componentProps: {
        objectType: "printer",
        objectIds: this.objectService.selectedIds,
        selection: this.objectService.selection
      },
      animated: true,
      showBackdrop: true
    });
    (await popover).present();
  }

  async redirectToEdit(printer: Printer) {
    const modal = await this.modalCtrl.create({
      component: AddPrinterComponent,
      cssClass: "medium-modal",
      componentProps: {
        action: "modify",
        object: printer
      },
      animated: true,
      showBackdrop: true
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.authService.log("Object was created or modified", dataReturned.data)
      }
    });
    (await modal).present();
  }

  async addPrinter(ev: Event) {
    const modal = await this.modalCtrl.create({
      component: AddPrinterComponent,
      cssClass: 'medium-modal',
      componentProps: {
        action: 'queue'
      },
      animated: true,
      backdropDismiss: false
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.displayedColumns = dataReturned.data.concat(['actions']);
      }
    });
    (await modal).present().then((val) => {
      this.authService.log("most lett vegrehajtva.")
    })
  }

  async addDevice(ev: Event) {
    const modal = await this.modalCtrl.create({
      component: AddPrinterComponent,
      cssClass: 'medium-modal',
      componentProps: {
        action: 'add'
      },
      animated: true,
      backdropDismiss: false
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.displayedColumns = dataReturned.data.concat(['actions']);
      }
    });
    (await modal).present().then((val) => {
      this.authService.log("most lett vegrehajtva.")
    })
  }

  reset(id: number) {
    let subs = this.printersService.reset(id).subscribe(
      (val) => {
        this.objectService.responseMessage(val);
        if (val.code == "OK") {
          this.objectService.getAllObject('printer');
          this.modalCtrl.dismiss();
        }
      },
      (error) => {
        this.objectService.errorMessage("ServerError" + error);
        this.authService.log(error);
      },
      () => { subs.unsubscribe() }
    )
  }

  toggle(data, what: string, yesno: boolean) {
    let subs = this.printersService.toggle(data.id, what, yesno).subscribe(
      (val) => {
        this.objectService.responseMessage(val);
        this.objectService.getAllObject('printer');
      },
      (error) => {
        this.objectService.errorMessage("ServerError" + error);
        this.authService.log(error);
      },
      () => { subs.unsubscribe() }
    )
  }
}
