import { Component, OnInit } from '@angular/core';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ManageAclsComponent } from './manage-acls/manage-acls.component';

@Component({
  standalone: false,
  selector: 'cranix-system-acls',
  templateUrl: './system-acls.component.html',
  styleUrls: ['./system-acls.component.scss'],
})
export class SystemAclsComponent implements OnInit {
  context;
  groupsData = []
  usersData  = []
  constructor(public authService: AuthenticationService,
    private objectService: GenericObjectService,
    public modalCtrl: ModalController,
    private languageS: LanguageService,
    public translateServices: TranslateService) { }

  ngOnInit() {
    this.context = { componentParent: this };
    this.groupsData = this.objectService.allObjects['group'];
    this.usersData  = this.objectService.allObjects['user'];
  }

  async manageAcls(objectType, object) {
    const modal = await this.modalCtrl.create({
      component: ManageAclsComponent,
      animated: true,
      showBackdrop: true,componentProps: {
        objectType: objectType,
        object: object
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.authService.log("Object was created or modified", dataReturned.data)
      }
    });
    (await modal).present();
  }
  groupFilterChanged() {
    //TODO filter groups
  }
  userFilterChanged() {
    //TODO filte users
  }
}
