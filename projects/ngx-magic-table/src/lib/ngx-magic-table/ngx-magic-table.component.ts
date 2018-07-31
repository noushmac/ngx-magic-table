import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  TemplateRef,
  QueryList,
  AfterContentInit,
  ContentChild, Output,
  EventEmitter,
  ViewChild,
  AfterViewChecked,
  AfterContentChecked,
  AfterViewInit
} from '@angular/core';
import { HeaderItem } from './../models/header-item';
import { HeaderCell } from './../models/header-cell';
import { NgxColumnTemplateComponent } from './../ngx-column-template/ngx-column-template.component';
import { NamedTemplateDirective } from './../ngx-named-template/ngx-named-template.directive';
import SortDirection from './../models/sort-direction';
import guid from 'angular-uid';


@Component({
  selector: 'ngx-magic-table',
  templateUrl: './ngx-magic-table.component.html',
  styleUrls: ['./ngx-magic-table.component.css']
})

export class NgxMagicTableComponent<T> implements AfterContentInit {

  @ContentChildren(NgxColumnTemplateComponent)
  set templates(value: QueryList<NgxColumnTemplateComponent>) {
    this.templatesArray = value.toArray();
  }

  @Input() rows: Array<T> = [];

  @Input() paginated: Boolean = false;
  @Input() customSort: Boolean = true;
  @Input() customPaginate: Boolean = false;
  @Input() totalCount: Number = 0;
  @Input() perPage: Number = 10;
  @Input() currentPage: Number = 1;
  @Input() perPages: Number[] = [10, 20, 50, 100];

  @Input() sort: String = '';
  @Input() sortDirection: SortDirection = SortDirection.Ascending;

  @Input() hidden: Boolean = false;
  @Input() selectedClass: String = 'table-secondary';

  @Output() pageChange = new EventEmitter();
  @Output() sortChange = new EventEmitter();
  @Output() perPageChange = new EventEmitter();

  @Output() selectedChange = new EventEmitter<T>();
  @Output() columnsArrangeChange = new EventEmitter();

  @Input() tableClass: String = 'table table-bordered';
  @Input() theadClass: String = 'thead-light';
  @Input() tbodyClass: String = '';
  @Input() trowClass: String = '';
  @Input() tcellClass: String = '';

  public Math = Math;
  public Arr = Array;
  public templatesArray: NgxColumnTemplateComponent[];
  public head: Array<HeaderItem> = new Array<HeaderItem>();
  public cells: Array<Array<HeaderCell>> = new Array<Array<HeaderCell>>();
  public lowerCells: Array<HeaderCell> = new Array<HeaderCell>();
  public depth = 0;
  public uid = guid();
  public selectedRow: T;
  public  draggingCell: HeaderCell;

  ngAfterContentInit() {
    NgxColumnTemplateComponent.normalizeIndexes(this.templatesArray);
    this.templatesArray.forEach(i => i.changed.subscribe(() => this.reArrangeColumns()));
    this.generateCells();
  }

  public getLcm(row: any): number {
    const lcm = this.lcmOfList(
      this.lowerCells.map(i => {
        return (i.template.collection === '') ?  1 : Math.max(row[i.template.collection.toString()].length, 1);
      })
    );
    return lcm;
  }

  public gcd(a, b): number {
    if (b === 0) {
        return a; // so that the recursion does not go on forever
    } else {
        return this.gcd(b, a % b);
    }
  }

  public lcmOfList(arr): number {
    const d = this;
    const t = arr.reduce((a, b) => d.lcm(a, b));
    return t;
  }

  public lcm(a, b): number {
    return a * b / this.gcd(a, b);
  }

  public allowDrop(x: any) {
    x.preventDefault();
  }

  public drop(x: HeaderCell) {
    if (this.draggingCell == null) { return; }
    if (this.draggingCell.template.parent !== x.template.parent) { return; }

    const tmp = x.template.index;
    x.template.index = this.draggingCell.template.index;
    this.draggingCell.template.index = tmp;
    this.draggingCell = null;

    this.reArrangeColumns();
    this.columnsArrangeChange.emit(this.templatesArray.map((t) => {
      return {
        name: t.name,
        parent: t.parent,
        index: t.index
      };
    }));
  }

  public drag(x: HeaderCell) {
    this.draggingCell = x;
  }

  protected generateCells() {
    this.head = [];
    this.generateHeaders();

    this.depth = Math.max(...(
      this.head.map((item) => {
        return this.Depth(item);
      })
    ));

    this.cells = [];
    this.lowerCells = [];
    this.createHeaderCells(this.head, 0, this.depth);
  }

  protected generateHeaders(): void {

    this.templatesArray.filter(t => t.parent === '').sort((first, second) => {
      if (first.index > second.index) { return -1; }
      if (first.index < second.index) { return 1; }
      return 0;
    }).forEach(t => {
      this.head.push({
        Title: t.title,
        Index: t.index,
        Sortable: t.sortable,
        Template: t,
        Childs: this.generateHeaderChilds(t.name),
        Name: t.name
      });
    });
  }

  protected generateHeaderChilds(headerName: String): Array<HeaderItem> {
    const result = new Array<HeaderItem>();
    this.templatesArray.filter(t => t.parent !== '' && t.parent === headerName).sort((first, second) => {
      if (first.index > second.index) { return -1; }
      if (first.index < second.index) { return 1; }
      return 0;
    }).forEach(t => {
      result.push({
        Title: t.title,
        Index: t.index,
        Sortable: t.sortable,
        Template: t,
        Childs: this.generateHeaderChilds(t.name),
        Name: t.name
      });
    });
    return result;
  }

  protected createHeaderCells(items: HeaderItem[], level: number, depth: number) {
    if (this.cells.length <= level) {
      this.cells.push(new Array<HeaderCell>());
    }
    const row = this.cells[level];
    items.sort((first, second) => (first.Index.valueOf() - second.Index.valueOf()))
      .map(h => {
        const c = new HeaderCell({
          name: h.Name,
          index: h.Index,
          title: h.Title,
          sortable: h.Sortable,
          template: h.Template,
          colSpan: this.countHeaders(h),
          rowSpan: (h.Childs.length > 0) ? 1 : depth - level
        });
        row.push(
          c
        );
        if (h.Childs.length > 0) {
          this.createHeaderCells(h.Childs, level + 1, depth);
        } else {
          this.lowerCells.push(c);
        }
      });
  }

  protected countHeaders(item: HeaderItem): number {
    if (item.Childs.length) {
      const headerCount = item.Childs.map((child) => {
        return this.countHeaders(child);
      });
      return headerCount.reduce((a, b) => a + b, 0);
    } else {
      return 1;
    }
  }

  protected Depth(item: HeaderItem): number {
    if (item.Childs.length) {
      const depth = Math.max(...(
        item.Childs.map((child) => {
          return this.Depth(child);
        })
      )
      );
      return depth + 1;
    } else {
      return 1;
    }
  }

  public selectRow(row: T) {
    this.selectedRow = row;
    this.selectedChange.emit(this.selectedRow);
  }

  public changePerPage(perPage: number) {
    if (this.perPage === perPage) { return; }

    if (this.customPaginate) {
    } else {
      this.perPage = perPage;
    }
    this.perPageChange.emit({
      page: this.currentPage,
      perPage: perPage,
      sort: this.sort,
      direction: this.sortDirection
    });
  }

  public selectPage(page: number) {
    if (this.currentPage === page) { return; }

    if (this.customPaginate) {
    } else {
      this.currentPage = page;
    }
    this.pageChange.emit({
      page: page,
      perPage: this.perPage,
      sort: this.sort,
      direction: this.sortDirection
    });
  }


  public sortToggle(cell: HeaderCell) {
    if (cell.sortable === false) { return; }

    let newDirection: SortDirection;

    if (this.sort === cell.name) {
      newDirection = this.sortDirection === SortDirection.Ascending ?
                      SortDirection.Descending : SortDirection.Ascending;
    } else {
      newDirection = SortDirection.Ascending;
    }

    if (!this.customSort) {
      this.sort = cell.name;
      this.sortDirection = newDirection;
    }

    this.sortChange.emit({
      page: this.currentPage,
      perPage: this.perPage,
      sort: cell.name,
      direction: newDirection
    });
  }

  public reArrangeColumns() {

    this.generateCells();
  }
}
