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
  isCranixSelectModalOpen: boolean = false;

  @Output() selectedItemChange = new EventEmitter<any>();
  @Output() selectedItemsChange = new EventEmitter<any[]>();
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
  }

  ngOnInit() {
    this.rowData = this.items
    if (typeof this.emptyLabel == "undefined") {
      this.emptyLabel = 'Select ' + this.objectType
    }
    if (typeof this.selectedLabel == "undefined") {
      this.selectedLabel = this.objectType + ' selected.'
    }
  }

  select(o: any) {
    console.log(o)
    this.selectedItem = o;
    this.selectedItemChange.emit(this.selectedItem)
  }
  doSelect(o: any) {
    if (this.selectedItems.filter(obj => obj == o).length == 1) {
      this.selectedItems = this.selectedItems.filter(obj => obj != o)
    } else {
      this.selectedItems.push(o)
    }
    this.selectedItemsChange.emit(this.selectedItems)
  }
  onQuickFilterChanged() {
    let filter = (<HTMLInputElement>document.getElementById(this.crxSearchFilter)).value.toLocaleLowerCase();
    this.rowData = this.items.filter(obj => obj);
  }

  openModal(){
    this.isCranixSelectModalOpen = true
  }

  loseModal(modal){
    modal.dismiss();
    this.isCranixSelectModalOpen = false
  }
}
