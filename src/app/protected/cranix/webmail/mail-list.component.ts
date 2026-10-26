import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
//Own stuff
import { MailService } from 'src/app/services/mail.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { MailFolder, MailMessage } from 'src/app/shared/models/mail-model';
import { MailViewComponent } from './mail-view.component';

@Component({
  standalone: false,
  selector: 'cranix-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.scss'],
})
export class MailListComponent implements OnInit {

  folders: MailFolder[] = [];
  messages: MailMessage[] = [];
  selectedFolder: string = "INBOX";
  limit: number = 50;
  loading: boolean = false;

  constructor(
    public mailService: MailService,
    public modalController: ModalController,
    public objectService: GenericObjectService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadFolders();
    this.loadMessages();
  }

  loadFolders() {
    this.mailService.getFolders().subscribe({
      next: (folders) => {
        this.folders = folders;
        if (!this.folders.find(f => f.fullName === this.selectedFolder) && this.folders.length > 0) {
          this.selectedFolder = this.folders[0].fullName;
        }
      },
      error: (err) => { this.objectService.errorMessage(err) }
    });
  }

  loadMessages() {
    this.loading = true;
    this.mailService.getMessages(this.selectedFolder, this.limit, 0).subscribe({
      next: (messages) => {
        this.messages = messages;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.objectService.errorMessage(err)
      }
    });
  }

  loadMore() {
    this.loading = true;
    this.mailService.getMessages(this.selectedFolder, this.limit, this.messages.length).subscribe({
      next: (messages) => {
        this.messages = this.messages.concat(messages);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.objectService.errorMessage(err)
      }
    });
  }

  hasMore(): boolean {
    let folder = this.folders.find(f => f.fullName === this.selectedFolder);
    if (!folder) {
      return false;
    }
    return this.messages.length < folder.messageCount;
  }

  folderChanged() {
    this.loadMessages();
  }

  async open(message: MailMessage) {
    const modal = await this.modalController.create({
      component: MailViewComponent,
      componentProps: { message: message }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      if (data.reply) {
        this.router.navigate(['/pages/cranix/webmail/compose'], {
          queryParams: {
            to: message.from,
            subject: message.subject && message.subject.startsWith("Re:") ? message.subject : "Re: " + (message.subject || "")
          }
        });
      } else {
        this.loadMessages();
      }
    }
  }

  compose() {
    this.router.navigate(['/pages/cranix/webmail/compose']);
  }
}
