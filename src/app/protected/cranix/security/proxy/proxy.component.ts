import { Component, OnInit } from '@angular/core';

import { LanguageService } from 'src/app/services/language.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SecurityService } from 'src/app/services/security-service';
import { GenericObjectService } from 'src/app/services/generic-object.service';

@Component({
  standalone: false,
  selector: 'cranix-proxy',
  templateUrl: './proxy.component.html',
  styleUrls: ['./proxy.component.scss'],
})
export class ProxyComponent implements OnInit {

  segment = 'basic';
  newDomain: string = '';
  rowData: any[] = [];
  blackList: string[] = [];
  whiteList: string[] = [];
  cephalixList: string[] = [];
  lists  = {};
  proxyOptions;
  context;
  proxySelected;

  constructor(
    public authService: AuthenticationService,
    private languageS: LanguageService,
    public objectService: GenericObjectService,
    public securityService: SecurityService
  ) {
    this.context = { componentParent: this };
  }

  ngOnInit() {
    this.readLists('good').then( val => { this.lists['good'] = val.sort() } );
    this.readLists('bad').then( val =>  { this.lists['bad'] = val.sort() } );
    if (this.authService.session.name == 'cephalix' || this.authService.isAllowed('cephalix.manage')) {
      this.readLists('cephalix').then( val => {this.lists['cephalix'] = val.sort() } );
    }
    console.log(this.lists);
    this.readDatas().then(val => {
      this.rowData = val
      this.authService.log(this.rowData)
    });
    this.securityService.proxyChanged['basic'] =false;
    this.securityService.proxyChanged['good'] =false;
    this.securityService.proxyChanged['bad'] =false;
    this.securityService.proxyChanged['cephalix'] =false;
  }
  segmentChanged(event) {
    this.segment   = event.detail.value;
    this.newDomain = "";
  }

  readDatas(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.securityService.getProxyBasic().subscribe(
        (val) => { resolve(val) },
        (err) => { this.authService.log(err) }
      )
    });
  }
  readLists(listName): Promise<any[]> {
    return new Promise((resolve, reject) => {
    let sub1 = this.securityService.getProxyCustom(listName).subscribe(
      (val) => { resolve(val) },
      (err) => { this.authService.log(err) },
      () => { sub1.unsubscribe() }
    )});
  }

  setChanged(changed: boolean) {
    this.securityService.proxyChanged[this.segment] = changed
  }

  writeConfig() {
    let list: string[] = [];
    switch (this.segment) {
      case 'basic': {
        this.authService.log(this.rowData);
        this.objectService.requestSent();
        let sub = this.securityService.setProxyBasic(this.rowData).subscribe(
          (val) => { 
            this.objectService.responseMessage(val)
            this.securityService.proxyChanged[this.segment] = false;
           },
          (err) => {
            this.objectService.errorMessage(this.languageS.trans("An error was accoured"));
          },
          () => { sub.unsubscribe() });
        return;
      }
      case 'positive': { return; }
      default: {
        this.objectService.requestSent();
        let sub = this.securityService.setProxyCustom(this.segment,this.lists[this.segment]).subscribe(
          (val) => { 
            this.objectService.responseMessage(val)
            this.securityService.proxyChanged[this.segment] = false;
          },
          (err) => { this.objectService.errorMessage(this.languageS.trans("An error was accoured")); },
          () => {sub.unsubscribe()}
        )
      }
    }
  }
  restartProxy() {
    //TODO
  }

  addNewDomain() {
    this.lists[this.segment].push(this.newDomain)
    this.lists[this.segment].sort()
    this.securityService.proxyChanged[this.segment] = true;
    this.newDomain = "";
  }

  deleteDomain(index){
    this.lists[this.segment].splice(index,1)
    this.securityService.proxyChanged[this.segment] = true;
  }
}
