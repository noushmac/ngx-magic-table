import { NgxColumnTemplateComponent } from '../ngx-column-template/ngx-column-template.component';
import { HeaderItem } from './header-item';

export class HeaderCell {
  public cellWidth: number;
  public visible: boolean;
  public name: string;
  public title: string;
  public index: number;
  public colSpan: number;
  public rowSpan: number;
  public sortable: any;
  public template: NgxColumnTemplateComponent;
  public HeaderItem: HeaderItem;
  public constructor(init?: Partial<HeaderCell>) {
    Object.assign(this, init);
    this.title = '';
    this.index = 0;
    this.colSpan = 1;
    this.rowSpan = 1;
    this.sortable = true;
    this.visible = true;
  }
}
