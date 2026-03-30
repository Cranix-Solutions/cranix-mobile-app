import { Component } from '@angular/core';
//own modules
import { ChallengesService } from 'src/app/services/challenges.service';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
    selector: 'cranix-lessons',
  templateUrl: './lessons.page.html',
})
export class LessonsPage{

    constructor(
      public challengesService: ChallengesService,
      public authService: AuthenticationService
    ){}
    cleanUp(){
      console.log("cleanUp called")
      this.challengesService.modified = false;
    }
}