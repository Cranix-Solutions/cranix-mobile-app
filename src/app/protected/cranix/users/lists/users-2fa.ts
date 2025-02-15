import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/auth.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { ActionsComponent } from 'src/app/shared/actions/actions.component';


@Component({
    standalone: false,
  selector: 'cranix-users-2fa',
    templateUrl: './users-2fa.html',
    // styleUrls: ['./user-import.component.scss'],

})
export class Users2faComponent implements OnInit {
    objectKeys: string[] = [];
    context;
    dataTypeDefinitions = {};
    constructor(
        public authService: AuthenticationService,
        public langService: LanguageService,
        public popoverCtrl: PopoverController,
        public objectService: GenericObjectService

    ) {

        this.context = { componentParent: this };

    }
    ngOnInit() {
    }
    onQuickFilterChanged(quickFilter) {
        let filter = (<HTMLInputElement>document.getElementById(quickFilter)).value.toLowerCase();
    }
    async openActions(ev) {
        let selectedIds: number[] = [];
        let selection = [] //TODO
        for (let i of selection) {
            selectedIds.push(i.id)
        }
        const popover = await this.popoverCtrl.create({
            component: ActionsComponent,
            event: ev,
            componentProps: {
                objectType: "2fa",
                objectIds: selectedIds,
                selection: selection
            },
            translucent: true,
            animated: true,
            showBackdrop: true
        });
        await popover.present();
    }
}

