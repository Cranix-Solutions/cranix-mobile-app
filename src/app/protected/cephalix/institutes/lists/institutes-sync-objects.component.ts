import { Component, OnInit } from '@angular/core';

//Own stuff
import { AuthenticationService } from 'src/app/services/auth.service';
import { CephalixService } from 'src/app/services/cephalix.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  standalone: false,
  selector: 'cranix-institutes-sync-objects',
  templateUrl: './institutes-sync-objects.component.html'
})
export class InstitutesSyncObjectsComponent implements OnInit {

  context;
  segment = "User";
  memberData = {};
  objectsToSync: string[] = [];
  institute;
  constructor(
    public authService:     AuthenticationService,
    public cephalixService: CephalixService,
    public objectService: GenericObjectService,
    private languageS: LanguageService
  ) {
  }

  ngOnInit() {
    this.readMembers();
  }
  segmentChanged(event) {
    this.segment = event.detail.value;
  }
  readMembers() {
    let subM = this.cephalixService.getObjectsToSynchronize().subscribe(
      (val) => { 
        for( let obj of val ) {
          if( this.objectsToSync.indexOf(obj.objectType) == -1 ) {
            this.objectsToSync.push(obj.objectType)
          }
          if ( !this.memberData[obj.objectType] ) {
            this.memberData[obj.objectType] = []
          }
          this.memberData[obj.objectType].push(obj)
        }
      },
      (err) => { this.authService.log(err) },
      () => { subM.unsubscribe() });
  }
  onMemberFilterChanged(){
    //TODO
  }
  startSync(en: Event) {
    let selected = [] //TODO
    this.objectService.requestSent();
    for (let institute of this.objectService.selection) {
      for (let sel of selected) {
        let sub = this.cephalixService.putObjectToInstitute(institute.id, sel.objectType, sel.cephalixId)
          .subscribe(
            (val) => { this.authService.log("Start sync:") },
            (err) => { this.authService.log },
            () => { sub.unsubscribe() })
      }
    }
  }
  stopSync(en: Event) {
    let selected = [] //TODO
    this.objectService.requestSent();
    for (let institute of this.objectService.selection) {
      for (let sel of selected) {
        let sub = this.cephalixService.deleteObjectFromInstitute(institute.id, sel.objectType, sel.cephalixId)
          .subscribe(
            (val) => { this.authService.log("Stop sync:") },
            (err) => { this.authService.log },
            () => { sub.unsubscribe() })
      }
    }
  }
}
