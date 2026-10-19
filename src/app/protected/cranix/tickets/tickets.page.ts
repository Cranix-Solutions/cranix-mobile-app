import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

//own modules
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CrxTicketService } from 'src/app/services/crxticket.service';
import { CreateCrxTicket } from 'src/app/shared/actions/create-crxticket/create-crxticket-page';
import { CrxTicket } from 'src/app/shared/models/data-model';

@Component({
  standalone: false,
  selector: 'cranix-crxtickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
  context;
  new: boolean = true;
  wait: boolean = true;
  responded: boolean = true;
  closed: boolean = false;
  isTicketStateOpen: boolean = false;
  reload: boolean = false;
  tickets: CrxTicket[] = [];

  constructor(
    public authService: AuthenticationService,
    public crxTicketService: CrxTicketService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    private route: Router
  ) {
    this.context = { componentParent: this };
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.readTicketsByState();
  }

  readTicketsByState() {
    var state = "";
    if (this.new) { state += "N" }
    if (this.wait) { state += "W" }
    if (this.responded) { state += "R" }
    if (this.closed) { state += "D" }
    if (state == "") { state = "NWR" }
    this.crxTicketService.getAllTickets(state).subscribe({
      next: (val) => {
        this.tickets = val ? val : [];
        this.objectService.allObjects['crxticket'] = this.tickets;
        this.isTicketStateOpen = false;
        this.reload = !this.reload;
      },
      error: (err) => this.objectService.errorMessage(err)
    });
  }

  async redirectToEdit(ticket: CrxTicket) {
    if (ticket) {
      this.route.navigate(['/pages/cranix/tickets/' + ticket.id]);
    } else {
      const modal = await this.modalCtrl.create({
        component: CreateCrxTicket,
        cssClass: "big-modal",
        componentProps: {
          ticket: new CrxTicket(),
        },
        animated: true,
        showBackdrop: true
      });
      modal.onDidDismiss().then((dataReturned) => {
        if (dataReturned.data == "OK") {
          this.readTicketsByState();
        }
      });
      (await modal).present();
    }
  }
}
