import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UtilsService } from './utils.service';
import { AuthenticationService } from './auth.service';
import { ServerResponse } from 'src/app/shared/models/server-models';
import { Course, CrxCalendar } from 'src/app/shared/models/data-model';
import { GenericObjectService } from './generic-object.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
  url: string;
  modified: boolean = false;

  constructor(private http: HttpClient,
    private authService: AuthenticationService,
    private objectService: GenericObjectService,
    private utilsService: UtilsService,
    )
  {
    this.url = this.utilsService.hostName() + "/courses";
  }

  add(cours: Course){
    return this.http.post<ServerResponse>(this.url, cours, { headers: this.authService.headers })
  }
  patch(cours: Course){
    return this.http.patch<ServerResponse>(this.url, cours, { headers: this.authService.headers })
  }
  getById(id: number){
    const url = `${this.url}/${id}`
    return this.http.get<Course>(url, { headers: this.authService.headers } )
  }

  getByIdFree(id: number){
    const url = `${this.url}/${id}/free`
    return this.http.get<Course>(url, { headers: this.authService.headers } )
  }

  getLastChange(id: number) {
    const url = `${this.url}/${id}/lastChange`
    return this.http.post<Date>(url,  { headers: this.authService.headers })
  }

  register(id: number) {
    const url = `${this.url}/appointments/${id}`
    return this.http.put<ServerResponse>(url, { headers: this.authService.headers } )
  }

  withdrawing(id: number) {
    const url = `${this.url}/appointments/${id}`
    return this.http.delete<ServerResponse>(url, { headers: this.authService.headers } )
  }

  sendMails(id: number) {
    const url = `${this.url}/${id}`
    return this.http.put<ServerResponse>(url, { headers: this.authService.headers } ).subscribe(
      (val) => this.objectService.responseMessage(val)
    )
  }
}
