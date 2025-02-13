import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { ParentsService } from 'src/app/services/parents.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Group, PTMTeacherInRoom, ParentTeacherMeeting, Room, TeachingSubject, User } from 'src/app/shared/models/data-model';
import { EditBTNRenderer } from 'src/app/pipes/ag-edit-renderer'

@Component({
  standalone: false,
  selector: 'app-manage-parents',
  templateUrl: './manage-parents.component.html',
  styleUrl: './manage-parents.component.css'
})
export class ManageParentsComponent {
  segment: string = "parents"
  rowData: any[] = []
  nextPtms: ParentTeacherMeeting[] = []
  formerPtms: ParentTeacherMeeting[] = []
  selectedPTM: ParentTeacherMeeting
  isUpcomming: boolean = false;
  selectedParent: User
  selectedChildren: User[]
  children: User[] = []
  parents: User[] = []
  classes: Group[] = []
  isRegisterRoomOpen: boolean = false
  isRegisterEventOpen: boolean = false
  isAddEditParentOpen: boolean = false
  isSelectPtmOpen: boolean = false
  isDeletePtmOpen: boolean = false
  objectKeys = []
  parentKeys = ['givenName', 'surName', 'emailAddress', 'telefonNummer']
  requestKeys = ['parentId', 'givenName', 'surName', 'birthDay', 'className']
  gridApi
  columnDefs = []
  defaultColDef = {
    resizable: true,
    sortable: true,
    hide: false,
    suppressHeaderMenuButton: true
  }
  context
  ptmTeacherInRoom: PTMTeacherInRoom

  constructor(
    public authService: AuthenticationService,
    public objectService: GenericObjectService,
    private languageS: LanguageService,
    private utilsService: UtilsService,
    private parentsService: ParentsService
  ) {

    this.context = { componentParent: this };
    this.loadData()
    for (let o of this.objectService.allObjects['user']) {
      if (o.role == 'students') {
        this.children.push(o)
      }
    }
    for (let g of this.objectService.allObjects['group']) {
      if (g.groupType == 'class') {
        this.classes.push(g)
      }
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  segmentChanged(event) {
    console.log(event)
    this.segment = event.detail.value
    this.loadData()
  }

  loadData() {
    switch (this.segment) {
      case 'parents': {
        this.objectKeys = this.parentKeys
        this.createdColDef()
        this.parentsService.getParents().subscribe((val) => { this.rowData = val })
        break;
      }
      case 'requests': {
        this.objectKeys = this.requestKeys
        this.createdColDef()
        this.parentsService.getParentRequests().subscribe((val) => { this.rowData = val })
        break;
      }
      case 'ptm': {
        this.parentsService.get().subscribe(
          (val) => {
            this.nextPtms = [];
            if (val) {
              for (let o of val) {
                this.nextPtms.push(o)
              }
              if (val.length == 1) {
                this.selectedPTM = this.parentsService.adaptPtmTimes(val[0])
                this.isUpcomming = true;
              }
            }
            if(!this.selectedPTM){
              this.selectPtm(null)
            }
            this.parentsService.getFormer().subscribe(
              (val2) => {
                this.formerPtms = val2
                console.log("getFormer" + this.formerPtms.length)
              }
            )
            console.log(this.selectedPTM)
          }
        )
      }
    }
  }
  startTimeSet(){
    let start = new Date(this.selectedPTM.start)
    console.log(this.selectedPTM)
    if(!this.selectedPTM.end) {
      this.selectedPTM.end = new Date(start.getTime() + 3600000 *6)
    }
    if(!this.selectedPTM.startRegistration) {
      this.selectedPTM.startRegistration = new Date(start.getTime() - (3600000 * 24 * 7))
    }
    if(!this.selectedPTM.endRegistration) {
      this.selectedPTM.endRegistration = new Date(start.getTime() - (3600000 * 24 * 2))
    }
    this.selectedPTM = this.parentsService.adaptPtmTimes(this.selectedPTM)

    console.log(this.selectedPTM)
  }

  selectPtm(ptm: ParentTeacherMeeting) {
    if(ptm) {
      this.selectedPTM = this.parentsService.adaptPtmTimes(ptm)
      let now = new Date().valueOf();
      let start = new Date(this.selectedPTM.start).valueOf()
      this.isUpcomming = ( now < start )
    } else {
      this.selectedPTM = new ParentTeacherMeeting()
      for( let cl of this.classes) {
        this.selectedPTM.classes.push(cl)
      }
      this.isUpcomming = true
    }
    this.isSelectPtmOpen = false
  }
  createdColDef() {
    let cols = []
    cols.push({
      field: 'id',
      pinned: 'left',
      width: 110,
      cellRenderer: EditBTNRenderer,
      headerName: ""
    })
    for (let key of this.objectKeys) {
      let col = {};
      col['field'] = key;
      col['headerName'] = this.languageS.trans(key);
      cols.push(col)
    }
    this.columnDefs = cols;
  }

  checkPtmTimes(ptm: ParentTeacherMeeting){
    let now = new Date().getTime();
    let start = new Date(ptm.start).getTime();
    let end = new Date(ptm.end).getTime();
    let startReg = new Date(ptm.startRegistration).getTime();
    let endReg = new Date(ptm.endRegistration).getTime();
    let messages = []
    if(start < now) {
      messages.push(this.languageS.trans('The PTM must be in the future.'))
    }
    if(end<start) {
      messages.push(this.languageS.trans('The PTM must ends later then start.'))
    }
    if(endReg>start) {
      messages.push(this.languageS.trans('The registration must ends befor the PTM starts.'))
    }
    if(endReg<startReg) {
      messages.push(this.languageS.trans('The registration must ends then starts.'))
    }
    if(messages.length > 0){
      this.objectService.errorMessage(messages.join(" "))
      return false
    }
    return true
  }
  addEditPTM() {
    if(!this.checkPtmTimes(this.selectedPTM)){
      return
    }
    this.parentsService.convertPtmTimes(this.selectedPTM)
    console.log(this.selectedPTM)
    this.objectService.requestSent();
    if (this.selectedPTM.id > 0) {
      this.parentsService.modifyPtm(this.selectedPTM).subscribe((val) => {
        this.objectService.responseMessage(val)
        this.parentsService.getPTMById(this.selectedPTM.id).subscribe((val2) => {
          this.selectPtm(val2)
        })
      })
    } else {
      console.log(this.selectedPTM)
      this.parentsService.addPtm(this.selectedPTM).subscribe((val) => {
        this.objectService.responseMessage(val)
        if(val.code == "OK"){
          console.log(val)
          this.parentsService.getPTMById(val.objectId).subscribe((val2) => {
            this.nextPtms.push(val2)
            this.selectPtm(val2)
          })
        }
      })
    }
  }

  deletePtm(ptmId: number) {
    this.objectService.requestSent();
    this.parentsService.deletePtm(ptmId).subscribe((val) => {
      this.objectService.responseMessage(val)
      this.loadData()
    })
  }

  doRegisterRoom() {
    this.parentsService.registerRoom(this.selectedPTM.id, this.ptmTeacherInRoom).subscribe(
      (val) => {
        this.objectService.responseMessage(val);
        this.isRegisterRoomOpen = false
      }
    )
  }
  sendMails(){
    this.objectService.requestSent();
    this.parentsService.sendMails(this.selectedPTM.id).subscribe(
      (val) => {
        this.objectService.responseMessage(val);
        this.isRegisterRoomOpen = false
      }
    )
  }
  redirectToEdit(parent: User) {
    if (parent) {
      this.selectedParent = parent
      this.selectedChildren = []
      for(let childId of parent.childIds) {
        this.selectedChildren.push(
          this.objectService.getObjectById("user",childId)
        )
      }
    } else {
      this.selectedParent = new User()
    }
    this.isAddEditParentOpen = true;
  }

  addEditParent() {
    this.selectedParent.role = 'parents'
    if (this.selectedParent.id) {
      this.parentsService.modifyParent(this.selectedParent).subscribe((val) => {
        this.objectService.responseMessage(val)
        if (val.code == "OK") {
          this.parentsService.setChildren(this.selectedParent.id, this.selectedChildren).subscribe((val2) => {
            this.objectService.responseMessage(val2)
            this.isAddEditParentOpen = false
            this.parentsService.getParents().subscribe((val3) => { this.rowData = val3 })
            this.selectedChildren = []
          })
        }
      })
    } else {
      this.selectedParent.birthDay = this.utilsService.toIonDate(new Date())
      this.parentsService.addParent(this.selectedParent).subscribe((val) => {
        this.objectService.responseMessage(val)
        if (val.code == "OK") {
          this.parentsService.setChildren(val.objectId, this.selectedChildren).subscribe((val2) => {
            this.objectService.responseMessage(val2)
            this.isAddEditParentOpen = false
            this.parentsService.getParents().subscribe((val3) => { this.rowData = val3 })
            this.selectedChildren = []
          })
        }
      })
    }
  }

  onQuickFilterChanged(quickFilter: string) {
    let filter = (<HTMLInputElement>document.getElementById(quickFilter)).value.toLowerCase();
    this.gridApi.setGridOption('quickFilterText', filter);
  }
}
