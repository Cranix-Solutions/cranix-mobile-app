import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from 'src/app/services/auth.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { DocumentsService } from 'src/app/services/documents.service';
import { Document, DocumentFolder, DocumentRight, DocumentVersion, Group, User } from 'src/app/shared/models/data-model';

@Component({
    standalone: false,
    selector: 'cranix-documents',
    templateUrl: './documents.page.html',
    styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

    scope: string = 'my'
    viewMode: string = 'list'
    users: any[] = []
    groups: any[] = []
    searchText: string = ""

    allDocs: Document[] = []
    folders: DocumentFolder[] = []
    currentFolder: DocumentFolder = null
    folderPath: DocumentFolder[] = []
    currentDocs: Document[] = []
    currentFolders: DocumentFolder[] = []

    selectedDocument: Document = new Document()
    versions: DocumentVersion[] = []
    rights: DocumentRight[] = []
    moveFolders: DocumentFolder[] = []
    moveTarget: number = 0

    isDocumentFormOpen: boolean = false
    isFolderFormOpen: boolean = false
    isVersionsOpen: boolean = false
    isRightsOpen: boolean = false
    isMoveOpen: boolean = false
    isEditOpen: boolean = false

    docName: string = ""
    docDescription: string = ""
    docTags: string = ""
    docProtected: boolean = false
    docUploadFile: File = null

    newFolderName: string = ""
    newFolderDescription: string = ""

    newVersionComment: string = ""
    newVersionFile: File = null

    editName: string = ""
    editDescription: string = ""
    editTags: string = ""
    editProtected: boolean = false

    rightUser: User = new User()
    rightGroup: Group = new Group()
    rightMayWrite: boolean = false

    constructor(
        public authService: AuthenticationService,
        public objectService: GenericObjectService,
        public languageS: LanguageService,
        public alertCtrl: AlertController,
        private documentsService: DocumentsService,
        private storage: Storage
    ) {
    }

    ngOnInit() {
        this.storage.get('documentsViewMode').then(val => {
            if (val) {
                this.viewMode = val;
            }
        });
        this.loadSelectors();
        this.readData();
    }

    setViewMode(mode: string) {
        this.viewMode = mode;
        this.storage.set('documentsViewMode', mode);
    }

    loadSelectors() {
        this.objectService.getObjects('user').then(resp => resp.json()).then(val => this.users = val);
        this.objectService.getObjects('group').then(resp => resp.json()).then(val => this.groups = val);
    }

    readData() {
        if (this.scope == 'my') {
            this.documentsService.getFolders().subscribe(val => {
                this.folders = val;
                this.updateCurrentView();
            });
        } else {
            this.folders = [];
        }
        let filter: Document = {} as Document;
        if (this.searchText && this.searchText.length > 0) {
            filter.name = this.searchText;
        }
        this.documentsService.search(filter).subscribe(val => {
            this.allDocs = val;
            this.updateCurrentView();
        });
    }

    ownDocument(document: Document) {
        return document.creatorId && document.creatorId == this.authService.session.userId;
    }

    isVersionOwner(version: DocumentVersion) {
        return !!version.creator && version.creator.id == this.authService.session.userId;
    }

    updateCurrentView() {
        if (this.scope == 'shared') {
            this.currentFolders = [];
            this.currentDocs = this.allDocs.filter(d => !this.ownDocument(d));
            return;
        }
        let owned = this.allDocs.filter(d => this.ownDocument(d));
        let folderIds = this.folders.map(f => f.id);
        if (this.currentFolder) {
            this.currentFolders = this.folders.filter(f => f.parentFolderId == this.currentFolder.id);
            this.currentDocs = owned.filter(d => d.folderId == this.currentFolder.id);
        } else {
            this.currentFolders = this.folders.filter(f => !f.parentFolderId || f.parentFolderId == 0);
            this.currentDocs = owned.filter(d => !d.folderId || folderIds.indexOf(d.folderId) == -1);
        }
    }

    scopeChanged() {
        this.currentFolder = null;
        this.folderPath = [];
        this.readData();
    }

    enterFolder(folder: DocumentFolder) {
        if (this.currentFolder) {
            this.folderPath.push(this.currentFolder);
        }
        this.currentFolder = folder;
        this.updateCurrentView();
    }

    enterParentFolder() {
        if (this.folderPath.length == 0) {
            this.currentFolder = null;
        } else {
            this.currentFolder = this.folderPath.pop();
        }
        this.updateCurrentView();
    }

    goToRoot() {
        this.currentFolder = null;
        this.folderPath = [];
        this.updateCurrentView();
    }

    onDocFileSelected(event) {
        this.docUploadFile = event.target.files[0];
    }

    submitDocument() {
        if (!this.docUploadFile) {
            this.objectService.warningMessage(this.languageS.trans('Please select a file to upload!'));
            return;
        }
        let fd = new FormData();
        fd.append('file', this.docUploadFile, this.docUploadFile.name);
        if (this.docName && this.docName.length > 0) { fd.append('name', this.docName); }
        if (this.docDescription && this.docDescription.length > 0) { fd.append('description', this.docDescription); }
        if (this.docTags && this.docTags.length > 0) { fd.append('tags', this.docTags); }
        if (this.docProtected) { fd.append('isVersionProtected', 'true'); }
        if (this.currentFolder && this.currentFolder.id > 0) { fd.append('folderId', "" + this.currentFolder.id); }
        this.objectService.requestSent();
        this.documentsService.add(fd).subscribe(val => {
            this.objectService.responseMessage(val);
            this.closeDocumentForm();
            this.readData();
        });
    }

    closeDocumentForm() {
        this.isDocumentFormOpen = false;
        this.docName = "";
        this.docDescription = "";
        this.docTags = "";
        this.docProtected = false;
        this.docUploadFile = null;
    }

    downloadDocument(document: Document) {
        this.documentsService.getContent(document.id).subscribe(resp => {
            this.documentsService.download(resp, document.fileName);
        });
    }

    async deleteDocument(document: Document) {
        const alert = await this.alertCtrl.create({
            header: this.languageS.trans('Confirm!'),
            message: this.languageS.trans('Do you realy want to delete?') + " " + document.name,
            buttons: [
                { text: this.languageS.trans('Cancel'), role: 'cancel' },
                {
                    text: this.languageS.trans('OK'),
                    handler: () => {
                        this.documentsService.delete(document.id).subscribe(val => {
                            this.objectService.responseMessage(val);
                            this.readData();
                        });
                    }
                }
            ]
        });
        alert.present();
    }

    openEdit(document: Document) {
        this.selectedDocument = document;
        this.editName = document.name;
        this.editDescription = document.description;
        this.editTags = document.tags;
        this.editProtected = document.isVersionProtected;
        this.isEditOpen = true;
    }

    submitEdit() {
        let document = new Document();
        document.id = this.selectedDocument.id;
        document.name = this.editName;
        document.description = this.editDescription;
        document.tags = this.editTags;
        if (this.ownDocument(this.selectedDocument)) {
            document.isVersionProtected = this.editProtected;
        }
        this.objectService.requestSent();
        this.documentsService.patch(document).subscribe(val => {
            this.objectService.responseMessage(val);
            this.isEditOpen = false;
            this.readData();
        });
    }

    submitFolder() {
        if (!this.newFolderName || this.newFolderName.length == 0) {
            this.objectService.warningMessage(this.languageS.trans('A folder name must be set!'));
            return;
        }
        let folder = new DocumentFolder();
        folder.name = this.newFolderName;
        folder.description = this.newFolderDescription;
        if (this.currentFolder && this.currentFolder.id > 0) {
            folder.parentFolderId = this.currentFolder.id;
        } else {
            folder.parentFolderId = null;
        }
        this.objectService.requestSent();
        this.documentsService.createFolder(folder).subscribe(val => {
            this.objectService.responseMessage(val);
            this.closeFolderForm();
            this.readData();
        });
    }

    closeFolderForm() {
        this.isFolderFormOpen = false;
        this.newFolderName = "";
        this.newFolderDescription = "";
    }

    async deleteFolder(folder: DocumentFolder) {
        const alert = await this.alertCtrl.create({
            header: this.languageS.trans('Confirm!'),
            message: this.languageS.trans('Do you realy want to delete?') + " " + folder.name,
            buttons: [
                { text: this.languageS.trans('Cancel'), role: 'cancel' },
                {
                    text: this.languageS.trans('OK'),
                    handler: () => {
                        this.documentsService.deleteFolder(folder.id).subscribe(val => {
                            this.objectService.responseMessage(val);
                            if (this.currentFolder && this.currentFolder.id == folder.id) {
                                this.goToRoot();
                            } else {
                                this.readData();
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    }

    openVersions(document: Document) {
        this.selectedDocument = document;
        this.isVersionsOpen = true;
        this.loadVersions();
    }

    loadVersions() {
        this.documentsService.getVersions(this.selectedDocument.id).subscribe(val => {
            this.versions = val;
        });
    }

    onVersionFileSelected(event) {
        this.newVersionFile = event.target.files[0];
    }

    addVersion() {
        if (!this.newVersionFile) {
            this.objectService.warningMessage(this.languageS.trans('Please select a file to upload!'));
            return;
        }
        let fd = new FormData();
        fd.append('file', this.newVersionFile, this.newVersionFile.name);
        if (this.newVersionComment && this.newVersionComment.length > 0) {
            fd.append('comment', this.newVersionComment);
        }
        this.objectService.requestSent();
        this.documentsService.addVersion(this.selectedDocument.id, fd).subscribe(val => {
            this.objectService.responseMessage(val);
            this.newVersionFile = null;
            this.newVersionComment = "";
            this.loadVersions();
            this.readData();
        });
    }

    downloadVersion(version: DocumentVersion) {
        this.documentsService.getVersionContent(this.selectedDocument.id, version.versionNumber).subscribe(resp => {
            let fileName = version.fileName;
            if (version.creator && version.creator.id != this.selectedDocument.creatorId) {
                fileName = version.creator.fullName + "_" + fileName;
            }
            this.documentsService.download(resp, fileName);
        });
    }

    restoreVersion(version: DocumentVersion) {
        this.documentsService.restore(this.selectedDocument.id, version.versionNumber).subscribe(val => {
            this.objectService.responseMessage(val);
            this.loadVersions();
            this.readData();
        });
    }

    async deleteVersion(version: DocumentVersion) {
        if (!this.ownDocument(this.selectedDocument) && !this.isVersionOwner(version)) {
            this.objectService.warningMessage(this.languageS.trans('You are not allowed to delete this version!'));
            return;
        }
        const alert = await this.alertCtrl.create({
            header: this.languageS.trans('Confirm!'),
            message: this.languageS.trans('Do you realy want to delete?') + " " + version.fileName,
            buttons: [
                { text: this.languageS.trans('Cancel'), role: 'cancel' },
                {
                    text: this.languageS.trans('OK'),
                    handler: () => {
                        this.documentsService.deleteVersion(this.selectedDocument.id, version.versionNumber).subscribe(val => {
                            this.objectService.responseMessage(val);
                            this.loadVersions();
                            this.readData();
                        });
                    }
                }
            ]
        });
        alert.present();
    }

    openRights(document: Document) {
        this.selectedDocument = document;
        this.isRightsOpen = true;
        this.loadRights();
    }

    loadRights() {
        this.documentsService.getRights(this.selectedDocument.id).subscribe(val => {
            this.rights = val;
        });
    }

    addRight() {
        let right = {} as DocumentRight;
        if (this.rightUser.id > 0) {
            right.userId = this.rightUser.id;
        } else if (this.rightGroup.id > 0) {
            right.groupId = this.rightGroup.id;
        } else {
            this.objectService.warningMessage(this.languageS.trans('Please select a user or a group!'));
            return;
        }
        right.mayWrite = this.rightMayWrite;
        this.objectService.requestSent();
        this.documentsService.addRight(this.selectedDocument.id, right).subscribe(val => {
            this.objectService.responseMessage(val);
            this.resetRightForm();
            this.loadRights();
        });
    }

    resetRightForm() {
        this.rightUser = new User();
        this.rightGroup = new Group();
        this.rightMayWrite = false;
    }

    rightLabel(right: DocumentRight) {
        let user = this.users.find(u => u.id == right.userId);
        if (user) { return user.fullName; }
        let group = this.groups.find(g => g.id == right.groupId);
        if (group) { return group.name; }
        return right.userId > 0 ? "#" + right.userId : "#" + right.groupId;
    }

    removeRight(right: DocumentRight) {
        this.documentsService.removeRight(this.selectedDocument.id, right.id).subscribe(val => {
            this.objectService.responseMessage(val);
            this.loadRights();
        });
    }

    openMove(document: Document) {
        this.selectedDocument = document;
        this.moveFolders = this.folders.slice();
        this.moveTarget = document.folderId ? document.folderId : 0;
        this.isMoveOpen = true;
    }

    submitMove() {
        this.objectService.requestSent();
        if (this.moveTarget == 0) {
            this.documentsService.moveToRoot(this.selectedDocument.id).subscribe(val => {
                this.objectService.responseMessage(val);
                this.isMoveOpen = false;
                this.readData();
            });
        } else {
            this.documentsService.moveDocument(this.selectedDocument.id, this.moveTarget).subscribe(val => {
                this.objectService.responseMessage(val);
                this.isMoveOpen = false;
                this.readData();
            });
        }
    }

    mimeIcon(document: Document) {
        if (!document.mimeType) { return 'document'; }
        if (document.mimeType.startsWith('image/')) { return 'image'; }
        if (document.mimeType.startsWith('video/')) { return 'videocam'; }
        if (document.mimeType.startsWith('audio/')) { return 'musical-notes'; }
        if (document.mimeType == 'application/pdf') { return 'document-attach'; }
        if (document.mimeType.startsWith('text/')) { return 'document-text'; }
        return 'document';
    }

    formatSize(size: number) {
        if (!size) { return ""; }
        if (size < 1024) { return size + " B"; }
        if (size < 1024 * 1024) { return (size / 1024).toFixed(1) + " KB"; }
        if (size < 1024 * 1024 * 1024) { return (size / (1024 * 1024)).toFixed(1) + " MB"; }
        return (size / (1024 * 1024 * 1024)).toFixed(1) + " GB";
    }
}
