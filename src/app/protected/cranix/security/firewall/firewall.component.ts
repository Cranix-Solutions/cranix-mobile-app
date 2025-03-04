import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OutgoingRule } from 'src/app/shared/models/secutiry-model';
import { LanguageService } from 'src/app/services/language.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SecurityService } from 'src/app/services/security-service';
import { AddOutgoingRuleComponent } from './add-rules/add-outgoing-rule.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { AddRemoteRuleComponent } from './add-rules/add-remote-rule.component';
import { SystemService } from 'src/app/services/system.service';

@Component({
  standalone: false,
  selector: 'cranix-firewall',
  templateUrl: './firewall.component.html',
  styleUrls: ['./firewall.component.scss'],
})
export class FirewallComponent implements OnInit {
  segment: string = "in";
  defaultColDef;
  context;
  outSelected;
  remoteSelected;
  newPort = "";
  newService = "";


  constructor(
    public authService: AuthenticationService,
    private languageS: LanguageService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public securityService: SecurityService,
    public systemService: SystemService
  ) {
    this.context = { componentParent: this };
  }

  ngOnInit() {
    this.authService.log("readData called");
    this.securityService.readDatas();
  }

  segmentChanged(event) {
    this.segment = event.detail.value;
    this.remoteSelected = null
    this.outSelected = null
  }

  addIncomingService(){
    if( !this.securityService.incomingRules.services.includes(this.newService) ) {
      this.securityService.incomingRules.services.push(this.newService);
      this.securityService.incomingChanged = true;
      this.newService = ""
    }
  }
  addIncomingPort(){
    if( !this.securityService.incomingRules.ports.includes(this.newPort) ) {
      this.securityService.incomingRules.ports.push(this.newPort);
      this.securityService.incomingChanged = true;
      this.newPort = ""
    }
  }
  removeIncomingPort(port){
    this.securityService.incomingRules.ports = this.securityService.incomingRules.ports.filter( a => a != port )
  }

  removeIncomingService(service){
    this.securityService.incomingRules.services = this.securityService.incomingRules.services.filter( a => a != service )
  }
  /**
   * Add a new outgoin rule
   */
  async addOutgoinRule() {
    const modal = await this.modalCtrl.create({
      component: AddOutgoingRuleComponent,
      cssClass: 'medium-modal',
      animated: true,
      backdropDismiss: false
    });
    (await modal).present();
  }
  /**
   * Delets a rule
   */
  deleteOutgoinRule() {
    let newRules: OutgoingRule[] = [];
    for (let rule of this.securityService.outgoingRules) {
      if (this.outSelected.indexOf(rule) != -1) {
        console.log(rule)
        this.securityService.deleteOutgoingRule(rule);
      }
    }
  }
  async addRemoteRule() {
    const modal = await this.modalCtrl.create({
      component: AddRemoteRuleComponent,
      cssClass: 'medium-modal',
      animated: true,
      backdropDismiss: false
    });
    modal.onDidDismiss().then((val) => {
      if (val.data) {
        this.authService.log(this.securityService.remoteRules);
      }
    });
    (await modal).present();
  }
  /**
   * Delets a rule
   */
  deleteRemoteRule() {
    if( !this.remoteSelected ) {
      return;
    }
    for (let rule of this.remoteSelected ) {
      this.securityService.deleteRemoteRule(rule);
    }
    /*
    let newRules: RemoteRule[] = [];
    for (let rule of this.securityService.remoteRules) {
      if (this.remoteSelected.indexOf(rule) == -1) {
        newRules.push(rule);
      } else {
        this.securityService.deleteRemoteRule(rule);
      }
    }
    this.authService.log(newRules);
    this.securityService.remoteRules = newRules;
    this.remoteApi.setRowData(newRules);*/
  }
  restartFirewall() {
    this.securityService.setFirewallStatus('restart')
  }
  stopFirewall() {
    this.securityService.setFirewallStatus('stop')
  }
}
