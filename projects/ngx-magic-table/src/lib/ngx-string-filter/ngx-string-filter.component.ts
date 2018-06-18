import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HeaderCell } from '../models/header-cell';
import { StringFilter } from '../models/string-filter';
@Component({
  selector: 'ngx-string-filter',
  templateUrl: './ngx-string-filter.component.html',
  styleUrls: ['./ngx-string-filter.component.css']
})
export class NgxStringFilterComponent implements OnInit {
  @Input() rows: any[];
  @Input() cell: HeaderCell;

  @Output() filterChange= new EventEmitter();

  public StringFilter = StringFilter;
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
    this.filterValue.push({filterType: StringFilter.filters.contains, filterValue: ''})
    this.apply();
  }
  public apply() {
    const f = this.filterValue.filter(i => i.filterType != undefined && i.filterValue != '');
    this.cell.template.filters = f;
    this.filterChange.emit({name: this.cell.name, filters: f});
  }
}
