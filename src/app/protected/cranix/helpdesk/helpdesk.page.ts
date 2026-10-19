import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/auth.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { CrxTicketService } from 'src/app/services/crxticket.service';
import { CreateCrxTicket } from 'src/app/shared/actions/create-crxticket/create-crxticket-page';
import { CrxTicket, CrxTicketArticle } from 'src/app/shared/models/data-model';

@Component({
  standalone: false,
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.page.html',
  styleUrls: ['./helpdesk.page.scss'],
})
export class HelpdeskPage implements OnInit {

  articleOpen = {};
  articles: CrxTicketArticle[] = [];
  selectedTicket: CrxTicket;
  tickets: CrxTicket[] = [];
  allTickets: CrxTicket[] = [];
  action: string = 'tickets';
  stateOfInterest: string = "NWR";
  newText: string = "";

  constructor(
    public authService: AuthenticationService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private languageService: LanguageService,
    private objectService: GenericObjectService,
    private crxTicketService: CrxTicketService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.action == 'tickets') {
      this.getTickets();
    }
  }

  getTickets() {
    this.crxTicketService.getMyTickets(this.stateOfInterest).subscribe({
      next: (val) => {
        this.allTickets = val ? val : [];
        this.action = 'tickets';
        this.onQuickFilterChanged();
      },
      error: (err) => this.objectService.errorMessage(err)
    });
  }

  closeChanged(event) {
    if (event.detail.checked) {
      this.stateOfInterest = "NWRD";
    } else {
      this.stateOfInterest = "NWR";
    }
    this.getTickets();
  }

  onQuickFilterChanged() {
    let filter = "";
    if (document.getElementById("ticketFilter")) {
      filter = (<HTMLInputElement>document.getElementById("ticketFilter")).value.toLowerCase();
    }
    let filteredTickets = [];
    for (let ticket of this.allTickets) {
      if (ticket.title && ticket.title.toLowerCase().indexOf(filter) > -1) {
        filteredTickets.push(ticket);
      }
    }
    this.tickets = filteredTickets;
  }

  selectTicket(ticket: CrxTicket) {
    this.selectedTicket = ticket;
    this.crxTicketService.getArticles(ticket.id).subscribe({
      next: (val) => {
        this.articles = val;
        this.action = 'articles';
      },
      error: (err) => this.objectService.errorMessage(err)
    });
  }

  readArticles() {
    this.crxTicketService.getArticles(this.selectedTicket.id).subscribe({
      next: (val) => {
        this.articles = val;
      },
      error: (err) => this.objectService.errorMessage(err)
    });
  }

  answerArticle(article: CrxTicketArticle) {
    this.newText = "";
    this.action = 'details';
  }

  sendArticle() {
    let article = new CrxTicketArticle();
    article.text = this.newText;
    this.crxTicketService.addArticle(this.selectedTicket.id, article).subscribe({
      next: (val) => {
        this.objectService.responseMessage(val);
        if (val.code == "OK") {
          this.readArticles();
        }
        this.getTickets();
      },
      error: (err) => this.objectService.errorMessage(err)
    });
  }

  async closeTicket(ticket: CrxTicket) {
    const alert = await this.alertController.create({
      header: this.languageService.trans('Confirm!'),
      message: this.languageService.trans('Do you realy want to close the ticket?'),
      buttons: [
        { text: this.languageService.trans('Cancel'), role: "cancel" },
        {
          text: "OK",
          handler: () => {
            this.crxTicketService.close(ticket.id).subscribe({
              next: (val) => {
                this.objectService.responseMessage(val);
                this.getTickets();
              },
              error: (err) => this.objectService.errorMessage(err)
            });
          }
        }
      ]
    });
    await alert.present();
  }

  isOwnArticle(article: CrxTicketArticle) {
    return article.creator && article.creator.id == this.authService.session.userId;
  }

  isHTML(s: string) {
    if (!s) {
      return false;
    }
    var htmlRegex = new RegExp("<([A-Za-z][A-Za-z0-9]*)>");
    return htmlRegex.test(s);
  }

  attachmentUrl(article: CrxTicketArticle) {
    return "data:application/octet-stream;base64," + article.attachment;
  }

  toggleArticle(id) {
    if (this.articleOpen[id]) {
      (<HTMLInputElement>document.getElementById("article" + id)).style.height = "50px";
      this.articleOpen[id] = false;
    } else {
      (<HTMLInputElement>document.getElementById("article" + id)).style.height = "100%";
      this.articleOpen[id] = true;
    }
  }

  async redirectToEdit(ticket: CrxTicket) {
    let newTicket = new CrxTicket();
    const modal = await this.modalCtrl.create({
      component: CreateCrxTicket,
      cssClass: 'big-modal',
      componentProps: {
        ticket: newTicket
      },
      animated: true,
      showBackdrop: true
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data == "OK") {
        this.getTickets();
      }
    });
    (await modal).present();
  }
}
