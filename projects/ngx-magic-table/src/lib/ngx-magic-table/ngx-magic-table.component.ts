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
import { NgxMultiselectDropdownComponent } from '../ngx-multiselect-dropdown/ngx-multiselect-dropdown.component';
import { OrderDirection } from '../models/enum';

import guid from 'angular-uid';
import { IPagingInput, ISortInput } from '../models/interface';
import { CellsInfo } from '../models/cells-info';
import { delay } from 'q';
import { ReturnStatement } from '@angular/compiler';
import { ReverseArray } from '../pipe/reverse-array';


@Component({
  selector: 'ngx-magic-table',
  templateUrl: './ngx-magic-table.component.html',
  styleUrls: ['./ngx-magic-table.component.css']
})
export class NgxMagicTableComponent<T> implements AfterContentInit {
  @ContentChildren(NgxColumnTemplateComponent)
  set templates(value: QueryList<NgxColumnTemplateComponent>) {
    this.templatesArray = value.toArray();
    if (this.templatesArrayBase == null) {
      this.templatesArrayBase = new Array<ColumnTable>();
      for (let index = 0; index < this.templatesArray.length; index++) {
        const element = this.templatesArray[index];
        const columntable = new ColumnTable();
        columntable.index = element.index;
        columntable.cellWidth = element.cellWidth;
        columntable.sortable = element.sortable;
        columntable.draggable = element.draggable;
        columntable.visible = element.visible;
        this.templatesArrayBase.push(columntable);
      }
    }
  }

  @ContentChild('pagination')
  pagination: TemplateRef<ElementRef>;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.unsubscribeMouseMove = null;
    this.unsubscribeMouseUp = null;
    this.tableWidth = 200;
    this.mainWidth = 200;
    this.isRTL = false;
    this.scrollWidth = 0;
    this.listcellsInfo = new Array<CellsInfo>();
    this.buttonListColumnStyle = 'btn btn-outline-info';
    this.buttonSaveTableStyle = 'btn btn-outline-info';
    this.templatesArray = new Array<NgxColumnTemplateComponent>();
    this.templatesArrayBase = null;
    this.autoSize = true;
    this.message = '';
    this.rowClassRenderer = row => '';
    this.MinWidth = 80;
    if (this.pageSize == null) {
      this.pageSize = 10;
    }
    this.rows = new Array<T>();
    this.footerRows = new Array<T>();
  }

  @Input() rows = Array<T>();

  // @Input() footerRows = Array<any>();

  public _footerRows = Array<any>();

  @Input()
  set footerRows(footerRows: Array<any>) {
    if (!footerRows) {
      this._footerRows = [];
    } else {
      this._footerRows = footerRows;
      // this.onLoadTable();
    }
    // this.onLoadTable();
  }

  get footerRows(): Array<any> {
    return this._footerRows;
  }






  // set rows(rows: Array<T>) {
  //   if  (!rows) {
  //     this.rows = [];
  //   } else {
  //     this.rows = rows;
  //   }
  // }
  // get rows(): Array<T> {
  //   return this.rows;
  // }

  @Input()
  autoSize: Boolean;

  @Input() buttonSaveTableStyle: string;
  @Input() buttonListColumnStyle: string;
  @Input()
  paginated: Boolean = false;
  @Input()
  customSort: Boolean = true;
  @Input()
  customPaginate: Boolean = false;
  @Input()
  totalCount: number = 0;
  @Input()
  pageSize?: number = 10;
  @Input()
  currentPage: number = 1;
  @Input()
  pageSizes: number[] = [10, 20, 50, 100];

  @Input()
  sort: String = '';
  @Input()
  sortDirection: OrderDirection = OrderDirection.Ascending;
  @Input()
  hidden: Boolean = false;
  @Input()
  selectedClass: String = 'table-secondary';

  @Input() rowSelected: T;

  @Output()
  pageChange = new EventEmitter<IPagingInput>();
  @Output()
  sortChange = new EventEmitter<ISortInput>();
  @Output()
  pageSizeChange = new EventEmitter<IPagingInput>();

  @Output()
  selectedChange = new EventEmitter<T>();
  @Output()
  doubleClick = new EventEmitter<T>();
  @Output()
  columnsArrangeChange = new EventEmitter();

  @Output() saveTable = new EventEmitter<Array<CellsInfo>>();
  @Output() resetTable = new EventEmitter<boolean>();

  @Input()
  set loadTable(loadTable: Array<CellsInfo>) {
    if (!loadTable) {
      this._loadTable = [];
    } else {
      this._loadTable = loadTable;
      // this.onLoadTable();
    }
    this.onLoadTable();
  }

  get loadTable(): Array<CellsInfo> {
    return this._loadTable;
  }

  @Input()
  isRTL: boolean;
  @Input()
  rowClassRenderer: (data: T) => string;
  @Input()
  tableClass: String = 'table';
  @Input()
  theadClass: String = 'thead-light';
  @Input()
  tbodyClass: String = '';

  @Input()
  footerCssClass: String = 'footerTd';

  dropdownList = [];
  dropdownselectedItems = [];
  dropdownSettings = {};
  public listcellsInfo: Array<CellsInfo>;
  public scrollWidth: number;
  public tableWidth: number;
  public mainWidth: number;

  public _loadTable = Array<CellsInfo>();

  // public _rowsFilter = Array<T>();
  public Math = Math;
  public Arr = Array;
  public templatesArray: NgxColumnTemplateComponent[];
  public templatesArrayBase: ColumnTable[];
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
  MinWidth: number;
  message: string;

  ngAfterContentInit() {
    this.onLoadTable();
  }

  public getLcm(row: any): number {
    const lcm = this.lcmOfList(
      this.lowerCells.map(i => {
        return i.template.collection === ''
          ? 1
          : row[i.template.collection.toString()] != null
          ?  Math.max(row[i.template.collection.toString()].length, 1)
          : 1;
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
    this.setDropdownList();
  }

  public drag(x: HeaderCell) {
    this.draggingCell = x;
  }
  protected generateCells() {
    this.head = this.generateHeaders();
    this.tableWidth = this.head
      .map(i => +i.Width)
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

  mainSize(): number {
    let htmlElement = document.getElementById('MainMagicTableId');
    return htmlElement.clientWidth;
  }

  protected autoSizeCells(clientWidth: number) {
    let rowCount = 0;
    for (let index = 0; index < this.templatesArray.length; index++) {
      const element = this.templatesArray[index];
      let childs = this.templatesArray.filter(t => t.parent === element.name);
      if (childs.length < 1) {
        rowCount++;
      }
    }

    let cellWidth = clientWidth / rowCount;
    if (cellWidth < this.MinWidth) {
      cellWidth = this.MinWidth;
    }
    for (let index = 0; index < this.templatesArray.length; index++) {
      const element = this.templatesArray[index];
      let childs = this.templatesArray.filter(t => t.parent === element.name);
      if (childs.length < 1) {
        element.cellWidth = cellWidth;
        this.templatesArray[index] = element;
      }
    }
  }

  protected generateHeaders(headerName: String = ''): Array<HeaderItem> {
    const result = new Array<HeaderItem>();
    this.templatesArray
      .filter(t => t.parent === headerName)
      .filter(t => t.visible === true)
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
        item.Width =
          item.Childs.length === 0 && item.Visible === true
            ? +t.cellWidth
            : item.Childs.map(i => +i.Width).reduce<number>(
                (sum, current) => sum + current,
                0
              );
        item.Name = t.name;
        result.push(item);
        this.dropdownselectedItems.push({
          item_id: item.Index,
          item_text: item.Name,
          parent: headerName
        });
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
    items
      .sort((first, second) => first.Index.valueOf() - second.Index.valueOf())
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
          if (h.Visible === true) {
            this.lowerCells.push(c);
          }
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
    this.rowSelected = row;
    this.selectedChange.emit(this.selectedRow);
  }
  public doubleSelectRow(row: T) {
    this.selectedRow = row;
    this.rowSelected = row;
    this.doubleClick.emit(this.selectedRow);
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
    this.pageSizeChange.emit(this.pagingInput);
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

    this.pageChange.emit(this.pagingInput);
  }

  public sortToggle(cell: HeaderCell) {
    if (cell.sortable === false) {
      return;
    }

    let newDirection: OrderDirection;

    if (this.sort === cell.name) {
      newDirection =
        this.sortDirection === OrderDirection.Ascending
          ? OrderDirection.Descending
          : OrderDirection.Ascending;
    } else {
      newDirection = OrderDirection.Ascending;
    }

    if (!this.customSort) {
      this.sort = cell.name;
      this.sortDirection = newDirection;
    }
    this.sortInput.sort = cell.name as string;
    this.sortInput.direction = newDirection;
    this.sortChange.emit(this.sortInput);
  }

  onDomChange(element: ElementRef): void {
    let width =
      element.nativeElement.offsetWidth - element.nativeElement.clientWidth;

    this.scrollWidth = width;
  }

  public inverseArray(array: Array<HeaderCell>): Array<HeaderCell> {
    let inverse = new Array<HeaderCell>();
    for (let i = array.length - 1; i >= 0; i--) {
      inverse.push(array[i]);
    }
    return inverse;
  }

  public resizeCell(width: number, index: number): number {
    if (index == this.lowerCells.length - 1) {
      return width - this.scrollWidth;
    } else {
      return width;
    }

  }

  onItemSelect(items: any) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let template = this.templatesArray.find(t => t.index === item.item_id);
      let index = this.templatesArray.indexOf(item);
      template.visible = true;
      this.templatesArray[index] = template;
    }
    // this.setTableSetting();
    this.generateCells();

  }
  onItemDeSelect(items: any) {
    for (let j = 0; j < this.templatesArray.length; j++) {
      let item = items.filter(t => t.item_id === this.templatesArray[j].index);
      if (item.length <= 0) {
        this.templatesArray[j].visible = false;
        this.templatesArray[j] = this.templatesArray[j];
      }
    }
    // this.setTableSetting();
    this.generateCells();
  }
  onSelectAll(items: any) {
    for (let i = 0; i < this.templatesArray.length; i++) {
      const template = this.templatesArray[i];
      let index = this.templatesArray.indexOf(template);
      template.visible = true;
      this.templatesArray[index] = template;
    }
    // this.setTableSetting();
    this.generateCells();
  }
  onResetTable() {
    this.message = '  Reseting Table ...  ';
    this.resetTable.emit(true);
    this.setMessage('  Table Reset Successfully  ');
  }

  onMainDomChange(element: ElementRef): void {
    if (this.autoSize) {
      let width = element.nativeElement.clientWidth;
      this.autoSizeCells(width);
      this.generateCells();
    }
  }

  setTableSetting() {
    this.listcellsInfo = null;
    this.listcellsInfo = new Array<CellsInfo>();
    for (let i = 0; i < this.templatesArray.length; i++) {
      const element = this.templatesArray[i];
      this.listcellsInfo.push({
        index: element.index,
        name: element.name,
        cellWidth: element.cellWidth,
        parent: element.parent,
        sortable: element.sortable,
        draggble: element.draggable,
        visible: element.visible
      });
    }
    this.loadTable = this.listcellsInfo;
  }

  onsaveTable() {
    this.message = '  Saving Table ...  ';
    this.setTableSetting();
    // this.listcellsInfo = null;
    // this.listcellsInfo = new Array<CellsInfo>();
    // for (let i = 0; i < this.templatesArray.length; i++) {
    //   const element = this.templatesArray[i];
    //   this.listcellsInfo.push({
    //     index: element.index, name: element.name, cellWidth: element.cellWidth,
    //     parent: element.parent, sortable: element.sortable, draggble: element.draggable, visible: element.visible
    //   });
    // }
    // this.loadTable = this.listcellsInfo;
    this.saveTable.emit(this.listcellsInfo);
    this.setMessage('  Table Saved Successfully  ');
  }

  async setMessage(message: string): Promise<void> {
    await delay(3000);
    this.message = message;
    await delay(3000);
    this.message = '';
  }

  onLoadTable() {
    if (this.templatesArrayBase != null) {
      for (let index = 0; index < this.templatesArrayBase.length; index++) {
        const element = this.templatesArrayBase[index];
        this.templatesArray[index].index = element.index;
        this.templatesArray[index].cellWidth = element.cellWidth;
        this.templatesArray[index].sortable = element.sortable;
        this.templatesArray[index].draggable = element.draggable;
        this.templatesArray[index].visible = element.visible;
      }
    }

    if (this.templatesArray.length > 0) {
      NgxColumnTemplateComponent.normalizeIndexes(this.templatesArray);
      this.templatesArray.forEach(i =>
        i.changed.subscribe(() => this.generateCells())
      );

      let changedTable = false;

      if (this.loadTable != null && this.loadTable.length > 0) {
        for (let i = 0; i < this.templatesArray.length; i++) {
          let template = this.loadTable.filter(x => x.name === this.templatesArray[i].name);
          if (template == null || template.length == 0) {
            if (this.autoSize) {
              this.autoSizeCells(this.mainSize());
            }
            this.dropdownselectedItems = [];
            this.setDropdownList();

            this.dropdownSettings = {
              singleSelection: false,
              idField: 'item_id',
              textField: 'item_text',
              selectAllText: 'Select All',
              unSelectAllText: 'UnSelect All',
              itemsShowLimit: 2,
              allowSearchFilter: true
            };
            this.generateCells();
            this.setMessage('  The table has changed. Consider the changes you need again   ');
            changedTable = true;
            return;
          }
        }
      }




      if (!changedTable) {
        for (let i = 0; i < this.loadTable.length; i++) {
          const element = this.loadTable[i];
          let template = this.templatesArray.filter(x => x.name === element.name);
          if (template != null && template.length > 0) {
            const index = this.templatesArray.indexOf(template[0]);

            template[0].index = element.index;
            template[0].cellWidth = element.cellWidth;
            template[0].sortable = element.sortable;
            template[0].draggable = element.draggble;
            template[0].visible = element.visible;

            this.templatesArray[index] = template[0];
          }

        }
        this.templatesArray = this.templatesArray.sort(x => x.index);
        // this.generateCells();
      }

      if (this.autoSize) {
        this.autoSizeCells(this.mainSize());
      }

      this.dropdownselectedItems = [];

      this.setDropdownList();

      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: true
      };
      this.generateCells();
    }
  }

  public setDropdownList() {
    this.dropdownList = [];
    for (let index = 0; index < this.templatesArray.length; index++) {
      const element = this.templatesArray[index];
      this.dropdownList.push({
        item_id: element.index,
        item_text: element.title,
        parent: element.parent
      });
    }
  }

  public resizeHandle(cell: HeaderCell, mEvent: MouseEvent, idTbody: string) {
    event.preventDefault();
    let tbodyId = idTbody;
    const tableWidthTemp = this.tableWidth;
    this.pixcelXBefore = mEvent.x;
    this.widthBefore = +cell.cellWidth;
    const draggable = cell.template.draggable;
    const sortable = cell.template.sortable;
    let lastHeaderItem = cell.HeaderItem;
    while (lastHeaderItem.Childs.length > 0) {
      lastHeaderItem = lastHeaderItem.Childs[lastHeaderItem.Childs.length - 1];
    }
    const allCells = this.cells.reduce(function(a, b) {
      return a.concat(b);
    });
    const lastCell = allCells
      .filter(t => t.visible === true)
      .find(i => i.name === lastHeaderItem.Name);

    const widthLastCell = +lastCell.cellWidth;
    this.unsubscribeMouseMove = this.renderer.listen(
      'document',
      'mousemove',
      event => {
        // if (this.isLastColumnMouse) {
        // 	return;
        // }
        event.preventDefault();
        cell.template.draggable = false;
        cell.template.sortable = false;
        let WidthAdd = event.x - this.pixcelXBefore;
        if (this.isRTL) {
          WidthAdd = this.pixcelXBefore - event.x;
        }

        if (lastCell.cellWidth >= this.MinWidth) {
          cell.cellWidth = this.widthBefore + WidthAdd;
          lastCell.cellWidth = widthLastCell + WidthAdd;
          this.tableWidth = tableWidthTemp + WidthAdd;
        }
      }
    );

    this.unsubscribeMouseUp = this.renderer.listen(
      'document',
      'mouseup',
      event => {
        event.preventDefault();
        if (lastCell.cellWidth < this.MinWidth) {
          lastCell.cellWidth = this.MinWidth;
        }
        lastCell.template.cellWidth = lastCell.cellWidth;

        if (cell.cellWidth < this.MinWidth) {
          cell.cellWidth = this.MinWidth;
        }
        cell.template.cellWidth = cell.cellWidth;

        cell.template.draggable = draggable;
        cell.template.sortable = sortable;

        let htmlElement = document.getElementById(tbodyId);
        this.scrollWidth = htmlElement.offsetWidth - htmlElement.clientWidth;
        if (this.unsubscribeMouseMove) {
          this.unsubscribeMouseMove();
          this.unsubscribeMouseMove = null;
          this.generateCells();
        }

        if (this.unsubscribeMouseUp) {
          this.unsubscribeMouseUp();
          this.unsubscribeMouseUp = null;
        }
      }
    );
  }
}

export class ColumnTable {
  index: number;
  cellWidth: number;
  sortable: boolean;
  draggable: boolean;
  visible: boolean;
}
