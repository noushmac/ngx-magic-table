import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HeaderCell } from '../models/header-cell';
import { NumericFilter } from '../models/numeric-filter';
@Component({
  selector: 'ngx-numeric-filter',
  templateUrl: './ngx-numeric-filter.component.html',
  styleUrls: ['./ngx-numeric-filter.component.css']
})
export class NgxNumericFilterComponent implements OnInit {
  @Input() rows: any[];
  @Input() cell: HeaderCell;

  @Output() filterChange= new EventEmitter();
  
  public NumericFilter = NumericFilter;
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
    this.filterValue.push({filterType: NumericFilter.filters.equals, filterValue: ''})
    this.apply();
  }
  public apply() {
    const f = this.filterValue.filter(i => i.filterType != undefined && i.filterValue != '');
    this.cell.filters = f;
    this.filterChange.emit({name: this.cell.name, filters: f});
  }
}
