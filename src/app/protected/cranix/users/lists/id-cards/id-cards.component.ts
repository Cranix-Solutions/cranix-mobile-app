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
      //todo list expiered IDs also
      if(request && request.allowed && !this.isDateWithinNext30Days(request.validUntil)) {
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

  isDateWithinNext30Days(dateStr: string): boolean {
    // Erwartetes Format: YYYY-MM-DD
    const parts = dateStr.split('-');
    if (parts.length !== 3) return false;

    const year = Number(parts[0]);
    const month = Number(parts[1]); // 1-12
    const day = Number(parts[2]);   // 1-31

    // Grundvalidierung
    if (
      Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day) ||
      month < 1 || month > 12 || day < 1 || day > 31
    ) {
      return false;
    }

    // Konstruktion des Datums (Monatsangabe in JS Date ist 0-basiert)
    const inputDate = new Date(year, month - 1, day);

    // Datum heute (mit Uhrzeit 00:00:00)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Datum 30 Tage in der Zukunft (mit Uhrzeit 00:00:00)
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);

    // Vergleiche: inputDate muss <= maxDate sein, UND >= heute (je nach Anforderung)
    // Falls nur Zukunftszustände relevant sind, benutze inputDate >= today.
    return inputDate <= maxDate;
  }
}
