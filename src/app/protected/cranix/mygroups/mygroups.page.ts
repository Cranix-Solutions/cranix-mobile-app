import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

//own modules
import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { Group, GuestUsers, Room, User } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { GroupMembersPage } from 'src/app/shared/actions/group-members/group-members.page';
import { EductaionService } from 'src/app/services/education.service';

@Component({
  standalone: false,
  selector: 'cranix-mygroups',
  templateUrl: './mygroups.page.html',
  styleUrls: ['./mygroups.page.scss'],
})
export class MyGroupsPage implements OnInit {
  segment: string = 'education/group';
  objectKeys: string[] = [];
  context;
  rowData = [];

  constructor(
    public authService: AuthenticationService,
    public educationService: EductaionService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    public route: Router,
    public translateService: TranslateService
  ) {
    this.context = { componentParent: this };
  }
  async ngOnInit() {
    while ( !this.objectService.allObjects['education/user'] ) {
      await new Promise(f => setTimeout(f, 1000));
    }
    this.rowData = this.objectService.allObjects['education/group']
    this.objectService.allObjects['education/user'].sort(
      (a, b) => (a.groupName > b.groupName) ? 1 : (b.groupName > a.groupName) ? -1 : 0
    );
  }

  segmentChanged(event) {
    this.segment = event.detail.value;
  }

  public redirectToDelete = (tmp) => {
    this.objectService.deleteObjectDialog(tmp, this.segment, '')
  }

  checkChange(ev, obj) {
    if (ev.detail.checked) {
      this.objectService.selectedIds.push(obj.id)
      this.objectService.selection.push(obj)
    } else {
      this.objectService.selectedIds = this.objectService.selectedIds.filter(id => id != obj.id)
      this.objectService.selection = this.objectService.selection.filter(obj => obj.id != obj.id)
    }
  }
  /**
  * Open the actions menu with the selected object ids.
  * @param ev
  */
  async openActions(ev: any, object ) {
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
        objectType: this.segment,
        objectIds: this.objectService.selectedIds,
        selection: this.objectService.selection
      },
      animated: true,
      showBackdrop: true
    });
    (await popover).present();
  }

  /**
   * Function to add or edit a group.
   * Group is null a new group will be created.
   * @param ev
   * @param group
   */
  async redirectToMembers(group: Group) {
    this.objectService.selectedObject = group;
    const modal = await this.modalCtrl.create({
      component: GroupMembersPage,
      cssClass: 'big-modal',
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

  async redirectToEdit(anyObject: any) {
    let action = anyObject ? 'modify' : 'add';
    let objectType = this.segment

    switch (this.segment) {
      case 'education/user': {
        if (!anyObject) { anyObject = new User() }
      }
      case 'education/group': {
        if (!anyObject) { anyObject = new Group() }
        delete anyObject.groupType
      }
    }
    if (action == 'add') {
      delete anyObject.id;
    }
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      cssClass: 'medium-modal',
      componentProps: {
        objectType: objectType,
        objectAction: action,
        object: anyObject
      },
      animated: true,
      showBackdrop: true
    });
    (await modal).present();
  }

  async addEditGuest(guest: GuestUsers) {
    let action = 'modify';
    if (!guest) {
      guest = new GuestUsers();
      action = 'add';
    }
    const modal = await this.modalCtrl.create({
      component: AddEditGuestPage,
      cssClass: 'medium-modal',
      componentProps: {
        action: action,
        guest: guest
      },
      animated: true,
      showBackdrop: true
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.objectService.getAllObject('education/guestUser');
        this.authService.log("Object was created or modified", dataReturned.data)
      }
    });
    (await modal).present();
  }
}

@Component({
  standalone: false,
  selector: 'cranix-add-edit-guest',
  templateUrl: './add-edit-guest.html'
})
export class AddEditGuestPage implements OnInit {

  now: string;
  disabled: boolean = false;
  selectedRooms: Room[] = []
  @Input() guest: GuestUsers
  @Input() action: string
  constructor(
    public educationService: EductaionService,
    public modalCtrl: ModalController,
    public objectService: GenericObjectService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.now = formatDate(Date.now(), 'yyyy-MM-dd', this.locale);
  }

  ngOnInit() {
  }

  onSubmit() {
    this.objectService.requestSent();
    this.disabled = true;
    console.log(this.guest)
    for (let r of this.selectedRooms) {
      this.guest.roomIds.push(r.id)
    }
    this.educationService.addGuestUsers(this.guest).subscribe(
      (val) => {
        console.log(val)
        this.objectService.responseMessage(val);
        if (val.code == "OK") {
          this.modalCtrl.dismiss("OK")
        }
        this.disabled = false;
      }
    );
  }
}

