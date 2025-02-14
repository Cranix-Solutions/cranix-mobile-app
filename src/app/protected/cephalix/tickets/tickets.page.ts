import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';


//own modules
import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { Ticket } from 'src/app/shared/models/cephalix-data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { CephalixService } from 'src/app/services/cephalix.service';
import { SupportRequest } from 'src/app/shared/models/data-model';
import { CreateSupport } from 'src/app/shared/actions/create-support/create-support-page';

@Component({
  standalone: false,
  selector: 'cranix-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
  objectKeys: string[] = [];
  displayedColumns: string[] = ['id', 'title', 'cephalixInstituteId', 'modified', 'created', 'creatorId', 'ticketStatus'];
  context;
  title = 'app';
  alive: boolean;
  ticketStatus: Subscription;
  ticketColor = {
    'N': 'red',
    'R': 'orange',
    'W': 'green'
  }
  rowData = [];
  selectedIds: number[] = [];
  selection: Ticket[] = [];
  supportRequest: SupportRequest

  constructor(
    public authService: AuthenticationService,
    public cephalixService: CephalixService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    private route: Router,
    private storage: Storage
  ) {

    this.context = { componentParent: this };
    this.objectKeys = Object.getOwnPropertyNames(new Ticket());
    console.log("Ticket Constructor called")
  }

  async ngOnInit() {
    this.alive = true;
    while (!this.objectService.isInitialized()) {
      await new Promise(f => setTimeout(f, 1000));
    }
    this.rowData = this.objectService.allObjects['ticket'];
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngAfterViewInit() {
    /* Do not refresh tickets
      this.ticketStatus = interval(60000).pipe(takeWhile(() => this.alive)).subscribe((func => {
      this.objectService.getAllObject('ticket');
      if (this.authService.isMD()) {
        this.rowData = this.objectService.allObjects['ticket'];
      }
    }))
    */
  }


  onQuickFilterChanged(quickFilter) {
    let filter = (<HTMLInputElement>document.getElementById(quickFilter)).value.toLowerCase();
      this.rowData = [];
      for (let obj of this.objectService.allObjects['ticket'].sort(this.objectService.sortByCreated)) {
        if (
          obj.title.toLowerCase().indexOf(filter) != -1 ||
          (obj.email && obj.email.toLowerCase().indexOf(filter) != -1) ||
          (obj.firstname && obj.firstname.toLowerCase().indexOf(filter) != -1) ||
          (obj.lastname && obj.lastname.toLowerCase().indexOf(filter) != -1)
        ) {
          this.rowData.push(obj)
        }
      }
  }

  ticketClickHandle(event) {
    console.log(event)
    if (event.column.colId != 'id') {
      event.context.componentParent.route.navigate(['/pages/cephalix/tickets/' + event.data.id])
    }
  }
  public redirectToDelete = (ticket: Ticket) => {
    this.objectService.deleteObjectDialog(ticket, 'ticket', '/pages/cephalix/tickets')
  }
  /**
 * Open the actions menu with the selected object ids.
 * @param ev
 */
  async openActions(ev: any, objId: number) {
    let selected = [];
    var objectIds: number[] = [];
    if (selected.length == 0 && !objId) {
      this.objectService.selectObject();
      return;
    }
    this.objectKeys = [];
    if (objId) {
      objectIds.push(objId);
    } else {
      for (let i = 0; i < selected.length; i++) {
        objectIds.push(selected[i].id);
      }
    }
    const popover = await this.popoverCtrl.create({
      component: ActionsComponent,
      event: ev,
      componentProps: {
        objectType: "ticket",
        objectIds: objectIds,
        selection: selected
      },
      animated: true,
      showBackdrop: true
    });
    (await popover).present();
  }
  async redirectToEdit(ticket: Ticket) {
    if (ticket) {
      this.route.navigate(['/pages/cephalix/tickets/' + ticket.id]);
    } else {
      var mySupport = new SupportRequest();
      mySupport.lastname = this.authService.session.fullName.replace("(","").replace(")","")
      const modal = await this.modalCtrl.create({
        component: CreateSupport,
        cssClass: 'big-modal',
        componentProps: {
          support: mySupport,
        },
        animated: true,
        showBackdrop: true
      });
      modal.onDidDismiss().then((dataReturned) => {
        this.reloadAllObjects();
        if (dataReturned.data) {
          delete dataReturned.data.subject;
          delete dataReturned.data.text;
          console.log("Object was created or modified", dataReturned.data);
          this.storage.set('System.Status.mySupport', JSON.stringify(dataReturned.data));
        }
      });
      (await modal).present();
    }
  }
  reloadAllObjects() {
    this.objectService.okMessage(this.languageS.trans("Reloading all tickets"))
    this.objectService.getAllObject('ticket')
    this.rowData = this.objectService.allObjects['ticket'];
  }
}