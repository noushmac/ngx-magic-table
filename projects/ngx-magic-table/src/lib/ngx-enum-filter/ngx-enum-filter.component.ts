import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HeaderCell } from '../models/header-cell';
import { EnumFilter } from '../models/enum-filter';
@Component({
  selector: 'ngx-enum-filter',
  templateUrl: './ngx-enum-filter.component.html',
  styleUrls: ['./ngx-enum-filter.component.css']
})
export class NgxEnumFilterComponent implements OnInit {
  @Input() rows: any[];
  @Input() cell: HeaderCell;
  @Input() items: any[];

  @Output() filterChange= new EventEmitter();
  
  public EnumFilter = EnumFilter;
  public filterValue = [];
  constructor() { }

  ngOnInit() {
    this.addRow();
  }

  public removeRow(index: number) {
    this.filterValue.splice(index, 1);
    this.apply();
  }
  public addRow() {
    this.filterValue.push({filterType: EnumFilter.filters.equals, filterValue: ''})
    this.apply();
  }
  public apply() {
    const f = this.filterValue.filter(i => i.filterType != undefined && i.filterValue != '');
    this.cell.filters = f;
    this.filterChange.emit({name: this.cell.name, filters: f});
  }
}
