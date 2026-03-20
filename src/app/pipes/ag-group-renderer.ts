import { Component } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    standalone: false,
    selector: 'group-action-cell-renderer',
    template: `
        @if(mayEdit){
        <button class="icon-button" (click)="details($event)" matTooltip="{{'edit' | translate }}">
             <ion-icon name="build-sharp"></ion-icon>
        </button>
        <button class="icon-button" (click)="members($event)" matTooltip="{{'Members of the group:' | translate }}">
             <ion-icon name="people-circle"></ion-icon>
        </button>
        <button class="icon-button" (click)="delete($event)" matTooltip="{{'delete' | translate }}">
            <ion-icon color="danger" name="trash-outline" ></ion-icon>
        </button>
        }@else{
        <button class="icon-button" (click)="showMembers($event)" matTooltip="{{'Members of the group:' | translate }}">
             <ion-icon name="people-circle"></ion-icon>
        </button>
        }
        @if(noticeUse){
        <button  class="icon-button" (click)="openNotice($event)" matTooltip="{{'notices' | translate }}">
            <ion-icon slot="icon-only" name="clipboard" color="tertiary"></ion-icon>
        </button>
        }
        <button class="icon-button" (click)="openAction($event)" matTooltip="{{'Apply actions on the selected objects' | translate }}">
            <ion-icon  name="ellipsis-vertical-sharp"></ion-icon>
        </button>
    `
})

export class GroupActionBTNRenderer implements ICellRendererAngularComp {
    private params: any;
    public mayEdit: boolean = false;
    public noticeUse: boolean = false;
    agInit(params: any): void {
        this.params = params;
        this.mayEdit = params.context.componentParent.context.componentParent.mayGroupEdit;
        if (!this.mayEdit && this.params.data) {
            this.mayEdit = params.context.componentParent.authService.session.userId == params.data.creatorId;
        }
        this.noticeUse = this.params.context.componentParent.noticeUse;
    }

    public details(event) {
        event.stopPropagation();
        this.params.context.componentParent.redirectToEdit(this.params.data);
    }
    public members(event) {
        event.stopPropagation();
        this.params.context.componentParent.redirectToMembers(this.params.data);
    }
    public showMembers(event) {
        event.stopPropagation();
        this.params.context.componentParent.redirectToShowMembers(this.params.data);
    }
    public openAction(event) {
        event.stopPropagation();
        this.params.context.componentParent.openActions(event, this.params.data)
    }
    public delete(event) {
        event.stopPropagation();
        this.params.context.componentParent.redirectToDelete(this.params.data);
    }
    public openNotice(event) {
        event.stopPropagation();
        this.params.context.componentParent.openNotice(this.params.data);
    }

    refresh(params: any): boolean {
        return true;
    }
}
