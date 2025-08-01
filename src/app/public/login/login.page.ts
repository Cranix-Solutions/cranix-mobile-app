import { Component } from '@angular/core';
import { Router } from '@angular/router';
//Own modules
import { AuthenticationService } from 'src/app/services/auth.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginForm } from 'src/app/shared/models/server-models';

class server {
    name: string = ""
    url: string = ""
    user: LoginForm = new LoginForm()
    token: string = ""
}

@Component({
    standalone: false,
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage{
    connection: server = new server
    isAddConnectionOpen: boolean = false
    saveConnection: boolean = true;
    servers: server[] = [];
    totp: boolean = false;
    totppin: string = "";
    newConnection: boolean = false;

    constructor(
        public authService: AuthenticationService,
        private objectService: GenericObjectService,
        private utilsService: UtilsService,
        private router: Router
    ) {
        let tmp = JSON.parse(localStorage.getItem("servers"))
        if( tmp ) {
            this.servers = tmp
        }
        console.log(this.servers)
    }

    login(): void {
        this.authService.setUpSession(this.connection.user, this.connection.name);
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
        this.utilsService.url = this.connection.url;
        this.authService.authenticationState.next(false);
        this.authService.setUpSession( this.connection.user, this.connection.name )
        this.authService.authenticationState.subscribe(state => {
            console.log("Login ok")
            if(this.saveConnection){
                console.log("save connection")
                //this.connection.token = this.authService.session.token
                if(this.newConnection){
                    this.servers.push(this.connection)
                }
                console.log(this.servers)
                localStorage.setItem("servers",JSON.stringify(this.servers))
            }
            modal.dismiss()
        })
        
    }
    
    addEditConnection(i: number){
        console.log("addEditConncetion called", i)
        if(i==-1){
            this.newConnection = true
            this.connection = new server
        }else{
            this.connection = this.servers[i]
            this.newConnection = false
            this.saveConnection = true
        }
        this.isAddConnectionOpen = true
    }
    connectServer(i: number){
        console.log("connectServer called", i)
        this.utilsService.url = this.servers[i].url
        this.authService.setUpSession( this.servers[i].user, this.servers[i].name )
        this.authService.authenticationState.subscribe(state => {
            console.log("Login OK")
        })
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


