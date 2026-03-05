import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UtilsService } from './utils.service';
import { AuthenticationService } from './auth.service';
import { ServerResponse } from 'src/app/shared/models/server-models';
import { Course, CrxCalendar } from 'src/app/shared/models/data-model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  url: string;
  modified: boolean = false;

  constructor(private http: HttpClient,
    private utilsService: UtilsService,
    private authService: AuthenticationService)
  {
    this.url = this.utilsService.hostName() + "/courses";
  }

  add(cours: Course){
    return this.http.post<ServerResponse>(this.url, cours, { headers: this.authService.headers })
  }
  patch(cours: Course){
    return this.http.patch<ServerResponse>(this.url, cours, { headers: this.authService.headers })
  }
  
}
