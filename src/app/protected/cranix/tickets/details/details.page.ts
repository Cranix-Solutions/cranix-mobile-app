import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

//own modules
import { AuthenticationService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { CrxTicketService } from 'src/app/services/crxticket.service';
import { CrxTicket, CrxTicketArticle } from 'src/app/shared/models/data-model';

@Component({
  standalone: false,
  selector: 'cranix-crxticket-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  ticketId: number;
  ticket: CrxTicket;
  articles: CrxTicketArticle[] = [];
  articleOpen = {};
  newText: string = "";

  constructor(
    public authService: AuthenticationService,
    public crxTicketService: CrxTicketService,
    public objectService: GenericObjectService,
    private alertController: AlertController,
    private languageService: LanguageService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.ticketId = Number(this.route.snapshot.params.id);
  }

  ngOnInit() {
    this.readTicket();
  }

  readTicket() {
    this.crxTicketService.getTicket(this.ticketId).subscribe({
      next: (val) => {
        this.ticket = val;
        this.readArticles();
      },
      error: (err) => this.objectService.errorMessage(err)
    });
  }

  readArticles() {
    this.crxTicketService.getArticles(this.ticketId).subscribe({
      next: (val) => {
        this.articles = val ? val : [];
      },
      error: (err) => this.objectService.errorMessage(err)
    });
  }

  isStaff() {
    return this.authService.isOneOfAllowed(['crxticket.worker', 'crxticket.manager']);
  }

  isManager() {
    return this.authService.isAllowed('crxticket.manager');
  }

  isAssignedToMe() {
    return this.ticket && this.ticket.assigneeId == this.authService.session.userId;
  }

  isOwnArticle(article: CrxTicketArticle) {
    return article.creator && article.creator.id == this.authService.session.userId;
  }

  statusText(status: string) {
    switch (status) {
      case 'N': return 'New';
      case 'R': return 'New customer respond';
      case 'W': return 'Waiting for response from customer';
      case 'D': return 'Closed';
    }
    return status;
  }

  assignToMe() {
    this.crxTicketService.assignToMe(this.ticketId, this.authService.session.userId).subscribe({
      next: (val) => {
        this.objectService.responseMessage(val);
        this.readTicket();
      },
      error: (err) => this.objectService.errorMessage(err)
    });
  }

  async closeTicket() {
    const alert = await this.alertController.create({
      header: this.languageService.trans('Confirm!'),
      message: this.languageService.trans('Do you realy want to close the ticket?'),
      buttons: [
        { text: this.languageService.trans('Cancel'), role: "cancel" },
        {
          text: "OK",
          handler: () => {
            this.crxTicketService.close(this.ticketId).subscribe({
              next: (val) => {
                this.objectService.responseMessage(val);
                this.readTicket();
              },
              error: (err) => this.objectService.errorMessage(err)
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteTicket() {
    const alert = await this.alertController.create({
      header: this.languageService.trans('Confirm!'),
      message: this.languageService.trans('Do you realy want to delete?'),
      buttons: [
        { text: this.languageService.trans('Cancel'), role: "cancel" },
        {
          text: "OK",
          handler: () => {
            this.crxTicketService.delete(this.ticketId).subscribe({
              next: (val) => {
                this.objectService.responseMessage(val);
                if (val.code == "OK") {
                  this.router.navigate(['/pages/cranix/tickets']);
                }
              },
              error: (err) => this.objectService.errorMessage(err)
            });
          }
        }
      ]
    });
    await alert.present();
  }

  sendArticle() {
    let article = new CrxTicketArticle();
    article.text = this.newText;
    this.crxTicketService.addArticle(this.ticketId, article).subscribe({
      next: (val) => {
        this.objectService.responseMessage(val);
        if (val.code == "OK") {
          this.newText = "";
          this.readTicket();
        }
      },
      error: (err) => this.objectService.errorMessage(err)
    });
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
}
