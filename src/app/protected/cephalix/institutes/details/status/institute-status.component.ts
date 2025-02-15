import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

//own modules
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { CephalixService } from 'src/app/services/cephalix.service';
import { LanguageService } from 'src/app/services/language.service';
import { Institute } from 'src/app/shared/models/cephalix-data-model'
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
  selector: 'cranix-institute-status',
  templateUrl: './institute-status.component.html',
  styleUrls: ['./institute-status.component.scss'],
})
export class InstituteStatusComponent implements OnInit {
  object: Institute = null;
  objectKeys: string[] = [];
  displayedColumns: string[] = ['created', 'uptime', 'version', 'rootUsage', 'srvUsage', 'homeUsage', 'availableUpdates', 'errorMessages'];
  context;
  selected: Institute[];
  rowData = [];
  objectIds: number[] = [];

  constructor(
    public authService: AuthenticationService,
    public cephalixService: CephalixService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    public route: Router,
    private storage: Storage
  ) {
    this.object = <Institute>this.objectService.selectedObject;
    this.context = { componentParent: this };
  }

  //TODO
  ngOnInit() {
    this.storage.get('InstitutesStatusComponent.displayedColumns').then((val) => {
      let myArray = JSON.parse(val);
    });
    let subs = this.cephalixService.getStatusOfInstitute(this.object.id).subscribe(
      (val) => { this.rowData = val },
      (err) => { this.authService.log(err) },
      () => { subs.unsubscribe() }
    )
  }

  onQuickFilterChanged(filter: string){
    //TODO
  }
}
