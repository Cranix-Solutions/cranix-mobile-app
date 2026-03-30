import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
    selector: 'cranix-devices-lists',
  templateUrl: './devices-lists.page.html'
})      
export class DevicesListsPage {
  constructor(
    public authService: AuthenticationService
  ) {}  
}
