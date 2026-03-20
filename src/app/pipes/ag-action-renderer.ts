import { Component } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    standalone: false,
    selector: 'action-cell-renderer',
    template: `
        @if(id){#{{ id }}}
        <button class="icon-button" (click)="details($event)" matTooltip="{{'modify' | translate }}">
             <ion-icon name="build-sharp"></ion-icon>
        </button>
        <button class="icon-button" (click)="delete($event)" matTooltip="{{'delete' | translate }}">
            @if(params.context.componentParent.objectType == 'ticket'){
            <ion-icon color="danger" name="checkmark-done" ></ion-icon>
            }@else{
            <ion-icon color="danger" name="trash-outline" ></ion-icon>
            }
        </button>
        <button class="icon-button" (click)="openAction($event)" matTooltip="{{'Apply actions on the selected objects' | translate }}">
            <ion-icon name="ellipsis-vertical-sharp"></ion-icon>
        </button>
        `
})

export class ActionBTNRenderer implements ICellRendererAngularComp {
    public params: any;
    public  id;
    agInit(params: any ): void {
        this.params = params;
        if( this.params.colDef.field == "id") {
            this.id = this.params.value;
        }
    }

    public details(event) {
        event.stopPropagation();
        this.params.context.componentParent.redirectToEdit(this.params.data);
    }
    public openAction(event){
        event.stopPropagation();
        this.params.context.componentParent.openActions(event,this.params.data);
    }
    public delete(event) {
        event.stopPropagation();
        this.params.context.componentParent.redirectToDelete(this.params.data);
    }

    refresh(params: any): boolean {
        return true;
    }
}
