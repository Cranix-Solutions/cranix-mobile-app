import { Component, Input, OnInit, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { GenericObjectService } from 'src/app/services/generic-object.service';

@Component({
  standalone: false,
  selector: 'cranix-search-list',
  templateUrl: './cranix-search-list.component.html',
  styleUrl: './cranix-search.component.css',
  /*providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CranixSearchListComponent),
    multi: true
  }]*/
})
export class CranixSearchListComponent implements OnInit, OnChanges {
  isAllSelected: boolean = false
  isShowChecked: boolean = false
  rowData = []
  crxSearchFilter: string = "";

  @Output() callback = new EventEmitter<any>();
  @Output() selectedItemChange = new EventEmitter<any>();
  @Output() selectedItemsChange = new EventEmitter<any[]>();
  @Input({ required: true }) objectType: string
  @Input() context
  @Input() items: any[]
  @Input() selectedItem: any
  @Input() selectedItems: any[] = []
  @Input() itemTextField: string | string[]
  @Input() multiple: boolean
  @Input() emptyLabel: string
  @Input() selectedLabel: string
  constructor(
    private objectService: GenericObjectService
  ) { }

  ngOnInit(): void {
    this.crxSearchFilter = this.objectType + (Math.floor(Math.random()* 9000) + 1000)
    console.log("CranixSearchListComponent id" + this.crxSearchFilter)
    console.log(this.selectedItems)
    if (typeof this.items == "undefined") {
      this.items = this.objectService.allObjects[this.objectType]
    }
    if (typeof this.multiple == "undefined") {
      this.multiple = false;
    }
    if (typeof this.itemTextField == "undefined") {
      this.itemTextField = this.getDefaultTextFields()
    } else if (typeof this.itemTextField == "string") {
      this.itemTextField = [this.itemTextField]
    }
    if (typeof this.emptyLabel == "undefined") {
      this.emptyLabel = 'Select ' + this.objectType
    }
    if (typeof this.selectedLabel == "undefined") {
      this.selectedLabel = this.objectType + ' selected.'
    }
    this.setupItems()
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if (changes['items']) {
      this.setupItems()
      console.log('items haben sich geändert:', this.items);
    }
  }
  //private propagateOnChange = (_: any) => { };
  //private propagateOnTouched = () => { };

  showChecked() {
    this.isShowChecked = !this.isShowChecked
  }

  setupItems() {
    if (this.items[0] && !this.items[0].hasOwnProperty('id')) {
      for (let item of this.items) {
        item['id'] = this.hashStringToInt(item.name + item.version)
      }
    }
    this.rowData = this.items
  }
  checkAll() {
    this.selectedItems = []
    if (!this.isAllSelected) {
      for (let obj of this.rowData) {
        this.selectedItems.push(obj)
      }
    }
    this.isAllSelected = !this.isAllSelected
    this.selectedItemsChange.emit(this.selectedItems)
  }

  isSelected(id: number) {
    if (this.multiple) {
        return this.selectedItems.filter(o => (o && o.id == id)).length == 1
      } else {
        return (this.selectedItem && this.selectedItem.id == id )
      }
  }
  clearSelection() {
    if (this.multiple) {
      this.selectedItems = []
      this.selectedItemsChange.emit(this.selectedItems)
    } else {
      this.selectedItem = null
      this.selectedItemChange.emit(this.selectedItem)
    }
  }
  select(o: any) {
    console.log(o)
    this.selectedItem = o;
    this.selectedItemChange.emit(this.selectedItem)
  }
  doSelect(o: any) {
    if (this.selectedItems.filter(obj => obj.id == o.id).length == 1) {
      this.selectedItems = this.selectedItems.filter(obj => obj.id != o.id)
    } else {
      this.selectedItems.push(o)
    }
    this.selectedItemsChange.emit(this.selectedItems)
  }
  onQuickFilterChanged() {
    let filter = (<HTMLInputElement>document.getElementById(this.crxSearchFilter)).value;
    this.rowData = this.objectService.filterItemsOfObject(this.objectType, filter, this.items);
  }

  getDefaultTextFields() {
    switch (this.objectType) {
      case 'acl': return ['acl']
      case 'announcement': ['issue', 'keywords', 'title']
      case 'category': return ['name', 'description', 'categoryType']
      case 'contact': ['issue', 'name', 'email', 'phone', 'title']
      case 'customer': return ['name', 'locality', 'description']
      case 'device': return ['name', 'IP']
      case 'group': return ['name', 'description', 'groupType']
      case 'institute': return ['name', 'locality', 'instituteType']
      case 'room': return ['name', 'description', 'roomType']
      case 'user': return ['fullName']
      default: return ['name', 'description']
    }
  }
  /*_emitValueChange() {
    this.propagateOnChange(this.selection);

    this.onChange.emit({
      value: this.selection
    });
  }*/
  hashStringToInt(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) | 0; // | 0 sorgt für 32-bit Integer
    }
    return Math.abs(hash);
  }
}
