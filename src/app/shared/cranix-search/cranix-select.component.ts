import { Component, Input, OnInit, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
@Component({
  standalone: false,
  selector: 'app-cranix-select',
  templateUrl: './cranix-select.component.html',
  styleUrls: ['./cranix-search.component.scss'],
})
export class CranixSelectComponent  implements OnInit {

  rowData: any[] = []
  crxSearchFilter: string = "";

  @Input({ required: true }) objectType: string
  @Input({ required: true }) items: any[]
  @Input({ required: true }) selection: string
  @Input() selectedItem: any
  @Input() selectedItems: any[] = []
  @Input() multiple: boolean
  @Input() emptyLabel: string
  @Input() selectedLabel: string
  constructor() {
    this.crxSearchFilter = this.objectType + (Math.floor(Math.random()* 9000) + 1000)
    this.rowData = this.items
    if (typeof this.emptyLabel == "undefined") {
      this.emptyLabel = 'Select ' + this.objectType
    }
    if (typeof this.selectedLabel == "undefined") {
      this.selectedLabel = this.objectType + ' selected.'
    }
  }

  ngOnInit() {}

}
