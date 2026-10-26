import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//Own stuff
import { UtilsService } from './utils.service';
import { AuthenticationService } from './auth.service';
import { ServerResponse } from 'src/app/shared/models/server-models';
import { MailConfig, MailFolder, MailMessage } from 'src/app/shared/models/mail-model';

@Injectable()
export class MailService {

	hostname: string;
	url: string;

	constructor(
		private http: HttpClient,
		private utilsService: UtilsService,
		private authService: AuthenticationService) {
		this.hostname = this.utilsService.hostName();
	}

	getConfig() {
		this.url = this.hostname + '/mail/config';
		return this.http.get<MailConfig>(this.url, { headers: this.authService.headers });
	}

	getFolders() {
		this.url = this.hostname + '/mail/folders';
		return this.http.get<MailFolder[]>(this.url, { headers: this.authService.headers });
	}

	getMessages(folder: string, limit: number = 50, offset: number = 0) {
		this.url = this.hostname + '/mail/messages/' + encodeURIComponent(folder) + `?limit=${limit}&offset=${offset}`;
		return this.http.get<MailMessage[]>(this.url, { headers: this.authService.headers });
	}

	getMessage(folder: string, uid: number) {
		this.url = this.hostname + '/mail/message/' + encodeURIComponent(folder) + '/' + uid;
		return this.http.get<MailMessage>(this.url, { headers: this.authService.headers });
	}

	downloadAttachment(folder: string, uid: number, partIndex: number) {
		this.url = this.hostname + '/mail/message/' + encodeURIComponent(folder) + '/' + uid + '/attachment/' + partIndex;
		return this.http.get(this.url, { headers: this.authService.anyHeaders, responseType: 'blob', observe: 'response' });
	}

	sendMail(formData: FormData) {
		this.url = this.hostname + '/mail/send';
		return this.http.post<ServerResponse>(this.url, formData, { headers: this.authService.formHeaders });
	}

	deleteMessage(folder: string, uid: number) {
		this.url = this.hostname + '/mail/message/' + encodeURIComponent(folder) + '/' + uid;
		return this.http.delete<ServerResponse>(this.url, { headers: this.authService.headers });
	}

	setSeen(folder: string, uid: number, seen: boolean) {
		this.url = this.hostname + '/mail/message/' + encodeURIComponent(folder) + '/' + uid + '/seen/' + seen;
		return this.http.put<ServerResponse>(this.url, null, { headers: this.authService.headers });
	}
}
