import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UtilsService } from './utils.service';
import { AuthenticationService } from './auth.service';
import { Document, DocumentFolder, DocumentRight, DocumentVersion } from '../shared/models/data-model';
import { ServerResponse } from '../shared/models/server-models';

@Injectable({
    providedIn: 'root'
})

export class DocumentsService {

    url: string
    constructor(
        private authService: AuthenticationService,
        private http: HttpClient,
        private utilsService: UtilsService
    ) {
        this.url = this.utilsService.hostName() + "/documents"
    }

    get() {
        return this.http.get<Document[]>(this.url, { headers: this.authService.headers });
    }

    search(filter: Document) {
        return this.http.post<Document[]>(this.url + "/search", filter, { headers: this.authService.headers });
    }

    getById(id: number) {
        return this.http.get<Document>(this.url + `/${id}`, { headers: this.authService.headers });
    }

    add(fd: FormData) {
        return this.http.post<ServerResponse>(this.url, fd, { headers: this.authService.formHeaders });
    }

    patch(document: Document) {
        return this.http.patch<ServerResponse>(this.url + `/${document.id}`, document, { headers: this.authService.headers });
    }

    delete(id: number) {
        return this.http.delete<ServerResponse>(this.url + `/${id}`, { headers: this.authService.headers });
    }

    getContent(id: number) {
        return this.http.get<Blob>(this.url + `/${id}/content`, {
            headers: this.authService.headers,
            observe: 'response',
            responseType: 'blob' as 'json'
        });
    }

    getVersions(id: number) {
        return this.http.get<DocumentVersion[]>(this.url + `/${id}/versions`, { headers: this.authService.headers });
    }

    addVersion(id: number, fd: FormData) {
        return this.http.post<ServerResponse>(this.url + `/${id}/versions`, fd, { headers: this.authService.formHeaders });
    }

    getVersionContent(id: number, versionNumber: number) {
        return this.http.get<Blob>(this.url + `/${id}/versions/${versionNumber}/content`, {
            headers: this.authService.headers,
            observe: 'response',
            responseType: 'blob' as 'json'
        });
    }

    restore(id: number, versionNumber: number) {
        return this.http.put<ServerResponse>(this.url + `/${id}/versions/${versionNumber}/restore`, null, { headers: this.authService.headers });
    }

    deleteVersion(id: number, versionNumber: number) {
        return this.http.delete<ServerResponse>(this.url + `/${id}/versions/${versionNumber}`, { headers: this.authService.headers });
    }

    getRights(id: number) {
        return this.http.get<DocumentRight[]>(this.url + `/${id}/rights`, { headers: this.authService.headers });
    }

    addRight(id: number, right: DocumentRight) {
        return this.http.post<ServerResponse>(this.url + `/${id}/rights`, right, { headers: this.authService.headers });
    }

    removeRight(id: number, rightId: number) {
        return this.http.delete<ServerResponse>(this.url + `/${id}/rights/${rightId}`, { headers: this.authService.headers });
    }

    getFolders() {
        return this.http.get<DocumentFolder[]>(this.url + "/folders", { headers: this.authService.headers });
    }

    createFolder(folder: DocumentFolder) {
        return this.http.post<ServerResponse>(this.url + "/folders", folder, { headers: this.authService.headers });
    }

    getFolder(id: number) {
        return this.http.get<DocumentFolder>(this.url + "/folders/" + id, { headers: this.authService.headers });
    }

    patchFolder(id: number, folder: DocumentFolder) {
        return this.http.patch<ServerResponse>(this.url + "/folders/" + id, folder, { headers: this.authService.headers });
    }

    deleteFolder(id: number) {
        return this.http.delete<ServerResponse>(this.url + "/folders/" + id, { headers: this.authService.headers });
    }

    getSubFolders(id: number) {
        return this.http.get<DocumentFolder[]>(this.url + "/folders/" + id + "/subfolders", { headers: this.authService.headers });
    }

    getDocumentsOfFolder(id: number) {
        return this.http.get<Document[]>(this.url + "/folders/" + id + "/documents", { headers: this.authService.headers });
    }

    moveDocument(id: number, folderId: number) {
        return this.http.put<ServerResponse>(this.url + `/${id}/folder/${folderId}`, null, { headers: this.authService.headers });
    }

    moveToRoot(id: number) {
        return this.http.delete<ServerResponse>(this.url + `/${id}/folder`, { headers: this.authService.headers });
    }

    download(resp: HttpResponse<Blob>, fallbackName: string) {
        const contentType = resp.headers.get('Content-Type') || 'application/octet-stream';
        const blob: Blob = new Blob([resp.body!], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const contentDisposition = resp.headers.get('Content-Disposition');
        let fileName = fallbackName;
        if (contentDisposition) {
            const match = /filename[^;=\n]*=\s*(\"?)([^\";\n]+)\1/ig.exec(contentDisposition);
            if (match && match[2]) { fileName = match[2].trim().replace(/"/g, ''); }
        }
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}