import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilsService } from './utils.service';
import { AuthenticationService } from './auth.service';
import { CrxNote } from '../shared/models/data-model';
import { ServerResponse } from '../shared/models/server-models';

@Injectable({
    providedIn: 'root'
})

export class NotesService {

    url: string
    constructor(
        private  authService: AuthenticationService,
		private http: HttpClient,
        private utilsService: UtilsService
    ){
        this.url = this.utilsService.hostName() + "/crxNotes"
    }

    add(note: CrxNote){
        if(note.id == 0) {
            return this.http.post<ServerResponse>(this.url, note, { headers:  this.authService.headers  });
        } else {
            return this.http.patch<ServerResponse>(this.url, note, { headers:  this.authService.headers  });
        }
    }

    get(){
        return this.http.get<CrxNote[]>(this.url, { headers:  this.authService.headers  });
    }

    getByFilter(note: CrxNote){
        return this.http.post<CrxNote[]>(this.url +"/filter", note, { headers:  this.authService.headers  });
    }


    getById(id: number){
        return this.http.get<CrxNote>(this.url + `/${id}`, { headers:  this.authService.headers  });
    }

    delete(id: number){
        return this.http.delete<ServerResponse>(this.url + `/${id}`, { headers:  this.authService.headers  });
    }

    patch(note: CrxNote){
        return this.http.patch<ServerResponse>(this.url, note, { headers:  this.authService.headers  });
    }
}