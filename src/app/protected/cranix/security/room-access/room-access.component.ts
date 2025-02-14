import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language.service';
import { SecurityService } from 'src/app/services/security-service';
import { AccessInRoom } from 'src/app/shared/models/secutiry-model';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { ModalController } from '@ionic/angular';
import { AddEditRoomAccessComponent } from './add-edit-room-access/add-edit-room-access.component';
import { SystemService } from 'src/app/services/system.service';

@Component({
  standalone: false,
  selector: 'cranix-room-access',
  templateUrl: './room-access.component.html',
  styleUrls: ['./room-access.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoomAccessComponent implements OnInit {
  segment = 'list';
  rowData: AccessInRoom[] = [];
  notActive: boolean = false;
  disabled: boolean = false;
  accessOptions = {};
  context;

  constructor(
    public authService: AuthenticationService,
    public languageS: LanguageService,
    public modalCtrl: ModalController,
    public objectService: GenericObjectService,
    public systemService: SystemService,
    public securityService: SecurityService
  ) {
    this.context = { componentParent: this };
  }

  ngOnInit() {
    this.readDatas();
  }

  toggle(data, field: string, value: boolean) {
    if (this.segment == 'list') {
      this.securityService.modifyAccessInRoom(data);
    } else {
      this.securityService.setAccessStatusInRoom(data);
    }
  }

  toggleButton(data, field: string) {
    data[field] = !data[field]
    if (this.segment == 'list') {
      this.securityService.modifyAccessInRoom(data);
    } else {
      this.securityService.setAccessStatusInRoom(data);
    }
    this.securityService.getActualAccessStatus()
  }

  apply(data: AccessInRoom, rowIndex: number) {
    let sent = false
    for (let access of this.rowData) {
      if (access.roomId == data.roomId && access.accessType == "DEF") {
        this.securityService.setAccessStatusInRoom(access)
        sent = true
        break
      }
    }
    if (sent) {
      this.securityService.getActualAccessStatus()
    } else {
      this.objectService.warningMessage(
        this.languageS.trans("There is no default access status for this room.")
      )
    }
  }
  segmentChanged(event) {
    console.log(event.detail.value)
    if (event.detail.value == "status") {
      this.securityService.getActualAccessStatus();
      this.objectService.okMessage(this.languageS.trans('Loading data ...'));
    }
    this.segment = event.detail.value;
  }

  readDatas() {
    let sub = this.securityService.getAllAccess().subscribe(
      (val) => { this.rowData = val },
      (err) => { this.authService.log(err) },
      () => { sub.unsubscribe(); }
    );
  }
  async redirectToAddEdit(roomAccess: AccessInRoom) {
    let action = "add";
    if (roomAccess) {
      this.objectService.selectedObject = roomAccess;
      action = "modify";
    } else {
      roomAccess = new AccessInRoom();
    }
    const modal = await this.modalCtrl.create({
      component: AddEditRoomAccessComponent,
      cssClass: 'medium-modal',
      componentProps: {
        objectAction: action,
        roomAccess: roomAccess
      },
      animated: true,
      showBackdrop: true
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.authService.log("Object was created or modified or deleted", dataReturned.data)
      }
      this.readDatas();
    });
    (await modal).present();
  }
  restartFirewall() {
    this.systemService.applyServiceState('cranix-firewall', 'activ', 'restart')
  }
  stopFirewall() {
    this.systemService.applyServiceState('cranix-firewall', 'activ', 'false')
  }
  delete() {
    let accessSelected = []; //TODO
    if (accessSelected.length == 0) {
      this.objectService.selectObject();
      return;
    }
    this.disabled = true;
    for (let obj of accessSelected) {
      this.securityService.deleteAccessInRoom(obj.id);
      setTimeout(() => { this.authService.log("World!"); }, 1000);
    }
    this.readDatas();
    this.disabled = false;
  }
}
