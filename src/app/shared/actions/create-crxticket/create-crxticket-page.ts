import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CrxTicketService } from 'src/app/services/crxticket.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CrxTicket } from '../../models/data-model';

@Component({
  standalone: false,
  selector: 'create-crxticket-page',
  styleUrls: ['./create-crxticket.css'],
  templateUrl: 'create-crxticket.html'
})
export class CreateCrxTicket {

  disabled: boolean = false;
  files = [];
  @Input() ticket: CrxTicket

  constructor(
    public modalController: ModalController,
    public crxTicketService: CrxTicketService,
    public objectService: GenericObjectService,
    public authService: AuthenticationService
  ) { }

  onFilesAdded(event, modal) {
    this.files = event.target.files;
    modal.dismiss();
  }

  addAttachment() {
    for (let file of this.files) {
      this.ticket.attachmentName = file.name;
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        let index = e.target.result.toString().indexOf("base64,") + 7;
        this.ticket.attachment = e.target.result.toString().substring(index);
      }
      fileReader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.disabled = true;
    this.ticket.devices = (this.ticket.devices || []).map(device => ({ id: device.id } as any));
    this.ticket.rooms = (this.ticket.rooms || []).map(room => ({ id: room.id } as any));
    this.crxTicketService.addTicket(this.ticket).subscribe({
      next: (val) => {
        this.objectService.responseMessage(val);
        if (val.code == "OK") {
          this.modalController.dismiss("OK");
        }
      },
      error: (err) => {
        this.objectService.errorMessage(err);
        this.disabled = false;
      },
      complete: () => { this.disabled = false; }
    });
  }
}
