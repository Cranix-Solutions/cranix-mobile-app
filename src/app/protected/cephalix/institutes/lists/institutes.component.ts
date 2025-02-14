import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

//own modules
import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CephalixService } from 'src/app/services/cephalix.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { Institute } from 'src/app/shared/models/cephalix-data-model'
import { LanguageService } from 'src/app/services/language.service';
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { WindowRef } from 'src/app/shared/models/ohters';

@Component({
  standalone: false,
  selector: 'cranix-institutes',
  templateUrl: './institutes.component.html',
  styleUrls: ['./institutes.component.scss'],
})
export class InstitutesComponent implements OnInit {
  objectKeys: string[] = [];
  displayedColumns: string[] = ['name', 'uuid', 'locality', 'ipVPN', 'regCode', 'validity'];
  sortableColumns: string[] = ['uuid', 'name', 'locality', 'ipVPN', 'regCode', 'validity'];
  context;
  nativeWindow: any
  now: number = 0;

  constructor(
    private win: WindowRef,
    public authService: AuthenticationService,
    public cephalixService: CephalixService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    public route: Router,
    private storage: Storage
  ) {
    this.context = { componentParent: this };
    this.objectKeys = Object.getOwnPropertyNames(cephalixService.getTemplateInstitute());
    this.nativeWindow = win.getNativeWindow()
  }

  async ngOnInit() {
    this.now = new Date().getTime();
    this.storage.get('InstitutesComponent.displayedColumns').then((val) => {
      let myArray = JSON.parse(val);
      if (myArray) {
        this.displayedColumns = (myArray).concat(['actions']);
      }
    });
    while ( !this.objectService.allObjects['institute'] ) {
      await new Promise(f => setTimeout(f, 1000));
    };
  }
  public redirectToDelete = (institute: Institute) => {
    this.objectService.deleteObjectDialog(institute, 'institute', '')
  }
  /**
 * Open the actions menu with the selected object ids.
 * @param ev
 */
  async openActions(ev, object: Institute) {
  if (object) {
      this.objectService.selectedIds = []
      this.objectService.selection   = []
      this.objectService.selectedIds.push(object.id)
      this.objectService.selection.push(object)
    }
    const popover = await this.popoverCtrl.create({
      component: ActionsComponent,
      event: ev,
      componentProps: {
        objectType: "institute",
        objectIds: this.objectService.selectedIds,
        selection: this.objectService.selection
      },
      animated: true,
      showBackdrop: true
    });
    (await popover).present();
  }
  async redirectToEdit(institute: Institute) {
    if (institute) {
      this.objectService.selectedObject = institute;
      this.route.navigate(['/pages/cephalix/institutes/' + institute.id]);
    } else {
      const modal = await this.modalCtrl.create({
        component: ObjectsEditComponent,
        componentProps: {
          objectType: "institute",
          objectAction: 'add',
          object: this.cephalixService.getTemplateInstitute(),
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

  public routeInstitute(institute: Institute) {
    var hostname = window.location.hostname;
    var protocol = window.location.protocol;
    var port = window.location.port;
    this.cephalixService.getInstituteToken(institute.id)
      .subscribe(
        async (res) => {
          let token = res;
          console.log("Get token from:" + institute.uuid)
          console.log(res);
          if (!res) {
            this.objectService.errorMessage('Can not connect  to "' + institute.name + '"')
          } else {
            sessionStorage.setItem('shortName', institute.uuid);
            sessionStorage.setItem('instituteName', institute.name);
            sessionStorage.setItem('cephalix_token', token);
            if (port) {
              this.nativeWindow.open(`${protocol}//${hostname}:${port}`);
            } else {
              this.nativeWindow.open(`${protocol}//${hostname}`);
            }
            sessionStorage.removeItem('shortName');
          }
        }
      )
  }

  regcodeValid(institute: Institute){
    return institute.validity < this.now ? "danger" : "succes"
  }
}
