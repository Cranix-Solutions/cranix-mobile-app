import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//Own stuff
import { MailService } from 'src/app/services/mail.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';

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
    public objectService: GenericObjectService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['to']) {
        this.to = params['to'];
      }
      if (params['subject']) {
        this.subject = params['subject'];
      }
    });
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
        this.objectService.errorMessage(err);
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
}
