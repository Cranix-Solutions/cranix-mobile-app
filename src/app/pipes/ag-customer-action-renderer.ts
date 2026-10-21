import { Component } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    standalone: false,
    selector: 'action-cell-renderer',
    template: `
        @if(id){#{{ id }}}
        <button class="icon-button" (click)="editInstitutes($event)" matTooltip="{{'Apply actions on the selected objects' | translate }}">
            <ion-icon name="business"></ion-icon>
        </button>
        <button class="icon-button" (click)="delete($event)" matTooltip="{{'delete' | translate }}">
            <ion-icon color="danger" name="trash-outline" ></ion-icon>
        </button>
        @if(noteUse){
        <button  class="icon-button" (click)="openNote($event)" matTooltip="{{'note' | translate }}">
            <ion-icon slot="icon-only" name="clipboard" color="tertiary"></ion-icon>
        </button>
        }
        `
})

export class CustomerActionRenderer implements ICellRendererAngularComp {
    private params: any;
    public  id;
    public noteUse: boolean = false;
    agInit(params: any ): void {
        this.params = params;
        this.noteUse = this.params.context.componentParent.noteUse;
        if( this.params.colDef.field == "id") {
            this.id = this.params.value;
        }
    }

    public editInstitutes(event){
        event.stopPropagation();
        this.params.context.componentParent.editInstitutes(this.params.data);
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
