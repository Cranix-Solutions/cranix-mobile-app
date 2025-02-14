import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

//own modules
import { AuthenticationService } from 'src/app/services/auth.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { CephalixService } from 'src/app/services/cephalix.service';
import { Institute } from 'src/app/shared/models/cephalix-data-model'
import { User } from 'src/app/shared/models/data-model';

@Component({
  standalone: false,
  selector: 'cranix-institutes',
  templateUrl: './institutes.manage.html',
  styleUrls: ['./institutes.manage.scss'],
})
export class InstitutesManage implements OnInit {
  managedIds:      number[] = [];
  userKeys:        string[] = [ 'id','uid','givenName','surName','role'];
  instituteKeys:   string[] = [ 'id','uuid','name','locality','validity'];
  managerUsers:    User[]   = [];
  selectedManager: User     = new User();
  instituteView:   boolean = false;
  context;
  title = 'app';
  rowData = [];

  constructor(
    public authService: AuthenticationService,
    public cephalixService: CephalixService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    public route: Router
  ) {
    this.context = { componentParent: this };
  }

  ngOnInit() {
    for (let user of this.objectService.allObjects['user'] ) {
      if (user.role.toLowerCase() == "reseller" || user.role == "sysadmins") {
        this.managerUsers.push(user)
      }
    }
  }

  //TODO implement it with ionic-selectable
  
}
