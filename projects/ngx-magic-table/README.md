# Magic Table

Angular 6 smart Datatable, provides sort, arrange columns, custom header, cell templates and grouping columns


## Getting start
Install package:
```bash
    npm i ngx-magic-table
```
Add NgxTemplatableModule inside your AppModule
```typescript
import { NgxTemplatingTableModule } from 'ngx-magic-table';


@NgModule({
  ...
  imports: [
    ...

    NgxTemplatingTableModule, // import NgxTemplatingTableModule 

    ...
  ],
  ...
})
```
Use `<ngx-templating-table>`
```html
<ngx-templating-table
    [rows]="data"

    [customSort]="false"
    sort="Phone"
    sortDirection="desc"
    (sortChanged)="logAll($event)"

    [paginated]="true"
    [perPage]="5"
    [customPaginate]="false"
    [totalCount]="60"
    [currentPage]="2"
    [perPages]="[5, 20, 50, 100]"
    (perPageChanged)="logAll($event)"
    (pageChanged)="logAll($event)"

    (selectChanged)="logAll($event)"
    selectedClass="table-secondary"

    (columnsArrageChanged)="logAll($event)"
    >

    <ngx-templating-column name="Numbers" index="1" [sortable]="false" >
        <ng-template let-cell="cell" let-direction="direction"  name="header">{{cell.name}}  </ng-template>
    </ngx-templating-column>

    <ngx-templating-column name="Phone" parent="Numbers" index="2" >
        <ng-template let-cell="cell" let-direction="direction"  name="header">{{cell.name}} <i class="fa" *ngIf="direction" [ngClass]="direction == 'asc' ? 'fa-arrow-up' : 'fa-arrow-down'" ></i> </ng-template>
        <ng-template let-row="row" let-cell="cell" name="body">{{row.Phone}}</ng-template>
    </ngx-templating-column>

    <ngx-templating-column name="Id" parent="Numbers"  index="1" [draggable]="false">
        <ng-template let-row="row" let-cell="cell" name="body">{{row.Id}}</ng-template>
        <ng-template let-cell="cell" let-direction="direction"  name="header">{{cell.name}} <i class="fa" *ngIf="direction" [ngClass]="direction == 'asc' ? 'fa-arrow-up' : 'fa-arrow-down'" ></i> </ng-template>
    </ngx-templating-column>

    <ngx-templating-column name="Name"  index="1" [draggable]="false">
        <ng-template let-row="row" let-cell="cell" name="body">{{row.Name}}</ng-template>
        <ng-template let-cell="cell" let-direction="direction"  name="header">{{cell.name}} <i class="fa" *ngIf="direction" [ngClass]="direction == 'asc' ? 'fa-arrow-up' : 'fa-arrow-down'" ></i> </ng-template>
    </ngx-templating-column>

</ngx-templating-table>
```
## Preview
![Preview](https://i.imgur.com/u6W2JBF.jpg)

## Next up

- Detailed documentation will be ready soon
- Source code will be available on github soon

## Contact

[Github](https://github.com/mvakili)
## License
MIT
