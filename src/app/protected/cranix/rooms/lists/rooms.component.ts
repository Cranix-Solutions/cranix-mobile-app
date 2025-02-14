import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

//own modules
import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { Room } from 'src/app/shared/models/data-model';
import { AuthenticationService } from 'src/app/services/auth.service';
import { RoomPrintersPage } from '../details/printers/room-printers.page';
import { ManageDhcpComponent } from 'src/app/shared/actions/manage-dhcp/manage-dhcp.component';

@Component({
  standalone: false,
  selector: 'cranix-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  objectKeys: string[] = [ 'id', 'name', 'ignoreNetbios', 'description', 'roomControl', 'hwconfId', 'startIP', 'devCount', 'roomType', 'network', 'places', 'rows' ]
  displayedColumns: string[] = ['name', 'description', 'roomType', 'roomControl', 'hwconfId', 'actions'];
  context;

  constructor(
    public authService: AuthenticationService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    public route: Router
  ) {
    this.context = { componentParent: this };
  }
  ngOnInit() {
    delete this.objectService.selectedObject;
  }
  public redirectToDelete = (room: Room) => {
    this.objectService.deleteObjectDialog(room, 'room', '')
  }
  /**
 * Open the actions menu with the selected object ids.
 * @param ev
 */
  async openActions(ev: any, object: Room) {
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
        objectType: "room",
        objectIds: this.objectService.selectedIds,
        selection: this.objectService.selection
      },
      animated: true,
      showBackdrop: true
    });
    (await popover).present();
  }

  async redirectToEdit(room: Room) {
    let action = "";
    if (room) {
      delete room.accessInRooms;
      this.objectService.selectedObject = room;
      action = 'modify';
    } else {
      action = "add";
      room = new Room;
      room.network = this.objectService.selects['network'][0];
      delete room.accessInRooms;
      delete room.netMask;
      delete room.startIP;
      room.devCount = 32;
      //TODO set defaults configurable
      room.roomControl = 'allTeachers'
      room.roomType = 'ComputerRoom'
      room.hwconfId = 4
    }
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      cssClass: 'medium-modal',
      componentProps: {
        objectType: "room",
        objectAction: action,
        object: room,
        objectKeys: this.objectKeys
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

  async setDhcp(room: Room) {
    this.objectService.selectedObject = room;
    const modal = await this.modalCtrl.create({
      component: ManageDhcpComponent,
      componentProps: {
        objectType: "room",
        object: room
      },
      animated: true,
      backdropDismiss: false
    });
    (await modal).present();
  }

  async setPrinters(room: Room) {
    this.objectService.selectedObject = room;
    const modal = await this.modalCtrl.create({
      component: RoomPrintersPage,
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

  public devices(room: Room) {
    this.objectService.selectedRoom = room;
    this.route.navigate(['/pages/cranix/devices']);
  }
}
