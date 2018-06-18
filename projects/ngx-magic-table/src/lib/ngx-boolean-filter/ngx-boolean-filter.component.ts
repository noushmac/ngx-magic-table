import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HeaderCell } from '../models/header-cell';
import { BooleanFilter } from '../models/boolean-filter';
@Component({
  selector: 'ngx-boolean-filter',
  templateUrl: './ngx-boolean-filter.component.html',
  styleUrls: ['./ngx-boolean-filter.component.css']
})
export class NgxBooleanFilterComponent implements OnInit {
  @Input() rows: any[];
  @Input() cell: HeaderCell;
  @Input() items: any[];

  @Output() filterChange= new EventEmitter();
  
  public BooleanFilter = BooleanFilter;
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
    this.filterValue.push({filterType: BooleanFilter.filters.equals, filterValue: ''})
    this.apply();
  }
  public apply() {
    const f = this.filterValue.filter(i => i.filterType != undefined && i.filterValue != '');
    this.cell.filters = f;
    this.filterChange.emit({name: this.cell.name, filters: f});
  }
}
