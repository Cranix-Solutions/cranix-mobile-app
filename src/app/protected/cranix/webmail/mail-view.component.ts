import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
//Own stuff
import { MailService } from 'src/app/services/mail.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { MailAttachment, MailMessage } from 'src/app/shared/models/mail-model';

@Component({
  standalone: false,
  selector: 'cranix-mail-view',
  templateUrl: './mail-view.component.html',
  styleUrls: ['./mail-view.component.scss'],
})
export class MailViewComponent implements OnInit {

  @Input() message: MailMessage;
  fullMessage: MailMessage;
  loading: boolean = false;

  constructor(
    public modalController: ModalController,
    public mailService: MailService,
    public objectService: GenericObjectService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.mailService.getMessage(this.message.folder, this.message.uid).subscribe({
      next: (message) => {
        this.fullMessage = message;
        this.loading = false;
        if (!message.seen) {
          this.mailService.setSeen(this.message.folder, this.message.uid, true).subscribe({ error: () => { } });
        }
      },
      error: (err) => {
        this.loading = false;
        this.objectService.errorMessage(err);
      }
    });
  }

  close() {
    this.modalController.dismiss();
  }

  reply() {
    this.modalController.dismiss({ reply: true });
  }

  delete() {
    this.mailService.deleteMessage(this.message.folder, this.message.uid).subscribe({
      next: (resp) => {
        this.objectService.responseMessage(resp);
        if (resp.code === 'OK') {
          this.modalController.dismiss(true);
        }
      },
      error: (err) => { this.objectService.errorMessage(err) }
    });
  }

  download(attachment: MailAttachment) {
    this.mailService.downloadAttachment(this.message.folder, this.message.uid, attachment.partIndex).subscribe({
      next: (resp) => {
        const blob: Blob = new Blob([resp.body!], { type: attachment.contentType || 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = attachment.fileName || 'attachment';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => { this.objectService.errorMessage(err) }
    });
  }
}
