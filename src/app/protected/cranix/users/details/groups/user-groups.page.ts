import { Component, OnInit } from '@angular/core';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { ModalController } from '@ionic/angular';

//own stuff
import { LanguageService } from 'src/app/services/language.service';
import { UsersService } from 'src/app/services/users.service';
import { Group, User } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
  selector: 'cranix-user-groups',
  templateUrl: './user-groups.page.html',
  styleUrls: ['./user-groups.page.scss'],
})
export class UserGroupsPage implements OnInit {
  memberSelection: Group[] =[];
  noMemberSelection: Group[] =[];
  memberData: Group[] =[];
  noMemberData: Group[] =[];
  user;

  constructor(
    public authService: AuthenticationService,
    private objectS: GenericObjectService,
    public modalCtrl: ModalController,
    private  userS: UsersService
  ) {
    this.user = <User>this.objectS.selectedObject;
  }

  ngOnInit() {
    this.readGroups();
  }

  applyChanges() {
    let groups: number[] = [];
    let rmGroups: number[] = [];
    for ( let g of this.noMemberSelection ) {
      groups.push(g.id);
    }
    for(let g of this.memberSelection) {
      rmGroups.push(g.id);
    }
    
    for( let g of this.memberData ){
      if( rmGroups.indexOf(g.id) == -1) {
        groups.push(g.id)
      }
    }
    this.authService.log('groups');
    this.authService.log(groups);
    this.noMemberSelection = [];
    this.memberSelection = [];
    this.userS.setUsersGroups(this.user.id,groups).subscribe(
      (val) => { this.readGroups() }
    );
  }

  readGroups() {
    this.userS.getUsersGroups(this.user.id).subscribe(
      (val) => { this.memberData = val }
    )
    this.userS.getUsersAvailableGroups(this.user.id).subscribe(
      (val) => { this.noMemberData = val }
    )
  }
}
