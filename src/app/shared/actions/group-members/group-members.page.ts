import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

//own stuff
import { LanguageService } from 'src/app/services/language.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { GroupsService } from 'src/app/services/groups.service';
import { Group, User } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'cranix-group-members',
  templateUrl: './group-members.page.html',
  styleUrls: ['./group-members.page.scss'],
})
export class GroupMembersPage implements OnInit {
  context;
  memberOptions;
  noMemberOptions;
  columnDefs = [];
  memberSelection: User[] = [];
  noMemberSelection: User[] = [];
  memberData: User[] = [];
  noMemberData: User[] = [];
  group;

  constructor(
    public authService: AuthenticationService,
    private objectS: GenericObjectService,
    public modalCtrl: ModalController,
    private languageS: LanguageService,
    private groupS: GroupsService,
    public translateServices: TranslateService
  ) {}

  ngOnInit() {
    console.log('innerWidth',window.innerWidth)
    this.context = { componentParent: this }
    this.group = <Group>this.objectS.selectedObject;
    this.readMembers();
  }
  public ngAfterViewInit() {
    while (document.getElementsByTagName('mat-tooltip-component').length > 0) { document.getElementsByTagName('mat-tooltip-component')[0].remove(); }
  }
  //TODO
  applyChanges() {
    let members: number[] = [];
    let rmMembers: number[] = [];
    for (let g of this.noMemberSelection) {
      members.push(g.id);
    }
    for (let g of this.memberSelection) {
      rmMembers.push(g.id);
    }

    for (let g of this.memberData) {
      if (rmMembers.indexOf(g.id) == -1) {
        members.push(g.id)
      }
    }
    this.authService.log('groups');
    this.authService.log(members);
    this.noMemberSelection = [];
    this.memberSelection = [];
    this.objectS.requestSent();
    let subM = this.groupS.setGroupMembers(this.group.id, members).subscribe(
      (val) => {
        this.objectS.responseMessage(val);
        this.readMembers()
      },
      (err) => {
        this.objectS.errorMessage(
          this.languageS.trans("A server error accoured.")
        )
        this.authService.log(err)
      },
      () => { subM.unsubscribe() });
  }

  readMembers() {
    let subM = this.groupS.getMembers(this.group.id).subscribe(
      (val) => { this.memberData = val; this.authService.log(val) },
      (err) => { this.authService.log(err) },
      () => { subM.unsubscribe() });
    let subNM = this.groupS.getAvailiableMembers(this.group.id).subscribe(
      (val) => { this.noMemberData = val; this.authService.log(val) },
      (err) => { this.authService.log(err) },
      () => { subNM.unsubscribe() })
  }
}
