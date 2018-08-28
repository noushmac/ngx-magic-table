import { element } from 'protractor';
import { PagingInput } from '../models/Paging-input';
import { SortInput } from '../models/sort-input';
import {
  Component,
  OnInit,
  Input,
  ContentChildren,
  TemplateRef,
  QueryList,
  AfterContentInit,
  ContentChild,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewChecked,
  AfterContentChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  Renderer,
  HostListener,
  Renderer2,
  ViewChildren
} from '@angular/core';
import { HeaderItem } from '../models/header-item';
import { HeaderCell } from '../models/header-cell';
import { NgxColumnTemplateComponent } from '../ngx-column-template/ngx-column-template.component';
import { NamedTemplateDirective } from '../ngx-named-template/ngx-named-template.directive';
import SortDirection from '../models/sort-direction';
import guid from 'angular-uid';
import { IPagingInput, ISortInput } from '../models/interface';


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

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.unsubscribeMouseMove = null;
    this.unsubscribeMouseUp = null;
    this.tableWidth = 200;
    this.isRTL = false;
    this.scrollWidth = 0;
  }

  @Input()
  set rows(rows: Array<T>) {
    if (!rows) {
      this._rows = [];
    } else {
      this._rows = rows;
    }
  }
  get rows(): Array<T> {
    return this._rows;
  }

  @Input()
  paginated: Boolean = false;
  @Input()
  customSort: Boolean = true;
  @Input()
  customPaginate: Boolean = false;
  @Input()
  totalCount: Number = 0;
  @Input()
  pageSize: Number = 10;
  @Input()
  currentPage: Number = 1;
  @Input()
  pageSizes: number[] = [10, 20, 50, 100];

  @Input()
  sort: String = '';
  @Input()
  sortDirection: SortDirection = SortDirection.Ascending;

  @Input()
  hidden: Boolean = false;
  @Input()
  selectedClass: String = 'table-secondary';

  @Output()
  pageChange = new EventEmitter<IPagingInput>();
  @Output()
  sortChange = new EventEmitter<ISortInput>();
  @Output()
  pageSizeChange = new EventEmitter<IPagingInput>();

  @Output()
  selectedChange = new EventEmitter<T>();
  @Output()
  columnsArrangeChange = new EventEmitter();

  @Input()
  tableClass: String = 'table'; // table-bordered
  @Input()
  theadClass: String = 'thead-light';
  @Input()
  tbodyClass: String = '';
  @Input()
  trowClass: String = '';
  @Input()
  tcellClass: String = '';
  @Input() isRTL: boolean;

  
  public scrollWidth: number;
  public tableWidth: number;
  public _rows = Array<T>();
  public Math = Math;
  public Arr = Array;
  public templatesArray: NgxColumnTemplateComponent[];
  public cells: Array<Array<HeaderCell>> = new Array<Array<HeaderCell>>();
  public head: Array<HeaderItem> = new Array<HeaderItem>();
  public lowerCells: Array<HeaderCell> = new Array<HeaderCell>();
  public depth = 0;
  public uid = guid();
  public selectedRow: T;
  public draggingCell: HeaderCell;
  public sortInput: SortInput = new SortInput();
  public pagingInput: PagingInput = new PagingInput();

  pixcelXBefore: number;
  widthBefore: number;
  widthAfter: number;
  resizeElement: Element;
  unsubscribeMouseMove: () => void;
  unsubscribeMouseUp: () => void;
  pixcelXAfter: number;

  ngAfterContentInit() {
    NgxColumnTemplateComponent.normalizeIndexes(this.templatesArray);
    this.templatesArray.forEach(i =>
      i.changed.subscribe(() => this.generateCells())
    );
    this.generateCells();
    
  }

  public getLcm(row: any): number {
    const lcm = this.lcmOfList(
      this.lowerCells.map(i => {
        return i.template.collection === ''
          ? 1
          : Math.max(row[i.template.collection.toString()].length, 1);
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
    return (a * b) / this.gcd(a, b);
  }

  public allowDrop(x: any) {
    x.preventDefault();
  }

  public drop(x: HeaderCell) {
    if (this.draggingCell == null) {
      return;
    }
    if (this.draggingCell.template.parent !== x.template.parent) {
      return;
    }

    const tmp = x.template.index;
    x.template.index = this.draggingCell.template.index;
    this.draggingCell.template.index = tmp;
    this.draggingCell = null;

    this.generateCells();
    this.columnsArrangeChange.emit(
      this.templatesArray.map(t => {
        return {
          name: t.name,
          parent: t.parent,
          index: t.index
        };
      })
    );
  }

  public drag(x: HeaderCell) {
    this.draggingCell = x;
  }
  protected generateCells() {
    this.head = this.generateHeaders();
    this.tableWidth = this.head.map(i => +i.Width)
      .reduce<number>((sum, current) => sum + current, 0);
    this.depth = Math.max(
      ...this.head.map(item => {
        return this.Depth(item);
      })
    );

    this.cells = [];
    this.lowerCells = [];
    this.createHeaderCells(this.head, 0, this.depth);
  }


  protected generateHeaders(headerName: String = ''): Array<HeaderItem> {
    const result = new Array<HeaderItem>();
    this.templatesArray
      .filter(t => t.parent === headerName)
      .sort((first, second) => {
        if (first.index > second.index) {
          return -1;
        }
        if (first.index < second.index) {
          return 1;
        }
        return 0;
      })
      .forEach(t => {
        let item: HeaderItem;
        item = new HeaderItem();
        item.Title = t.title;
        item.Index = +t.index;
        item.Sortable = t.sortable;
        item.Template = t;
        item.Visible = t.visible;
        item.Childs = this.generateHeaders(t.name);
        item.Width = item.Childs.length === 0 ? +t.cellWidth : item.Childs.map(i => +i.Width)
          .reduce<number>((sum, current) => sum + current, 0);
        item.Name = t.name;
        result.push(item);
      });
    return result;
  }

  protected createHeaderCells(
    items: HeaderItem[],
    level: number,
    depth: number
  ) {
    if (this.cells.length <= level) {
      this.cells.push(new Array<HeaderCell>());
    }
    const row = this.cells[level];
    items.sort((first, second) => first.Index.valueOf() - second.Index.valueOf())
      .map(h => {
        const c = new HeaderCell();
        c.name = h.Name;
        c.index = h.Index;
        c.title = h.Title;
        c.visible = h.Visible;
        c.cellWidth = h.Width;
        c.sortable = h.Sortable;
        c.template = h.Template;
        c.HeaderItem = h;
        c.colSpan = this.countHeaders(h);
        c.rowSpan = h.Childs.length > 0 ? 1 : depth - level;
        row.push(c);
        if (h.Childs.length > 0) {
          this.createHeaderCells(h.Childs, level + 1, depth);
        } else {
          this.lowerCells.push(c);
        }
      });
  }

  protected countHeaders(item: HeaderItem): number {
    if (item.Childs.length) {
      const headerCount = item.Childs.map(child => {
        return this.countHeaders(child);
      });
      return headerCount.reduce((a, b) => a + b, 0);
    } else {
      return 1;
    }
  }

  protected Depth(item: HeaderItem): number {
    if (item.Childs.length) {
      const depth = Math.max(
        ...item.Childs.map(child => {
          return this.Depth(child);
        })
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

  public changePerPage(pageSize: number) {
    if (this.pageSize === pageSize) {
      return;
    }

    if (this.customPaginate) {
    } else {
      this.pageSize = pageSize;
    }

    this.pagingInput.page = this.currentPage as number;
    this.pagingInput.pageSize = pageSize;
    this.pageSizeChange.emit(
      this.pagingInput
    );
  }

  public selectPage(page: number) {
    if (this.currentPage === page) {
      return;
    }

    if (this.customPaginate) {
    } else {
      this.currentPage = page;
    }

    this.pagingInput.page = page;
    this.pagingInput.pageSize = this.pageSize as number;

    this.pageChange.emit(
      this.pagingInput
    );
  }

  public sortToggle(cell: HeaderCell) {
    if (cell.sortable === false) {
      return;
    }

    let newDirection: SortDirection;

    if (this.sort === cell.name) {
      newDirection =
        this.sortDirection === SortDirection.Ascending
          ? SortDirection.Descending
          : SortDirection.Ascending;
    } else {
      newDirection = SortDirection.Ascending;
    }

    if (!this.customSort) {
      this.sort = cell.name;
      this.sortDirection = newDirection;
    }
    this.sortInput.sort = cell.name as string;
    this.sortInput.direction = newDirection;
    this.sortChange.emit(
      this.sortInput
    );
  }

  onDomChange(width: number): void {
    console.log(width);
    this.scrollWidth = width;
  }

  public resizeCell(width: number, index: number): number {
    if (index == this.lowerCells.length - 1) {
      return width - this.scrollWidth;
    } else {
      return width;
    }

  }
  onResize(event: Event) {
    console.log(event);
  }

  public resizeHandle(cell: HeaderCell, mEvent: MouseEvent) {
    let self = this;
    const tableWidthTemp = this.tableWidth;
    this.pixcelXBefore = mEvent.x;
    this.widthBefore = +cell.cellWidth;
    const draggable = cell.template.draggable;
    const sortable = cell.template.sortable;
    let lastHeaderItem = cell.HeaderItem;
    while (lastHeaderItem.Childs.length > 0) {
      lastHeaderItem = lastHeaderItem.Childs[lastHeaderItem.Childs.length - 1];
    }
    const allCells = this.cells.reduce(function (a, b) { return a.concat(b); });
    const lastCell = allCells.find(i => i.name === lastHeaderItem.Name);


    const widthLastCell = +lastCell.cellWidth;
    this.unsubscribeMouseMove = this.renderer.listen(
      'body',
      'mousemove',
      event => {
        cell.template.draggable = false;
        cell.template.sortable = false;
        let WidthAdd = event.x - this.pixcelXBefore;
        if (this.isRTL) {
          WidthAdd = this.pixcelXBefore - event.x;
        }

        if (lastCell.cellWidth >= 50) {
          cell.cellWidth = this.widthBefore + (WidthAdd);
          lastCell.cellWidth = widthLastCell + (WidthAdd);
          this.tableWidth = tableWidthTemp + (WidthAdd);
        }
      }
    );

    this.unsubscribeMouseUp = this.renderer.listen('body', 'mouseup', event => {
      if (lastCell.cellWidth < 50) {
        lastCell.cellWidth = 50;
      }
      lastCell.template.cellWidth = lastCell.cellWidth;

      if (cell.cellWidth < 50) {
        cell.cellWidth = 50;
      }
      cell.template.cellWidth = cell.cellWidth;

      cell.template.draggable = draggable;
      cell.template.sortable = sortable;

      
      console.log(self);

      if (this.unsubscribeMouseMove) {
        this.unsubscribeMouseMove();
        this.unsubscribeMouseMove = null;
        this.generateCells();
      }

      if (this.unsubscribeMouseUp) {
        this.unsubscribeMouseUp();
        this.unsubscribeMouseUp = null;
      }
    });
  }
}
