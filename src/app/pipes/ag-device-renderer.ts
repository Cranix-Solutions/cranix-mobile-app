import { Component } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    standalone: false,
    selector: 'device-action-cell-renderer',
    template: `
        <button class="icon-button" (click)="setPrinters($event)" matTooltip="{{'Set printers' | translate }}">
            <ion-icon name="print" ></ion-icon>
        </button>
        <button class="icon-button" (click)="setDhcp($event)" matTooltip="{{'Set DHCP parameter' | translate }}">
            <ion-icon color="danger" name="server" ></ion-icon>
        </button>
        <button class="icon-button" (click)="delete($event)" matTooltip="{{'delete' | translate }}">
            <ion-icon color="danger" name="trash-outline" ></ion-icon>
        </button>
        @if(noteUse){
        <button  class="icon-button" (click)="openNote($event)" matTooltip="{{'note' | translate }}">
            <ion-icon slot="icon-only" name="clipboard" color="tertiary"></ion-icon>
        </button>
        }
        <button class="icon-button" (click)="openAction($event)" matTooltip="{{'Apply actions on the selected objects' | translate }}">
            <ion-icon  name="ellipsis-vertical-sharp"></ion-icon>
        </button>
        ` 
})

export class DeviceActionBTNRenderer implements ICellRendererAngularComp {
    private params: any;
    public noteUse: boolean = false;

    agInit(params: any ): void {
        this.params = params;
        this.noteUse = this.params.context.componentParent.noteUse;
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
    public openNote(event) {
        event.stopPropagation();
        this.params.context.componentParent.openNote(this.params.data);
    }

    refresh(params: any): boolean {
        return true;
    }
}
