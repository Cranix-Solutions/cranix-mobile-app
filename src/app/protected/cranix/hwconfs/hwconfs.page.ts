import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

//own modules
import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { Hwconf } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
  selector: 'cranix-hwconfs',
  templateUrl: './hwconfs.page.html',
  styleUrls: ['./hwconfs.page.scss'],
})
export class HwconfsPage implements OnInit {
  objectKeys: string[] = [];
  displayedColumns: string[] = ['name', 'description', 'deviceType', 'actions'];
  sortableColumns: string[] = ['name', 'description', 'deviceType'];
  selected: Hwconf[] = [];
  title = 'app';
  selection:   Hwconf[] = [];
  selectedIds: number[] = [];
  constructor(
    public authService: AuthenticationService,
    public languageS: LanguageService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public route: Router
  ) {
  }
  ngOnInit() {
  }
  public redirectToDelete = (hwconf: Hwconf) => {
    this.objectService.deleteObjectDialog(hwconf, 'hwconf','')
  }
  /**
 * Open the actions menu with the selected object ids.
 * @param ev
 */
  async openActions(ev: any, object: Hwconf) {
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
        objectType: "hwconf",
        objectIds: this.objectService.selectedIds,
        selection: this.objectService.selection
      },
      animated: true,
      showBackdrop: true
    });
    (await popover).present();
  }

  async redirectToEdit(hwconf: Hwconf) {
    if (hwconf) {
      this.objectService.selectedObject = hwconf;
      let err = this.route.navigate(['/pages/cranix/hwconfs/' + hwconf.id]);
      console.log(err)
    } else {
      const modal = await this.modalCtrl.create({
        component: ObjectsEditComponent,
        componentProps: {
          objectType: "hwconf",
          objectAction: "add",
          object: new Hwconf(),
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

}
