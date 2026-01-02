import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular'
import { AuthenticationService } from 'src/app/services/auth.service';
import { ChallengesService } from 'src/app/services/challenges.service';
import { CrxObjectService } from 'src/app/services/crx-object-service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CranixNoticesComponent } from 'src/app/shared/cranix-notices/cranix-notices.component'
import { ActionsComponent } from '../actions/actions.component';

@Component({
  standalone: false,
  selector: 'cranix-md-list',
  templateUrl: './cranix-md-list.component.html',
  styleUrls: ['./cranix-md-list.component.scss'],
})
export class CranixMdListComponent implements OnInit, OnChanges {

  min: number;
  step: number;
  max: number;
  left1: string;
  left2: string;
  left3: string;
  noticeUse: boolean = false;
  @Input() objectType: string;
  @Input() context;
  @Input() rowData: any[];
  constructor(
    public authService: AuthenticationService,
    private challengeService: ChallengesService,
    public crxObjectService: CrxObjectService,
    public languageService: LanguageService,
    public objectService: GenericObjectService,
    public utilsService: UtilsService,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController
  ) {
    this.authService.log("CranixMdListComponent constructor was called")
    this.utilsService.actMdList = this;
    this.noticeUse = this.authService.isAllowed('notice.use')
  }

  ngAfterContentInit() {
    console.log(this.objectType)
    console.log("CranixMdListComponent ngAfterContentInit")
  }

  async ngOnInit() {
    this.objectService.selectedObjects = []
    this.objectService.selectedIds = []
    this.initSteps()
    if (!this.min) {
      this.min = -1;
    }
    if (!this.step || this.step < 3) {
      this.step = 3;
    }
    this.left1 = 'name'
    this.left2 = 'description'
    this.left3 = ''
    switch (this.objectType) {
      case "education/user":
      case "user": {
        this.left1 = "uid"
        this.left2 = "surName"
        this.left3 = "givenName"
        break
      }
      case "2fa": {
        this.left1 = "creatorId"
        this.left2 = "crx2faType"
        break
      }
      case 'device': {
        this.left2 = 'ip'
        break
      }
      case 'institute': {
        this.left2 = "regCode"
        break
      }
      case 'customer': {
        this.left2 = "locality"
        break
      }
      case 'ticket': {
        this.left1 = "title"
        this.left2 = "lastname"
        this.left3 = "firstname"
        break
      }
    }
    if (!this.rowData) {
      while (!this.objectService.allObjects[this.objectType]) {
        await new Promise(f => setTimeout(f, 1000));
      }
      switch (this.objectType) {
        case "ticket": {
          this.rowData = this.objectService.allObjects[this.objectType].sort(this.objectService.sortByCreatedBack)
          break
        }
        case 'device': {
          let tmp: any[] = []
          for (let dev of this.objectService.allObjects[this.objectType]) {
            if (dev.hwconfId == 2) {
              continue
            }
            if (this.objectService.selectedRoom && dev.roomId != this.objectService.selectedRoom) {
              continue
            }
            tmp.push(dev);
          }
          this.rowData = tmp;
          break
        }
        default: {
          this.rowData = this.objectService.allObjects[this.objectType]
        }
      }
    }
    if (this.max > (this.rowData.length)) {
      this.max = this.rowData.length
    }
    this.authService.log("CranixMdListComponent ngOnInit", this.rowData)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    this.ngOnInit()
  }
  initSteps() {
    this.step = Number(this.authService.settings.lineProPageMD);
    this.min = -1;
    if (!this.step || this.step < 3) {
      this.step = 3;
    }
    this.max = this.min + this.step + 1;
    this.authService.log("CranixMdListComponent Min Max Step", this.min, this.max, this.step)
  }

  back() {
    this.min -= this.step;
    if (this.min < -1) {
      this.min = -1
    }
    this.max = this.min + this.step + 1;
    if (this.max > (this.rowData.length)) {
      this.max = this.rowData.length
    }
  }

  forward() {
    this.max += this.step;
    if (this.max < (this.step)) {
      this.max = this.step
    }
    this.min = this.max - this.step - 1;
    if (this.max > (this.rowData.length)) {
      this.max = this.rowData.length
    }
  }

  checkChange(ev, dev) {
    if (ev.detail.checked) {
      this.objectService.selectedIds.push(dev.id)
      this.objectService.selectedObjects.push(dev)
    } else {
      this.objectService.selectedIds = this.objectService.selectedIds.filter(id => id != dev.id)
      this.objectService.selectedObjects = this.objectService.selectedObjects.filter(obj => obj.id != dev.id)
    }
  }

  onQuickFilterChanged() {
    let filter = (<HTMLInputElement>document.getElementById('filterMD')).value.toLowerCase();
    this.min = -1;
    this.max = this.step;
    if (this.objectType == 'ticket') {
      this.rowData = this.objectService.filterObject(this.objectType, filter).sort(this.objectService.sortByCreatedBack)
    } else {
      this.rowData = this.objectService.filterObject(this.objectType, filter)
    }
    if (this.rowData.length < this.step) {
      this.min = -1
      this.max = this.rowData.length
    }
  }


  async openNotice(object) {
    const modal = await this.modalCtrl.create({
      component: CranixNoticesComponent,
      componentProps: {
        selectedObject: object,
        objectType: this.objectType
      },
      cssClass: 'big-modal'
    })
    modal.present();
  }

  redirectToDelete = (object) => {
    this.objectService.deleteObjectDialog(object, this.objectType, '')
  }
  
  async openActions(ev: any, object: any) {
      if (object) {
        this.objectService.selectedIds = [object.id]
        this.objectService.selectedObjects = [object]
      } else {
        if (this.objectService.selectedObjects.length == 0) {
          this.objectService.selectObject();
          return;
        }
      }
      const popover = await this.popoverCtrl.create({
        component: ActionsComponent,
        event: ev,
        componentProps: {
          objectType: this.objectType,
          objectIds: this.objectService.selectedIds,
          selection: this.objectService.selectedObjects
        },
        translucent: true,
        animated: true,
        showBackdrop: true
      });
      await popover.present();
    }

    getStyle(object: any, count: number){
      if(this.objectType == "ticket"){
        switch(object.ticketStatus){
          case "N": return { 'background-color': 'red' }
          case "R": return { 'background-color': 'orange' }
        }
      }
      return  { 'background-color': this.authService.rowColors[count%2] }
    }
}
