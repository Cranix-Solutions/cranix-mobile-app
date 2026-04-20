import { Component } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    standalone: false,
    selector: 'printer-action-cell-renderer',
    template: `
        @if(printerAddAllowed){
        <button class="icon-button" (click)="details($event)" matTooltip="{{'edit' | translate }}">
             <ion-icon name="build-sharp"></ion-icon>
        </button>
        }
        <button class="icon-button" (click)="reset($event)" matTooltip="{{'Reset printer' | translate }}">
            <ion-icon name="refresh" ></ion-icon>
        </button>
        @if(printerAddAllowed){
        <button class="icon-button" matTooltip="{{'delete' | translate }}">
            <ion-icon color="danger" name="trash-outline" ></ion-icon>
        </button>
        }
        `
})

export class PrinterActionBTNRenderer implements ICellRendererAngularComp {
    private params: any;
    public printerAddAllowed: boolean = false;

    agInit(params: any): void {
        this.params = params;
        this.printerAddAllowed = this.params.context.componentParent.authService.isAllowed('printer.add');
    }

    public details(event) {
        event.stopPropagation();
        this.params.context.componentParent.redirectToEdit(this.params.data);
    }
    public reset(event) {
        event.stopPropagation();
        this.params.context.componentParent.reset(this.params.data.id)
    }
    public delete(event) {
        event.stopPropagation();
        this.params.context.componentParent.redirectToDelete(this.params.data)
    }
    refresh(params: any): boolean {
        return true;
    }
}
