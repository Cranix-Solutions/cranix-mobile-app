import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
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
  selected: MailMessage[] = [];
  selectedFolder: string = "INBOX";
  limit: number = 50;
  loading: boolean = false;
  searchQuery: string = "";
  searchAllFolders: boolean = true;
  searchActive: boolean = false;
  searchExhausted: boolean = false;

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
    this.searchActive = false;
    this.searchExhausted = false;
    this.loading = true;
    this.selected = [];
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

  onSearch() {
    const query = this.searchQuery.trim();
    if (query.length === 0) {
      this.loadMessages();
      return;
    }
    this.searchActive = true;
    this.searchExhausted = false;
    this.loading = true;
    this.selected = [];
    this.messages = [];
    this.mailService.searchMessages(query, this.searchAllFolders ? "" : this.selectedFolder, this.limit, 0).subscribe({
      next: (messages) => {
        this.messages = messages;
        this.searchExhausted = messages.length < this.limit;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.objectService.errorMessage(this.serverMessage(err))
      }
    });
  }

  reload() {
    if (this.searchActive) {
      this.onSearch();
    } else {
      this.loadMessages();
    }
  }

  loadMore() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    if (this.searchActive) {
      if (this.searchExhausted) {
        this.loading = false;
        return;
      }
      this.mailService.searchMessages(this.searchQuery.trim(), this.searchAllFolders ? "" : this.selectedFolder, this.limit, this.messages.length).subscribe({
        next: (messages) => {
          this.messages = this.messages.concat(messages);
          this.searchExhausted = messages.length < this.limit;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.objectService.errorMessage(this.serverMessage(err))
        }
      });
      return;
    }
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
    if (this.searchActive) {
      return !this.searchExhausted && this.messages.length >= this.limit;
    }
    let folder = this.folders.find(f => f.fullName === this.selectedFolder);
    if (!folder) {
      return false;
    }
    return this.messages.length < folder.messageCount;
  }

  folderChanged() {
    this.reload();
  }

  isSelected(message: MailMessage): boolean {
    return this.selected.some(m => m.folder === message.folder && m.uid === message.uid);
  }

  toggleSelect(message: MailMessage, event) {
    if (event.detail.checked) {
      if (!this.isSelected(message)) {
        this.selected.push(message);
      }
    } else {
      this.selected = this.selected.filter(m => !(m.folder === message.folder && m.uid === message.uid));
    }
  }

  allSelected(): boolean {
    return this.messages.length > 0 && this.selected.length === this.messages.length;
  }

  someSelected(): boolean {
    return this.selected.length > 0 && !this.allSelected();
  }

  toggleAll(event) {
    this.selected = event.detail.checked ? this.messages.slice() : [];
  }

  private selectedByFolder(): { [folder: string]: number[] } {
    const groups: { [folder: string]: number[] } = {};
    this.selected.forEach(message => {
      const folder = message.folder || this.selectedFolder;
      if (!groups[folder]) {
        groups[folder] = [];
      }
      groups[folder].push(message.uid);
    });
    return groups;
  }

  async openActions() {
    const alert = await this.alertCtrl.create({
      header: this.languageS.trans('Selected messages') + ": " + this.selected.length,
      buttons: [
        { text: this.languageS.trans('Cancel'), role: 'cancel' },
        { text: this.languageS.trans('Forward'), handler: () => { this.forwardSelected(); } },
        { text: this.languageS.trans('Move to folder'), handler: () => { this.moveSelected(); } },
        { text: this.languageS.trans('Delete'), role: 'destructive', handler: () => { this.deleteSelected(); } }
      ]
    });
    await alert.present();
  }

  async deleteSelected() {
    const count = this.selected.length;
    const alert = await this.alertCtrl.create({
      header: this.languageS.trans('Confirm!'),
      message: this.languageS.trans('Delete selected messages?') + " (" + count + ")",
      buttons: [
        { text: this.languageS.trans('Cancel'), role: 'cancel' },
        {
          text: this.languageS.trans('Delete'),
          role: 'destructive',
          handler: () => {
            const groups = this.selectedByFolder();
            const requests = Object.keys(groups).map(folder => this.mailService.deleteMessages(folder, groups[folder]));
            forkJoin(requests).subscribe({
              next: (responses) => {
                responses.forEach(resp => this.objectService.responseMessage(resp));
                this.selected = [];
                this.loadFolders();
                this.reload();
              },
              error: (err) => { this.objectService.errorMessage(this.serverMessage(err)) }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async moveSelected() {
    const targets = this.folders.filter(f => f.fullName !== this.selectedFolder);
    if (targets.length === 0) {
      this.objectService.warningMessage(this.languageS.trans('No other folder available.'));
      return;
    }
    const alert = await this.alertCtrl.create({
      header: this.languageS.trans('Move to folder'),
      inputs: targets.map(f => ({
        name: 'target',
        type: 'radio',
        label: f.fullName,
        value: f.fullName
      })),
      buttons: [
        { text: this.languageS.trans('Cancel'), role: 'cancel' },
        {
          text: this.languageS.trans('Move'),
          handler: (target) => {
            if (!target) {
              this.objectService.warningMessage(this.languageS.trans('Please select a folder!'));
              return false;
            }
            const groups = this.selectedByFolder();
            const requests = Object.keys(groups).map(folder => this.mailService.moveMessages(folder, groups[folder], target));
            forkJoin(requests).subscribe({
              next: (responses) => {
                responses.forEach(resp => this.objectService.responseMessage(resp));
                this.selected = [];
                this.loadFolders();
                this.reload();
              },
              error: (err) => { this.objectService.errorMessage(this.serverMessage(err)) }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  forwardSelected() {
    if (this.selected.length !== 1) {
      this.objectService.warningMessage(this.languageS.trans('Forwarding is only possible for one message.'));
      return;
    }
    const message = this.selected[0];
    this.selected = [];
    this.router.navigate(['/pages/cranix/webmail/compose'], {
      queryParams: {
        forwardFolder: message.folder,
        forwardUid: message.uid,
        subject: message.subject && message.subject.startsWith("Fwd:") ? message.subject : "Fwd: " + (message.subject || "")
      }
    });
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
                this.reload();
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
                this.reload();
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
        this.reload();
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
