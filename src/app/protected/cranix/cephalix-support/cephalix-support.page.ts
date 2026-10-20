import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/auth.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { SupportService } from 'src/app/services/support.service';
import { CreateSupport } from 'src/app/shared/actions/create-support/create-support-page';
import { Article, Ticket } from 'src/app/shared/models/cephalix-data-model';
import { SupportRequest } from 'src/app/shared/models/data-model';

@Component({
  standalone: false,
  selector: 'app-cephalix-support',
  templateUrl: './cephalix-support.page.html',
  styleUrls: ['./cephalix-support.page.scss'],
})
export class CephalixSupportPage implements OnInit {

  articleOpen = {};
  articles: Article[];
  context;
  selectedTicket: Ticket;
  tickets: Ticket[];
  allTickets: Ticket[];
  action: string = 'tickets'
  stateOfInterest: string = "NWR"
  newText: string = "";
  answerFiles = [];
  answerAttachment: string = "";
  answerAttachmentName: string = "";

  @ViewChild(IonContent) content: IonContent;

  constructor(
    public authService: AuthenticationService,
    private modalCtrl: ModalController,
    private objectService: GenericObjectService,
    private supportSrvice: SupportService
  ) { }

  ngOnInit() {
    this.context = { componentParent: this }
    this.getTickets()
  }

  getTickets() {
    this.supportSrvice.getTickets(this.stateOfInterest).subscribe(
      (val) => {
        this.allTickets = val
        this.action = 'tickets'
        this.onQuickFilterChanged();
      }
    )
  }

  closeChanged(event) {
    console.log(event)
    if (event.detail.checked) {
      this.stateOfInterest = "NWRD"
    } else {
      this.stateOfInterest = "NWR"
    }
    this.getTickets()
  }
  onQuickFilterChanged() {
    let filteredTickets = []
    let filter = (<HTMLInputElement>document.getElementById("ticketFilter")).value.toLowerCase();
    for(let ticket of this.allTickets){
      if(ticket.title.toLowerCase().indexOf(filter) > -1){
        filteredTickets.push(ticket)
      }
    }
    this.tickets = filteredTickets
  }

  selectTicket(ticket: Ticket) {
    this.selectedTicket = ticket;
    this.prefillAnswer();
    this.refreshArticles();
    this.action = 'articles';
  }

  refreshArticles() {
    this.supportSrvice.getArticles(this.selectedTicket.id).subscribe(
      (val) => {
        this.articles = val
        this.scrollToEnd();
      }
    )
  }

  prefillAnswer() {
    this.newText = "Hallo,<br><br>Viele Grüße<br>" +
      this.authService.session.user.givenName + " " + this.authService.session.user.surName;
  }

  scrollToEnd() {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(300);
      }
    }, 200);
  }

  onFilesAdded(event, modal) {
    this.answerFiles = event.target.files;
    modal.dismiss();
  }

  addAttachment() {
    for (let file of this.answerFiles) {
      this.answerAttachmentName = file.name;
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        let index = e.target.result.toString().indexOf("base64,") + 7;
        this.answerAttachment = e.target.result.toString().substring(index);
      }
      fileReader.readAsDataURL(file);
    }
  }

  sendArticle() {
    var article = new Article();
    article.articleType = 'I'
    article.text = this.newText
    article.attachment = this.answerAttachment;
    article.attachmentName = this.answerAttachmentName;
    this.supportSrvice.addArticle(this.selectedTicket.id, article).subscribe(
      (val) => {
        this.objectService.responseMessage(val);
        if (val.code == "OK") {
          this.answerAttachment = "";
          this.answerAttachmentName = "";
          this.answerFiles = [];
          this.prefillAnswer();
          this.refreshArticles();
        }
      }
    )
  }
  isHTML(s: string) {
    //var htmlRegex = new RegExp("<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)</\1>");
    var htmlRegex = new RegExp("<([A-Za-z][A-Za-z0-9]*)>");
    return htmlRegex.test(s);
  }
  toggleArticle(id) {
    if (this.articleOpen[id]) {
      (<HTMLInputElement>document.getElementById("article" + id)).style.height = "50px"
      this.articleOpen[id] = false
    } else {
      (<HTMLInputElement>document.getElementById("article" + id)).style.height = "100%"
      this.articleOpen[id] = true
    }
  }

  async redirectToEdit(ticket: Ticket) {
    if (ticket) {
      this.selectedTicket = ticket;
    } else {
      var mySupport = new SupportRequest();
      mySupport.lastname = this.authService.session.user.givenName + " " + this.authService.session.user.surName
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
        this.getTickets();
      });
      (await modal).present()
    }
  }
}
