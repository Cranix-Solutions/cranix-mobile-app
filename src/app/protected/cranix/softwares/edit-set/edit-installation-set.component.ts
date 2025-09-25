import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { Software, Hwconf, Room, Device, Category, Installation } from 'src/app/shared/models/data-model';
import { SoftwareService } from 'src/app/services/softwares.service';
@Component({
  standalone: false,
    selector: 'cranix-edit-installation-set',
  templateUrl: './edit-installation-set.component.html',
  styleUrls: ['./edit-installation-set.component.scss'],
})
export class EditInstallationSetComponent {

  submitted: boolean = false;
  context;
  installationSet: Category = new Category();

  softwares: Software[] = [];
  hwconfs: Hwconf[] = [];
  availableHwconfs: Hwconf[] = [];
  rooms: Room[] = [];
  availableRooms: Room[] = [];
  devices: Device[] = [];
  availableDevices: Device[] = [];

  constructor(
    public authService: AuthenticationService,
    public objectService: GenericObjectService,
    public languageS: LanguageService,
    private modalCtrl: ModalController,
    public softwareService: SoftwareService
  ) {
    this.context = { componentParent: this };

    for (let tmp of this.objectService.allObjects['hwconf']) {
      if (tmp.deviceType == 'FatClient') {
        this.availableHwconfs.push(tmp);
      }
    }
    for(let room of this.objectService.allObjects['room']) {
      if(room.roomType != 'AdHocAccess') this.availableRooms.push(room)
    }
    for (let tmp of this.objectService.allObjects['device']) {
      let tmpHwconf = this.objectService.getObjectById('hwconf', tmp.hwconfId);
      if (tmpHwconf && tmpHwconf.deviceType == 'FatClient') {
        this.availableDevices.push(tmp);
      }
    }
    //Now we edit an installation set. Let's read it!
    if (this.softwareService.selectedInstallationSet) {
      for (let id of this.softwareService.selectedInstallationSet.softwareIds) {
        for (let sw of this.softwareService.availableSoftwares) {
          if (sw.id == id) {
            this.softwares.push(sw);
          }
        }
      }
      this.installationSet = this.softwareService.selectedInstallationSet;
      for (let id of this.installationSet.hwconfIds) {
        let tmp = this.objectService.getObjectById('hwconf', id);
        if(tmp) this.hwconfs.push(tmp);
      }
      for (let id of this.installationSet.roomIds) {
        let tmp = this.objectService.getObjectById('room', id)
        if(tmp) this.rooms.push(tmp);
      }
      for (let id of this.installationSet.deviceIds) {
        let tmp = this.objectService.getObjectById('device', id)
        if(tmp) this.devices.push(tmp);
      }
    }
    console.log(this.rooms)
  }
  closeWindow() {
    this.modalCtrl.dismiss();
  }

  delete() {
    this.objectService.deleteObjectDialog(this.softwareService.selectedInstallationSet, "categorie", '');
  }

  saveInstallation() {
    this.submitted = true;
    this.installationSet.deviceIds = [];
    for (let dev of this.devices) {
      this.installationSet.deviceIds.push(dev.id)
    }
    this.installationSet.roomIds = [];
    for (let room of this.rooms) {
      this.installationSet.roomIds.push(room.id)
    }
    this.installationSet.hwconfIds = [];
    for (let hwconf of this.hwconfs) {
      this.installationSet.hwconfIds.push(hwconf.id)
    }
    this.installationSet.softwareIds = [];
    for (let software of this.softwares) {
      this.installationSet.softwareIds.push(software.id)
    }
    this.objectService.requestSent();
    if (this.softwareService.selectedInstallationSet) {
      this.installationSet.id = this.softwareService.selectedInstallationSet.id;
    }
    console.log(this.installationSet)
    this.softwareService.addModifyInstallationsSets(this.installationSet).subscribe({
      next: (val) => {
        this.objectService.responseMessage(val);
        this.submitted = false;
        if(val.code == "OK") {
          this.modalCtrl.dismiss();
        }
      },
      error: (err) => {
        this.objectService.errorMessage(err);
        this.submitted = false;
      }
    })
  }
}
