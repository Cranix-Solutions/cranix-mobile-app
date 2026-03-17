import { Component } from '@angular/core';

//Our Stuff
import { PositivList, SubjectArea, TeachingSubject } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
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
  selectedPositiveList: PositivList
  selectedTeachingSubject: TeachingSubject
  subjectAreas: SubjectArea[]
  rowData: any[];
  selectedIds: number[] = []
  context;

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
    let subs = this.educationService.getMyPositivLists().subscribe(
      (val) => { this.rowData = val },
      (err) => { console.log(err) },
      () => { subs.unsubscribe() }
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
      this.selectedPositiveList = positivList
      this.addEditTitle = "Edit Positive List"
      this.action = 'modify'
    } else {
      this.selectedPositiveList = new PositivList();
      this.addEditTitle = "Add Positive List"
      this.action = 'add'
    }
    this.isAddEditOpen = true
  }

  addEdit(){
    this.objectService.applyAction(this.selectedPositiveList,"education/proxy/positiveList", this.action).subscribe(
      (val) => { this.objectService.responseMessage(val)}
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
    let a = domains.split(/\s/).length +1
    return a
  }
}
