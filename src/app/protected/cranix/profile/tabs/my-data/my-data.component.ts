import { Component, OnInit } from '@angular/core';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SelfManagementService } from 'src/app/services/selfmanagement.service';
import { UtilsService } from 'src/app/services/utils.service';
import { DirEntry } from 'src/app/shared/models/data-model';

@Component({
  standalone: false,
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss'],
})
export class MyDataComponent  implements OnInit {

  actDir: string = ""
  dirList: DirEntry[] = []
  isDeleteOpen: boolean = false
  selectedEntry: DirEntry;
  constructor(
    private selfService: SelfManagementService,
    private objService: GenericObjectService,
    public authService: AuthenticationService,
    public utilService: UtilsService
  ) {
    console.log('MyDataComponment called')
  }

  ngOnInit() {
    this.selfService.getDir(this.actDir).subscribe(
      (val) => {
        console.log(val)
        this.dirList = val
      }
    )
  }

  open(entry: DirEntry) {
    if(entry.type == "d") {
      this.selfService.getDir(entry.path).subscribe(
        (val) => {
          console.log(val)
          this.dirList = val
          this.actDir = entry.path
        }
      )
    }
  }
  createNewDir(){

  }

  delete(entry: DirEntry){
    this.selectedEntry = entry
    this.isDeleteOpen = true
  }

  deleteRealy(){
    this.selfService.deleteFile(this.selectedEntry.path).subscribe(
      (val) => {
        this.isDeleteOpen = false
        this.selectedEntry = undefined
        this.objService.responseMessage(val)
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
}
