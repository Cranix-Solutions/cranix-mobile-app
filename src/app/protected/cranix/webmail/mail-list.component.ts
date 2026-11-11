import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
//Own stuff
import { MailService } from 'src/app/services/mail.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
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
    public languageS: LanguageService,
    public alertCtrl: AlertController,
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
      error: (err) => { this.objectService.errorMessage(this.serverMessage(err)) }
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
        this.objectService.errorMessage(this.serverMessage(err))
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
        this.objectService.errorMessage(this.serverMessage(err))
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

  async createFolder() {
    const alert = await this.alertCtrl.create({
      header: this.languageS.trans('New folder'),
      message: this.languageS.trans('Folder name'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: this.languageS.trans('Folder name')
        }
      ],
      buttons: [
        { text: this.languageS.trans('Cancel'), role: 'cancel' },
        {
          text: this.languageS.trans('Create'),
          handler: (data) => {
            const name = (data.name || "").trim();
            if (name.length === 0) {
              this.objectService.warningMessage(this.languageS.trans('A folder name must be set!'));
              return false;
            }
            this.mailService.createFolder(name, this.selectedFolder).subscribe({
              next: (resp) => {
                this.objectService.responseMessage(resp);
                this.loadFolders();
                this.loadMessages();
              },
              error: (err) => { this.objectService.errorMessage(this.serverMessage(err)) }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteFolder() {
    const folder = this.folders.find(f => f.fullName === this.selectedFolder);
    if (!folder) {
      return;
    }
    if (folder.type !== 'folder') {
      this.objectService.warningMessage(this.languageS.trans('System folders can not be deleted.'));
      return;
    }
    const alert = await this.alertCtrl.create({
      header: this.languageS.trans('Confirm!'),
      message: this.languageS.trans('Do you realy want to delete?') + " " + folder.name,
      buttons: [
        { text: this.languageS.trans('Cancel'), role: 'cancel' },
        {
          text: this.languageS.trans('Delete'),
          handler: () => {
            this.mailService.deleteFolder(folder.fullName).subscribe({
              next: (resp) => {
                this.objectService.responseMessage(resp);
                this.selectedFolder = "INBOX";
                this.loadFolders();
                this.loadMessages();
              },
              error: (err) => { this.objectService.errorMessage(this.serverMessage(err)) }
            });
          }
        }
      ]
    });
    await alert.present();
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

  private serverMessage(err): string {
    if (!err) {
      return "";
    }
    if (typeof err === 'string') {
      return err;
    }
    if (err.error) {
      if (typeof err.error === 'string') {
        return err.error;
      }
      if (err.error.value) {
        return this.languageS.trans(err.error.value);
      }
    }
    return err.message || err.statusText || "Error";
  }
}
