import { Component, AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { UsersService } from 'src/app/services/users.service';
import { IdRequest } from 'src/app/shared/models/data-model';

@Component({
  standalone: false,
    selector: 'app-id-cards',
  templateUrl: './id-cards.component.html',
  styleUrl: './id-cards.component.css'
})
export class IdCardsComponent implements AfterViewInit {

  allRequests: IdRequest[] = []
  isPopoverOpen: boolean = false
  openedOnly: boolean = true
  workMode: string = "overview"
  releasing: boolean = false
  requests: IdRequest[] = []
  selectedRequest: IdRequest = new IdRequest()
  start: number = -1
  nextValidity: string;

  constructor(
    public authService: AuthenticationService,
    private objectService: GenericObjectService,
    public userService: UsersService
  ) {}

  ngAfterViewInit() {
    this.readData()
  }
  readData() {
    this.userService.getIdRequests().subscribe(
      (val) => {
        this.allRequests = val
        this.searchRequests()
      }
    )
  }
  searchRequests() {
    let search = (<HTMLInputElement>document.getElementById('search-requests'))
    let filter = ""
    if( search) {
      filter = search.value.toLowerCase()
    }
    let tmp = []
    for (let o of this.allRequests) {
      if (this.openedOnly && o.allowed) {
        continue;
      }
      if (
        (o.creator.fullName.toLowerCase().indexOf(filter) > -1) ||
        (o.comment.toLowerCase().indexOf(filter) > -1)
      ) {
        tmp.push(o)
      }
    }
    this.requests = tmp;
  }

  setIdRequest(request: IdRequest) {
    this.userService.setIdRequest(request).subscribe(
      (val) => {
        this.objectService.responseMessage(val)
        this.readData()
      }
    )
  }

  deleteIdRequest(id: number) {
    this.userService.deleteIdRequest(id).subscribe(
      (val) => {
        this.objectService.responseMessage(val)
        this.readData()
      }
    )
  }

  getIdRequest(id: number) {
    this.userService.getIdRequest(id).subscribe(
      (val) => {
        console.log(val)
        this.selectedRequest = val
        this.selectedRequest.picture = "data:image/jpg;base64," + val.picture
        this.isPopoverOpen = true
      }
    )
  }
  closePopOver(popOver: any) {
    popOver.dismiss();
    this.isPopoverOpen = false;
  }

  changeMode(event){
    console.log(event)
    if(this.workMode == "overview"){
      this.searchRequests()
    }else{
      this.doReView(true)
    }
  }
  doReView(reset: boolean){
    if(reset){
      this.start = -1
    }
    this.requests = []
    while(true){
      this.start++
      if(this.allRequests.length == this.start || this.requests.length > 36) {
        break;
      }
      let request = this.allRequests[this.start]
      if(request && request.allowed) {
        continue
      }
      this.getPictureOfRequest(request)
      this.requests.push(request)
    }
  }
  doNotRelease(indx: number){
    this.requests.splice(indx,1)
  }
  async release(){
    this.releasing = true
    for(let request of this.requests){
      request.allowed = true
      request.validUntil = this.nextValidity
      let resp = await this.userService.setIdRequest(request).toPromise()
      console.log(resp)
    }
    if(this.start <this.allRequests.length){
      this.doReView(false)
    }else{
      this.readData()
    }
    this.releasing = false
    console.log("done")
  }

  getPictureOfRequest(request){
    this.userService.getIdRequest(request.id).subscribe(
      (val) => {
        request.picture = "data:image/jpg;base64," + val.picture
      }
    )
  }
}