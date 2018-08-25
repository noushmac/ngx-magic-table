import { NgxColumnTemplateComponent } from '../ngx-column-template/ngx-column-template.component';
import { HeaderCell } from 'ngx-magic-table/lib/models/header-cell';

export class HeaderItem {
    public Width: number;
    public Visible: boolean;
    public Name: string;
    public Title: string;
    public Index: number;
    public Childs: HeaderItem[];
    public Sortable: boolean;
    public Template: NgxColumnTemplateComponent;
    public constructor(init?: Partial<HeaderItem>) {
        Object.assign(this, init);
        this.Title = '';
        this.Index = 0;
        this.Sortable = true;
        this.Width = 100;
        this.Visible = true;
        this.Childs = new Array<HeaderItem>();

    }
}
