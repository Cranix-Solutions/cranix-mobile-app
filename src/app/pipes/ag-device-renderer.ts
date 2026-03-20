import { Component } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    standalone: false,
    selector: 'device-action-cell-renderer',
    template: `
        <button class="icon-button" (click)="details($event)" matTooltip="{{'edit' | translate }}">
             <ion-icon name="build-sharp"></ion-icon>
        </button>
        <button class="icon-button" (click)="setPrinters($event)" matTooltip="{{'Set printers' | translate }}">
            <ion-icon name="print" ></ion-icon>
        </button>
        <button class="icon-button" (click)="setDhcp($event)" matTooltip="{{'Set DHCP parameter' | translate }}">
            <ion-icon color="danger" name="server" ></ion-icon>
        </button>
        <button class="icon-button" (click)="delete($event)" matTooltip="{{'delete' | translate }}">
            <ion-icon color="danger" name="trash-outline" ></ion-icon>
        </button>
        <button class="icon-button" (click)="openAction($event)" matTooltip="{{'Apply actions on the selected objects' | translate }}">
            <ion-icon  name="ellipsis-vertical-sharp"></ion-icon>
        </button>
        ` 
})

export class DeviceActionBTNRenderer implements ICellRendererAngularComp {
    private params: any;

    agInit(params: any ): void {
        this.params = params;
    }

    public details(event) {
        event.stopPropagation();
        this.params.context.componentParent.redirectToEdit(this.params.data);
    }
    public openAction(event){
        event.stopPropagation();
        this.params.context.componentParent.openActions(event, this.params.data )
    }
    public setPrinters(event) {
        event.stopPropagation();
        this.params.context.componentParent.setPrinters(this.params.data);
    }
    public setDhcp(event) {
        event.stopPropagation();
        this.params.context.componentParent.setDhcp(this.params.data);
    }
    public delete(event) {
        event.stopPropagation();
        this.params.context.componentParent.redirectToDelete(this.params.data);
    }

    refresh(params: any): boolean {
        return true;
    }
}
