import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from './utils.service';
import { AuthenticationService } from './auth.service';
import { CrxTicket, CrxTicketArticle } from '../shared/models/data-model';
import { ServerResponse, CrxTicketStatus } from '../shared/models/server-models';

@Injectable({
  providedIn: 'root'
})
export class CrxTicketService {
  url: string;

  constructor(
    private utilsService: UtilsService,
    private http: HttpClient,
    private authService: AuthenticationService) {
    this.url = this.utilsService.hostName() + '/crxtickets';
  }

  getAllTickets(status: string = "NWRD") {
    return this.http.get<CrxTicket[]>(`${this.url}/all?status=${status}`, { headers: this.authService.headers });
  }

  getMyTickets(status: string) {
    return this.http.get<CrxTicket[]>(`${this.url}/created/${status}`, { headers: this.authService.headers });
  }

  getTicketsForMe(status: string) {
    return this.http.get<CrxTicket[]>(`${this.url}/my/${status}`, { headers: this.authService.headers });
  }

  getTicket(id: number) {
    return this.http.get<CrxTicket>(`${this.url}/${id}/ticket`, { headers: this.authService.headers });
  }

  getArticles(id: number) {
    return this.http.get<CrxTicketArticle[]>(`${this.url}/${id}`, { headers: this.authService.headers });
  }

  addTicket(ticket: CrxTicket) {
    return this.http.post<ServerResponse>(`${this.url}`, ticket, { headers: this.authService.headers });
  }

  addArticle(id: number, article: CrxTicketArticle) {
    return this.http.post<ServerResponse>(`${this.url}/${id}`, article, { headers: this.authService.headers });
  }

  close(id: number) {
    return this.http.delete<ServerResponse>(`${this.url}/${id}`, { headers: this.authService.headers });
  }

  delete(id: number) {
    return this.http.delete<ServerResponse>(`${this.url}/${id}/delete`, { headers: this.authService.headers });
  }

  assignToMe(ticketId: number, userId: number) {
    return this.http.put<ServerResponse>(`${this.url}/${ticketId}/${userId}`, null, { headers: this.authService.headers });
  }

  getStatus() {
    return this.http.get<CrxTicketStatus>(`${this.url}/status`, { headers: this.authService.headers });
  }
}
