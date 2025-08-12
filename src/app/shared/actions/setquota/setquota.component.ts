import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/auth.service';


@Component({
  standalone: false,
    selector: 'cranix-setquota',
  templateUrl: './setquota.component.html',
  styleUrls: ['./setquota.component.scss'],
})
export class SetquotaComponent implements OnInit {

  @Input() type: string;
  quota = 500;
  title = "Set filesystemquota for the selected users";
  constructor(
    public modalController: ModalController,
    public authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    if(this.type == "mail") {
      this.title = "Set mailsystemquota for the selected users";
      this.quota = 50;
    }
  }

  onSubmit() {
    this.modalController.dismiss(this.quota);
  }

}
