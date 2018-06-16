import { NgxColumnTemplateComponent } from '../ngx-column-template/ngx-column-template.component';

export class HeaderItem {
    public Name: String;
    public Title: String = '';
    public Index: Number = 0;
    public Childs: HeaderItem[] = [];
    public Sortable: Boolean = true;
    public Template: NgxColumnTemplateComponent;
    public constructor(init?: Partial<HeaderItem>) {
        Object.assign(this, init);
    }
}
