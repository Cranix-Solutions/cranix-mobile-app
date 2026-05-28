import { Component } from '@angular/core';

//Our Stuff
import { PositivList, SubjectArea, TeachingSubject } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language.service';
import { EductaionService } from 'src/app/services/education.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { CrxObjectService } from 'src/app/services/crx-object-service';

@Component({
  standalone: false,
  selector: 'cranix-mypositive',
  templateUrl: './mypositive.component.html',
  styleUrls: ['./mypositive.component.scss'],
})
export class MypositiveComponent {

  addEditTitle: string = "";
  isAddEditOpen: boolean = false
  action: string
  disabled: boolean = false
  selectedPositiveList: PositivList
  selectedTeachingSubject: TeachingSubject
  subjectAreas: SubjectArea[]
  rowData: any[];
  selectedIds: number[] = []
  context;
  isBadlines: boolean = false;
  badLines: any[];

  constructor(
    public authService: AuthenticationService,
    public crxObjectService: CrxObjectService,
    public educationService: EductaionService,
    public languageS: LanguageService,
    public objectService: GenericObjectService
  ) {
    this.readDatas();
  }

  onQuickFilterChanged(quickFilter) {
    let filter = (<HTMLInputElement>document.getElementById(quickFilter)).value.toLowerCase();
  }
  /**
   * Read the owned positive list.
   */
  readDatas() {
    this.educationService.getMyPositivLists().subscribe(
      (val) => { 
        this.rowData = val
        console.log(val)
      }
    )
  }

  toggleSelect(plist){
    if(this.selectedIds.indexOf(plist.id) == -1){
      this.selectedIds.push(plist.id)
    }else{
      this.selectedIds = this.selectedIds.filter(value => value != plist.id)
    }
  }
  /**
   * Add or edit positive list
   * @param ev 
   * @param positivList 
   */
  redirectToAddEdit(positivList: PositivList) {
    if(positivList) {
      this.educationService.getPositivList(positivList.id).subscribe(
        (val) => {
          this.selectedPositiveList = val
          this.addEditTitle = "Edit Positive List"
          this.action = 'modify'
          this.isAddEditOpen = true
        }
      )
    } else {
      this.selectedPositiveList = new PositivList();
      this.addEditTitle = "Add Positive List"
      this.action = 'add'
      this.isAddEditOpen = true
    }
  }

  addEdit(){
    this.badLines = this.checkDomains();
    if(this.badLines.length>0){
      this.isBadlines = true
      return;
    }

    this.disabled = true
    this.objectService.requestSent();
    this.objectService.applyAction(this.selectedPositiveList,"education/proxy/positiveList", "add").subscribe(
      (val) => {
        this.disabled = false
        this.isAddEditOpen = false
        this.readDatas()
        this.objectService.responseMessage(val)
      }
    )
  }

  deleteList(){
    this.educationService.deletePositivList(this.selectedPositiveList.id).subscribe(
      (val) => {
        this.objectService.responseMessage(val)
        this.readDatas()
        this.isAddEditOpen = false
      }
    )
  }
 
  /**
   * Activate the selected positive lists in the selected room
   * @param ev 
   */
  activate(ev: Event) {
    this.objectService.requestSent();
    let subs = this.educationService.activatePositivListInRoom(this.educationService.selectedRoom.id, this.selectedIds).subscribe({
      next: (val) => { this.objectService.responseMessage(val) },
      error: (err) => { this.objectService.errorMessage(err) },
      complete: () => { subs.unsubscribe() }
    })
  }

  /**
   * Deactivate the selected positive lists in the selected room
   * @param ev 
   */
  deactivate(ev: Event) {
    this.objectService.requestSent();
    let subs = this.educationService.deactivatePositivListInRoom(this.educationService.selectedRoom.id).subscribe({
      next: (val) => { this.objectService.responseMessage(val) },
      error: (err) => { this.objectService.errorMessage(err) },
      complete: () => { subs.unsubscribe() }
    })
  }

  changeTeachingSubject(){
    this.selectedTeachingSubject = this.selectedPositiveList.teachingSubject
    this.subjectAreas = this.selectedPositiveList.teachingSubject.subjectAreaList
    this.selectedPositiveList.subjectArea = null
  }

  getRows(domains: string) : number{
    let a = 1
    if( domains ) {
      a = domains.split(/\r?\n/).length +1
    }
    return a
  }

  checkDomains() {
    const dnsRegex = /^(?=.{1,253}$)(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(\.(?!-)[a-zA-Z0-9-]{1,63}(?<!-))*$/;
    const badLines = [];
    var index = 0;
    for( var line of this.selectedPositiveList.domains.split(/\r?\n/) ) {
      const value = line.trim();
      if (!dnsRegex.test(value)) {
        badLines.push({
          index: index + 1,
          value: value
        });
      }
    }
    console.log(badLines)
    return badLines;
  }
}
