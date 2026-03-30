import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: false,
    selector: 'cranix-rooms-lists',
  templateUrl: './rooms-lists.page.html'
})      
export class RoomsListsPage {
  constructor(
    public authService: AuthenticationService,
    public translateService: TranslateService
  ) {}  
}
