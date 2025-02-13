import { Component } from '@angular/core';
import { Router } from '@angular/router';
//Own modules
import { AuthenticationService } from 'src/app/services/auth.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginForm } from 'src/app/shared/models/server-models';



@Component({
    standalone: false,
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  institute: string = "";
  isAddConnectionOpen: boolean = false
  saveConnection: boolean = true;
  url: string = "";
  servers: any[] = [];
    instituteName: string = "";
    totp: boolean = false;
    totppin: string = "";
    user: LoginForm = new LoginForm();

    constructor(
        public authService: AuthenticationService,
        private objectService: GenericObjectService,
        private utilsService: UtilsService,
        private router: Router
    ) {
        this.servers = JSON.parse(localStorage.getItem("servers"))
    }

    login(): void {
        this.authService.setUpSession(this.user, this.instituteName);
    }

    checkPin() {
        let id: string = this.authService.crx2fa.split('#')[1]
        this.authService.checkTotPin(id, this.totppin);
    }

    sendPin() {
        let id: string = this.authService.crx2fa.split('#')[1]
        this.authService.sendPin(id).subscribe({
            next: (val) => { this.objectService.responseMessage(val) },
            error: (error) => { this.objectService.errorMessage(error) }
        })
    }

    onLogin(modal: any) {
        this.utilsService.url = this.url;
        this.authService.setUpSession( this.user, this.institute )
        this.authService.authenticationState.subscribe(state => {
            if(this.saveConnection){
                this.servers.push({
                    name: this.institute,
                    url: this.url,
                    token: this.authService.session.token,
                    user:  this.user
                  })
                  localStorage.setItem("servers",JSON.stringify(this.servers))
            }
            modal.dismiss()
        })
        
    }
    
    connectServer(i: number){
        let user = this.servers[i].user;
        this.authService.setUpSession( user, this.institute )
        console.log(i)
        this.isAddConnectionOpen = false
        this.authService.authorized = true
        this.router.navigate(['/']);
    }
    
    deleteServer(i: number){
        this.servers = this.servers.filter((value, index) => index != i)
        localStorage.setItem("servers",JSON.stringify(this.servers))
    }
}


