import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//Own stuff
import { MailService } from 'src/app/services/mail.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { MailMessage } from 'src/app/shared/models/mail-model';

@Component({
  standalone: false,
  selector: 'cranix-mail-compose',
  templateUrl: './mail-compose.component.html',
  styleUrls: ['./mail-compose.component.scss'],
})
export class MailComposeComponent implements OnInit {

  to: string = "";
  cc: string = "";
  bcc: string = "";
  subject: string = "";
  body: string = "";
  files: FileList;
  sending: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public mailService: MailService,
    public objectService: GenericObjectService,
    public languageS: LanguageService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['to']) {
        this.to = params['to'];
      }
      if (params['subject']) {
        this.subject = params['subject'];
      }
      if (params['forwardFolder'] && params['forwardUid']) {
        this.mailService.getMessage(params['forwardFolder'], Number(params['forwardUid'])).subscribe({
          next: (message) => {
            this.body = this.buildForwardBody(message);
          },
          error: (err) => { this.objectService.errorMessage(this.serverMessage(err)) }
        });
      }
    });
  }

  private buildForwardBody(message: MailMessage): string {
    const date = message.date ? new Date(message.date).toLocaleString() : "";
    const header = [
      '<p>---------- ' + this.languageS.trans('Forwarded message') + ' ----------</p>',
      '<p><b>' + this.languageS.trans('Sender') + ':</b> ' + this.escapeHtml(message.from) + '</p>',
      '<p><b>' + this.languageS.trans('Date') + ':</b> ' + this.escapeHtml(date) + '</p>',
      '<p><b>' + this.languageS.trans('Subject') + ':</b> ' + this.escapeHtml(message.subject) + '</p>',
      '<p><b>' + this.languageS.trans('To') + ':</b> ' + this.escapeHtml((message.to || []).join(', ')) + '</p>'
    ].join('');
    const body = message.htmlBody
      ? message.htmlBody
      : '<pre>' + this.escapeHtml(message.textBody) + '</pre>';
    return header + body;
  }

  private escapeHtml(value: string): string {
    return (value || "")
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  onFilesAdded(event) {
    this.files = event.target.files;
  }

  send() {
    const formData: FormData = new FormData();
    formData.append('to', this.to);
    formData.append('cc', this.cc);
    formData.append('bcc', this.bcc);
    formData.append('subject', this.subject);
    formData.append('body', this.body);
    if (this.files) {
      for (const file of Array.from(this.files)) {
        formData.append('files', file, file.name);
      }
    }
    this.sending = true;
    this.mailService.sendMail(formData).subscribe({
      next: (resp) => {
        this.sending = false;
        this.objectService.responseMessage(resp);
        if (resp.code === 'OK') {
          this.reset();
        }
      },
      error: (err) => {
        this.sending = false;
        this.objectService.errorMessage(this.serverMessage(err));
      }
    });
  }

  reset() {
    this.to = "";
    this.cc = "";
    this.bcc = "";
    this.subject = "";
    this.body = "";
    this.files = undefined;
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
        return err.error.value;
      }
    }
    return err.message || err.statusText || "Error";
  }
}
