import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { AuthenticationService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Article, Ticket } from '../shared/models/cephalix-data-model';
import { ServerResponse } from '../shared/models/server-models';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  url: string;

  constructor(
    private utilsService: UtilsService,
    private http: HttpClient,
    private authService: AuthenticationService) {
    this.url = this.utilsService.hostName() + '/support';
  }

  getTickets(status: string){
    console.log("getTickets called")
    return this.http.get<Ticket[]>( `${this.url}/${status}` , { headers: this.authService.headers });
  }

  getArticles(id: number) {
    return this.http.get<Article[]>( `${this.url}/tickets/${id}` , { headers: this.authService.headers })
  }

  addArticle(id: number, article: Article){
    return this.http.post<ServerResponse>(`${this.url}/tickets/${id}`, article, { headers: this.authService.headers })
  }
}
