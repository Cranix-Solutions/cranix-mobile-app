import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
    selector: 'cranix-institute-details',
  templateUrl: './institute-details.page.html',
  styleUrls: ['./institute-details.page.scss'],
})
export class InstituteDetailsPage {
  constructor(
    public authService: AuthenticationService
  ) {}
}
