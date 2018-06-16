import { NgxColumnTemplateComponent } from '../ngx-column-template/ngx-column-template.component';

export class HeaderCell {
    public name: String;
    public title: String = '';
    public index: Number = 0;
    public colSpan: Number = 1;
    public rowSpan: Number = 1;
    public sortable: any = true;
    public template: NgxColumnTemplateComponent;
    public constructor(init?: Partial<HeaderCell>) {
        Object.assign(this, init);
    }
}
