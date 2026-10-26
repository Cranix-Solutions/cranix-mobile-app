import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
  selector: 'cranix-webmail',
  templateUrl: './webmail.component.html',
  styleUrls: ['./webmail.component.scss'],
})
export class WebmailComponent {
  constructor(
    public authService: AuthenticationService
  ) {}
}
