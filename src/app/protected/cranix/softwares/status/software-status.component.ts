import { Component, OnInit } from '@angular/core';
//Own stuff
import { AuthenticationService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language.service';
import { SoftwareService } from 'src/app/services/softwares.service'
import { SoftwareStatus } from 'src/app/shared/models/data-model';

@Component({
  standalone: false,
    selector: 'cranix-software-status',
  templateUrl: './software-status.component.html',
  styleUrls: ['./software-status.component.scss'],
})
export class SoftwareStatusComponent {
  context;
  softwareData: SoftwareStatus[] = [];
  softwareDataBack: SoftwareStatus[] = [];
  selectedRooms = [];
  selectedSoftwares = [];
  selectedStati = [];
  rooms = [];
  softwares = [];
  stati  = [];
  ready: boolean = false;
  constructor(
    public authService: AuthenticationService,
    public softwareService: SoftwareService,
    private languageService: LanguageService
  ) {
    this.context = { componentParent: this };
    this.readSoftwareData();
  }

  readSoftwareData() {
    this.softwareService.getSoftwareStatus().subscribe(
      (val) => {
        this.ready = false;
        this.softwareData = val;
        console.log(val);
        for (let obj of this.softwareData) {
          if (this.softwares. filter( o => o.id == obj.softwareName ).length == 0 ) {
            this.softwares.push({ id: obj.softwareName, name: obj.softwareName })
          }
          if (this.rooms.filter( o => o.id == obj.roomName ).length == 0) {
            this.rooms.push({ id: obj.roomName, name: obj.roomName })
          }
          if (this.stati.filter(o => o.id == obj.status).length == 0) {
            this.stati.push({ id: obj.status, name: this.languageService.trans(obj.status)})
          }
        }
        this.stati.sort()
        this.softwares.sort()
        this.rooms.sort()
        console.log(this.rooms)
        this.ready = true;
      })
  }

  readFilteredSoftwareData() {
    this.ready = false;
    if (this.softwareDataBack.length == 0) {
      this.softwareDataBack = this.softwareData;
    }
    let tmp = [];
    for (let obj of this.softwareDataBack) {
      if (this.selectedRooms.length == 0 || this.selectedRooms.filter(o=>o.id == obj.roomName).length > 0) {
        if (this.selectedSoftwares.length == 0 || this.selectedSoftwares.filter(o => o.id == obj.softwareName).length > 0 ) {
          if (this.selectedStati.length == 0 || this.selectedStati.filter(o => o.id == obj.status).length > 0) {
            tmp.push(obj)
          }
        }
      }
    }
    this.softwareData = tmp;
    this.ready = true
  }
}
