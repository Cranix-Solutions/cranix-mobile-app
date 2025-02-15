import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';

//own modules
import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { User } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { UserGroupsPage } from '../details/groups/user-groups.page';
import { SystemService } from 'src/app/services/system.service';

@Component({
  standalone: false,
  selector: 'cranix-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  objectKeys: string[] = [
    "uid",
    "uuid",
    "surName",
    "givenName",
    "birthDay",
    "password",
    "role",
    "mustChange",
    "classes",
    "msQuota",
    "fsQuota",
    "msQuotaUsed",
    "fsQuotaUsed",
    "created",
    "modified"
  ];
  displayedColumns: string[] = ['uid', 'uuid', 'givenName', 'surName', 'role', 'classes', 'actions'];
  context;
  rowData = [];
  defaultMustChange: boolean = true;
  constructor(
    public authService: AuthenticationService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    private systemService: SystemService
  ) {
    this.context = { componentParent: this };
    this.systemService.getSystemConfigValue("DEFAULT_MUST_CHANGE").subscribe(
      (val) => {
        if (val == "no") {
          this.defaultMustChange = false
        }
      }
    )
  }

  async ngOnInit() {
    while (!this.objectService.allObjects['user']) {
      await new Promise(f => setTimeout(f, 1000));
    }
    this.rowData = this.objectService.allObjects['user']
  }

  checkChange(ev, obj: User) {
    if (ev.detail.checked) {
      this.objectService.selectedIds.push(obj.id)
      this.objectService.selection.push(obj)
    } else {
      this.objectService.selectedIds = this.objectService.selectedIds.filter(id => id != obj.id)
      this.objectService.selection = this.objectService.selection.filter(obj => obj.id != obj.id)
    }
  }
  redirectToDelete = (user: User) => {
    this.objectService.deleteObjectDialog(user, 'user', '')
  }

  async openActions(ev: any, object: User) {
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
        objectType: "user",
        objectIds: this.objectService.selectedIds,
        selection: this.objectService.selection
      },
      translucent: true,
      animated: true,
      showBackdrop: true
    });
    await popover.present();
  }

  async redirectToGroups(user: User) {
    this.objectService.selectedObject = user;
    const modal = await this.modalCtrl.create({
      component: UserGroupsPage,
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

  async redirectToEdit(user: User) {
    let action = "modify";
    if (!user) {
      user = new User();
      user.mustChange = this.defaultMustChange;
      delete user.msQuotaUsed;
      delete user.fsQuotaUsed;
      delete user.mailAliases;
      delete user.classes;
      action = 'add';
    }
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      cssClass: 'medium-modal',
      componentProps: {
        objectType: "user",
        objectAction: action,
        object: user,
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
}
