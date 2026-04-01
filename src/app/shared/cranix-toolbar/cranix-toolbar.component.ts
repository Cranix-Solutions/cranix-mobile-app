import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
//Own module
import { AuthenticationService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language.service';
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Settings } from 'src/app/shared/models/server-models';
import { Ticket } from 'src/app/shared/models/cephalix-data-model';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'cranix-toolbar',
  templateUrl: './cranix-toolbar.component.html',
  styleUrls: ['./cranix-toolbar.component.scss'],
})
export class CranixToolbarComponent  implements OnDestroy {

  isPopoverOpen: boolean = false
  roomName: string = "";
  fullName: string = "";
  instituteName: string = "";
  newTickets: number = 0;
  newResponses: number = 0;
  alive: boolean = true;
  ticketUrl: string = "";
  responseUrl: string = "";

  @Input() title: string;
  constructor(
    public authService: AuthenticationService,
    public alertController: AlertController,
    private http: HttpClient,
    public storage: Storage,
    public translateService: LanguageService,
    public objectService: GenericObjectService,
    public modalConroller: ModalController,
    public route: Router,
    public utilsService: UtilsService
  ) {
    this.fullName = authService.session.fullName;
    this.roomName = authService.session.roomName;
    this.instituteName = authService.session.instituteName;
    this.ticketUrl = this.utilsService.hostName() + "/tickets/status/RN";
    this.responseUrl = this.utilsService.hostName() + "/support/W"
  }

  ngOnDestroy() {
    console.log("Toolbar closed")
    this.isPopoverOpen = false
    this.alive = false;
  }
  ngAfterViewInit() {
    console.log("Toolbar initialized")
    if(this.authService.isAllowed('cepahlix.ticket')){
      this.countTickets();
      interval(30000).pipe(takeWhile(() => this.alive)).subscribe((func => {
        this.countTickets();
      }))
    }
    if(this.authService.isAllowed('cephalix.support')){
      this.countResponses();
      interval(30000).pipe(takeWhile(() => this.alive)).subscribe((func => {
        this.countResponses();
      }))
    }
  }

  countTickets(){
    this.http.get<Ticket[]>(this.ticketUrl, { headers: this.authService.headers }).subscribe({
      next: (val) => {
        this.newTickets = val.length
      }})
  }

  countResponses(){
    this.http.get<Ticket[]>(this.responseUrl, { headers: this.authService.headers }).subscribe({
      next: (val) => {
        this.newResponses = val.length
      }})
  }
  async logOut() {
    this.isPopoverOpen = false;
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
            this.authService.logout();
          }
        }
      ]
    });
    await alert.present();
  }

  async retirectToSettings(ev: Event) {
    let settings: Settings = this.authService.settings;
    if (this.authService.isMD()) {
      delete settings.agGridThema
      delete settings.rowHeight
      delete settings.rowMultiSelectWithClick
      delete settings.checkboxSelection
      delete settings.headerCheckboxSelection
    } else {
      delete settings.lineProPageMD
    }
    settings.lang = this.translateService.language.toUpperCase();
    const modal = await this.modalConroller.create({
      component: ObjectsEditComponent,
      cssClass: 'medium-modal',
      componentProps: {
        objectType: "settings",
        objectAction: "modify",
        object: settings
      },
      animated: true,
      showBackdrop: true
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        for (let key of Object.getOwnPropertyNames(dataReturned.data)) {
          this.authService.settings[key] = dataReturned.data[key]
        }
        this.storage.set("myCranixSettings", JSON.stringify(this.authService.settings));
        this.translateService.saveLanguage(this.authService.settings.lang);
        if (this.utilsService.actMdList) {
          this.utilsService.actMdList.ngOnInit();
        }
        this.authService.log("ToolbarComponent", "Settings was modified", this.authService.settings)
      }
    });
    (await modal).present();
    this.isPopoverOpen = false
  }

  reloadAllObjects() {
    this.objectService.okMessage(this.translateService.trans("Reloading all objects"))
    this.objectService.initialize(true)
    this.isPopoverOpen = false
  }

  openPopover(){
    this.isPopoverOpen = true;
  }
}
