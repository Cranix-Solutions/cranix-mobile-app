import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

//own modules
import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { Device } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { DevicePrintersComponent } from './../details/printers/device-printers.component';
import { AddDeviceComponent } from './../add-device/add-device.component';
import { ManageDhcpComponent } from 'src/app/shared/actions/manage-dhcp/manage-dhcp.component';

@Component({
  standalone: false,
  selector: 'cranix-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  selectedRoom;
  objectKeys: string[] = [
    "roomId",
    "name",
    "ip",
    "mac",
    "wlanIp",
    "wlanMac",
    "hwconfId",
    "place",
    "row",
    "serial",
    "inventary",
    "locality",
    "created",
    "modified"
  ]
  displayedColumns: string[] = ['name', 'mac', 'ip', 'hwconfId', 'roomId'];
  sortableColumns: string[] = ['name', 'mac', 'ip', 'hwconfId', 'roomId'];
  context;
  title = 'app';
  rowData = [];
  selection: Device[] = [];
  selectedIds: number[] = [];

  constructor(
    public authService: AuthenticationService,
    public alertController: AlertController,
    public languageS: LanguageService,
    public modalCtrl: ModalController,
    public objectService: GenericObjectService,
    public popoverCtrl: PopoverController,
    public route: Router,
    private storage: Storage
  ) {

    this.context = { componentParent: this };
  }
  ngOnInit() {
    this.storage.get('DevicesComponent.displayedColumns').then((val) => {
      let myArray = JSON.parse(val);
      if (myArray) {
        this.displayedColumns = myArray.concat(['actions']);
      }
    });
    if (this.objectService.selectedRoom) {
      this.selectedRoom = this.objectService.selectedRoom;
      this.rowData = [];
      for (let dev of this.objectService.allObjects['device']) {
        if (dev.roomId == this.selectedRoom.id && dev.hwconfId != 2) {
          this.rowData.push(dev);
        }
      }
    } else {
      this.rowData = this.objectService.allObjects['device'].filter(obj => obj.hwconfId != 2);
      delete this.selectedRoom;
    }
    delete this.objectService.selectedObject;
  }
  ngOnDestroy() {
    console.log("ngOnDestroy")
    delete this.objectService.selectedRoom;
    delete this.objectService.selectedObject;
  }

  redirectToDelete(device: Device) {
    this.objectService.deleteObjectDialog(device, 'device', '')
  }
  checkChange(ev, dev: Device) {
    if (ev.detail.checked) {
      this.objectService.selectedIds.push(dev.id)
      this.objectService.selection.push(dev)
    } else {
      this.objectService.selectedIds = this.objectService.selectedIds.filter(id => id != dev.id)
      this.objectService.selection = this.objectService.selection.filter(obj => obj.id != dev.id)
    }
  }

  /**
 * Open the actions menu with the selected object ids.
 * @param ev
 */
  async openActions(ev: any, object: Device) {
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
        objectType: "device",
        objectIds: this.objectService.selectedIds,
        selection: this.objectService.selection
      },
      animated: true,
      showBackdrop: true
    });
    (await popover).present();
  }
  async redirectToEdit(device: Device) {
    let action = "modify";
    if (!device) {
      return this.addDevice(null);
    }
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      cssClass: "medium-modal",
      componentProps: {
        objectType: "device",
        objectAction: action,
        objectKeys: this.objectKeys,
        object: device
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
  async setDhcp(device: Device) {
    const modal = await this.modalCtrl.create({
      component: ManageDhcpComponent,
      componentProps: {
        objectType: "device",
        object: device
      },
      animated: true,
      backdropDismiss: false
    });
    (await modal).present();
  }
  async setPrinters(device: Device) {
    this.objectService.selectedObject = device;
    const modal = await this.modalCtrl.create({
      component: DevicePrintersComponent,
      cssClass: "small-modal",
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
      component: AddDeviceComponent,
      cssClass: 'medium-modal',
      componentProps: {
        adHocRoom: false
      },
      animated: true,
      backdropDismiss: false
    });
    (await modal).present().then((val) => {
      this.authService.log("most lett vegrehajtva.")
    })
  }
}
