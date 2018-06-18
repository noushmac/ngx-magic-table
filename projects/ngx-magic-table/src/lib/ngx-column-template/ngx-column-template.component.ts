import { Component, Input, Output, EventEmitter, ContentChildren, TemplateRef, QueryList, SimpleChanges, AfterContentInit } from '@angular/core';
import { NamedTemplateDirective } from './../ngx-named-template/ngx-named-template.directive';

@Component({
  selector: 'ngx-column-template',
  templateUrl: './ngx-column-template.component.html',
  styleUrls: ['./ngx-column-template.component.css']
})
export class NgxColumnTemplateComponent implements AfterContentInit {
  @Input() name: String = '';
  @Input() parent: String = '';
  @Input() title: String = '';
  @Input() index: Number = 0;
  @Input() sortable: Boolean = true;
  @Input() draggable: Boolean = true;
  @Input() collection: String = '';

  @Output() changed = new EventEmitter();


  public filters: any[] = [];
  @ContentChildren(NamedTemplateDirective) templates: QueryList<NamedTemplateDirective>;

  public header: TemplateRef<any>;
  public body: TemplateRef<any>;
  public filter: TemplateRef<any>;


  static normalizeIndexes(templates: NgxColumnTemplateComponent[] ) {
    templates.sort((first, second) => {
      if (first.parent < second.parent) { return -1; }
      if (first.parent > second.parent) { return 1; }

      if (first.index < second.index) { return -1; }
      if (first.index > second.index) { return 1; }
      return 0;
    }).forEach((t, index) => {
      t.index = index;
    });
  }

  ngAfterContentInit() {
    const h = this.templates.find(t => t.name === 'header');
    this.header = h ? h.template : undefined;
    const b = this.templates.find(t => t.name === 'body');
    this.body = b ? b.template : undefined;
    const f = this.templates.find(t => t.name === 'filter');
    this.filter = f ? f.template : undefined;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.changed.emit(this);
  }

}
