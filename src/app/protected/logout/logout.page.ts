import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/auth.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  standalone: false,
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private authService: AuthenticationService,
    private objectService: GenericObjectService,
    private translateService: LanguageService
  ) { }

  ngOnInit() {
    this.logOut()
  }

  async logOut() {
    const alert = await this.alertController.create({
      header: this.translateService.trans('Confirm!'),
      message: this.translateService.trans('Do you realy want to logout?'),
      buttons: [
        {
          text: this.translateService.trans('Cancel'),
          role: 'cancel',
        }, {
          text: 'OK',
          handler: () => {
            this.objectService.cleanUp();
            this.authService.logout();
          }
        }
      ]
    });
    await alert.present();
  }

}
