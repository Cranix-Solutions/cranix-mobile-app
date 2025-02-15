import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language.service';
import { SystemService } from 'src/app/services/system.service';

@Component({
  standalone: false,
  selector: 'cranix-access-log',
  templateUrl: './access-log.component.html',
  styleUrls: ['./access-log.component.scss'],
})
export class AccessLogComponent implements OnInit {
  context;
  rowData = []
  constructor(
    public authService: AuthenticationService,
    public languageS: LanguageService,
    private systemService: SystemService

  ) {
    this.context = { componentParent: this };
    
  }

  ngOnInit() { 
    this.systemService.getFile("/var/log/cranix-internet-access.log").subscribe(
      (val) => {
        for ( let line of val.split("\n")) {
          let lline = line.split(";")
          this.rowData.push(
            {
              time: lline[0],
              user: lline[1],
              sourceIp: lline[2],
              destinationIp: lline[3],
              protocol: lline[4],
              port: lline[5]
            }
          )
        }
      }
    )
  }

  onQuickFilterChanged(filter: string){}
}
