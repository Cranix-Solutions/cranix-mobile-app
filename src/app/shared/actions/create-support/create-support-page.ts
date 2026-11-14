import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { SystemService } from 'src/app/services/system.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CephalixService } from 'src/app/services/cephalix.service';
import { Device, Room, SupportRequest } from '../../models/data-model';
import { Institute } from '../../models/cephalix-data-model';


@Component({
    standalone: false,
    selector: 'create-support-page',
    styleUrls: ['./create-support.css'],
    templateUrl: 'create-support.html'
  })
  export class CreateSupport implements OnInit {
  
    disabled: boolean = false;
    files = [];
    institute: Institute
    selectedDevices: Device[] = [];
    selectedRooms: Room[] = [];
    devices: Device[] = [];
    rooms: Room[] = [];
    @Input() support: SupportRequest
    constructor(
      public modalController: ModalController,
      public systemService: SystemService,
      public objectService: GenericObjectService,
      public cephalixService: CephalixService,
      public authService: AuthenticationService
    ) { }
  
    ngOnInit() {
      //In a CRANIX session the devices and rooms are available locally.
      //In a Cephalix session they are loaded after an institute was selected.
      this.devices = this.objectService.allObjects['device'] || [];
      this.rooms = this.objectService.allObjects['room'] || [];
    }
    onFilesAdded(event, modal) {
      this.files = event.target.files;
      modal.dismiss();
    }
  
    addAttachment() {
      console.log("addP")
      for (let file of this.files) {
        this.support.attachmentName = file.name;
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
          let index = e.target.result.toString().indexOf("base64,") + 7;
          this.support.attachment = e.target.result.toString().substring(index);
        }
        fileReader.readAsDataURL(file);
      }
    }
    onSubmit() {
      this.support.cranixDeviceIds = this.selectedDevices.map(d => d.id);
      this.support.cranixRoomIds = this.selectedRooms.map(r => r.id);
      this.support.cranixUserId = this.authService.session.userId;
      console.log(this.support)
      this.systemService.createSupportRequest(this.support).subscribe(
        (val) => {
          this.objectService.responseMessage(val);
          this.modalController.dismiss("OK")
        }
      )
    };
    setInstitute(){
      this.support.regcode = this.institute.regCode;
      //A Cephalix user creates the ticket for a remote institute.
      //Load the devices and rooms of that institute.
      if(this.institute && this.institute.id){
        this.cephalixService.getObjectsFromInstitute(this.institute.id, 'device').subscribe(
          (val) => { this.devices = val; this.selectedDevices = []; }
        )
        this.cephalixService.getObjectsFromInstitute(this.institute.id, 'room').subscribe(
          (val) => { this.rooms = val; this.selectedRooms = []; }
        )
      }
    }
  }
