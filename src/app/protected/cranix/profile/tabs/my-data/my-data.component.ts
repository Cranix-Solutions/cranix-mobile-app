import { Component, OnInit } from '@angular/core';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SelfManagementService } from 'src/app/services/selfmanagement.service';
import { UtilsService } from 'src/app/services/utils.service';
import { DirEntry } from 'src/app/shared/models/data-model';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss'],
})
export class MyDataComponent  implements OnInit {

  myHome: string = ""
  actDir: string = ""
  dirList: DirEntry[] = []
  disabled: boolean = true
  files: any[];
  isCreateDirOpen: boolean = false
  isDeleteOpen: boolean = false
  isUploadOpen: boolean = false
  newDirName: string = ""
  selectedEntry: DirEntry;
  constructor(
    private selfService: SelfManagementService,
    private objService: GenericObjectService,
    public authService: AuthenticationService,
    public utilsService: UtilsService
  ) {
    console.log('MyDataComponment called')
  }
  ngOnInit() {
    if(this.authService.session.role == 'sysadmins' ) {
      this.actDir = '/home'
      this.myHome = this.actDir
      this.listActDir()
    }else{
      this.selfService.getHome().subscribe(
        (val) => {
          this.actDir = val
          this.myHome = this.actDir.slice(0,-1)
          this.listActDir()
        }
      )
    }
  }

  listActDir(){
    this.selfService.getDir(this.actDir).subscribe(
      (val) => {
        this.dirList = val
        this.disabled = false
      }
    )
  }

  closeModal(modal){
    modal.dismiss()
    this.newDirName = ""
    this.isCreateDirOpen = false
    this.isDeleteOpen = false
    this.isUploadOpen = false
    this.disabled = false
    this.selectedEntry = new DirEntry();
  }

  open(entry: DirEntry) {
    this.disabled = true
    if(entry.type == "d") {
      if(entry.path.startsWith(this.myHome)){
        this.actDir = entry.path
        this.listActDir()
      }else{
        this.disabled = false;
        this.objService.errorMessage("You have no access in this directory")
      }
    }else{
      this.selfService.getFile(entry.path).subscribe(
        (resp) => {
          const contentType = resp.headers.get('Content-Type') || 'application/octet-stream';
          const blob: Blob = new Blob([resp.body!], { type: contentType });

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;

          // Optionaler Dateiname aus Header (Content-Disposition)
          const contentDisposition = resp.headers.get('Content-Disposition');
          let fileName = 'download';
          if (contentDisposition) {
            const match = /filename[^;=\n]*=\s*(\"?)([^\";\n]+)\1/ig.exec(contentDisposition);
            if (match && match[2]) {
              fileName = match[2].trim().replace(/"/g, '');
            }
          }
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          this.disabled = false
        }
      )
    }
  }
  createDir(){
    this.disabled = true
    this.isCreateDirOpen = true
  }

  createDirRealy(modal){
    this.selfService.createDir(this.actDir, this.newDirName).subscribe(
      (val) => {
        this.objService.responseMessage(val)
        this.listActDir()
        this.closeModal(modal)
      }
    )
  }

  delete(event, entry: DirEntry){
    event.stopPropagation()
    this.selectedEntry = entry
    this.isDeleteOpen = true
  }

  deleteRealy(modal){
    this.selfService.deleteFile(this.selectedEntry.path).subscribe(
      (val) => {
        this.objService.responseMessage(val)
        this.closeModal(modal)
        this.listActDir()
      }
    )
  }

  getIcon(entry: DirEntry){
    if (entry.type.startsWith('image')) return 'image'
    if (entry.type.startsWith('video')) return 'film'
    if (entry.type.startsWith('audio')) return 'recording'
    if (entry.type.startsWith('text')) return 'document-text'
    switch(entry.type){
      case ('application/x-sh'): return 'terminal'
      case ('application/pdf'): return 'document'
    }
    return 'reader'
  }

  onFilesAdded(event) {
    this.files = event.target.files;
  }

  upload(entry: DirEntry){
    this.isUploadOpen = true
    if(entry){
      this.selectedEntry = entry
    }else{
      entry = new DirEntry
      entry.path = this.actDir
      this.selectedEntry = entry
    }
  }

  async uploadRealy(modal)
  {
    this.disabled = true
    const count = this.files.length
    let i = 0
    this.objService.requestSent()
    for(let file of this.files){
      let fd = new FormData();
      console.log(file.name)
      fd.append('dirPath',this.selectedEntry.path)
      fd.append('file', file, file.name);
      let val = await firstValueFrom(this.selfService.uploadFile(fd))
      this.objService.responseMessage(val)
    }
    this.disabled = false
    modal.dismiss()
    this.isUploadOpen = false;
    this.listActDir()
  }

  /* uploadRealy(modal)
  {
    this.disabled = true
    const count = this.files.length
    let i = 0
    for(let file of this.files){
      let fd = new FormData();
      console.log(file.name)
      fd.append('dirPath',this.selectedEntry.path)
      fd.append('file', file, file.name);
      this.selfService.uploadFile(fd).subscribe(
        (val) => {
          this.objService.responseMessage(val)
          i++
          if( i == count) {
            this.disabled = false
            modal.dismiss()
            this.isUploadOpen = false;
            this.listActDir()
          }
        }
      )
    }
  }*/
}
