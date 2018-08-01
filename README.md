# Magic Table

[![Build Status](https://api.travis-ci.org/noushmac/ngx-magic-table.svg?branch=master)](https://travis-ci.org/noushmac/ngx-magic-table)
[![Maintainability](https://api.codeclimate.com/v1/badges/9bdb33820bfdaa028c78/maintainability)](https://codeclimate.com/github/noushmac/ngx-magic-table/maintainability)
[![npm version](https://img.shields.io/npm/v/ngx-magic-table.svg)](https://img.shields.io/npm/v/ngx-magic-table.svg)
[![npm downloads](https://img.shields.io/npm/dt/ngx-magic-table.svg)](https://img.shields.io/npm/dt/ngx-magic-table.svg)


Angular 6 smart DataGrid based on `bootstrap` and `font-awesome`, provides sort, arrange columns, custom header, cell templates and grouping columns

## Demo

Try [Demo](https://stackblitz.com/edit/angular-cyry7o?file=src%2Fapp%2Fapp.component.html)


## Getting start
Install package:
```bash
npm i ngx-magic-table
```
Add `NgxMagicTableModule` inside your AppModule
```typescript
import { NgxMagicTableModule } from 'ngx-magic-table';


@NgModule({
  ...
  imports: [
    ...

    NgxMagicTableModule, // import NgxMagicTableModule

    ...
  ],
  ...
})
```
Make sure you have included `bootstrap` and `font-awesome` styles
```json
"styles": [
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "node_modules/font-awesome/css/font-awesome.css"
],
```

Use `<ngx-magic-table>`
```html
<ngx-magic-table
    [rows]="data"
    [customSort]="false"
    sort="Phone"
    sortDirection="0"
    (sortChange)="logAll($event)"
    [paginated]="true"
    [pageSize]="3"
    [customPaginate]="false"
    [currentPage]="2"
    [pageSizes]="[3, 5, 20, 50, 100]"
    (pageSizeChange)="logAll($event)"
    (pageChange)="logAll($event)"
    (selectedChange)="logAll($event)"
    selectedClass="table-secondary"
    (columnsArrangeChange)="logAll($event)"
    tableClass="table table-bordered"
    theadClass="thead-light"
    trowClass="table-primary"
    tcellClass="text-center"
    
    >

    <ngx-column-template name="Numbers" index="1" [sortable]="false" >
        <ng-template let-cell="cell" let-direction="direction"  name="header">{{cell.name}}  </ng-template>

    </ngx-column-template>

    <ngx-column-template name="Phone" parent="Numbers" index="2" >
        <ng-template let-cell="cell" let-direction="direction"  name="header">{{cell.name}} <i class="fa" *ngIf="direction!=null" [ngClass]="{'fa-arrow-up': (direction == 0), 'fa-arrow-down': (direction != 0)}" ></i> </ng-template>
        <ng-template let-row="row" let-cell="cell" name="body">{{row.Phone}}</ng-template>

    </ngx-column-template>

    <ngx-column-template name="Id" parent="Numbers"  index="1" [draggable]="false">
        <ng-template let-row="row" let-cell="cell" name="body">{{row.Id}}</ng-template>
        <ng-template let-cell="cell" let-direction="direction"  name="header">{{cell.name}} <i class="fa" *ngIf="direction!=null" [ngClass]="{'fa-arrow-up': (direction == 0), 'fa-arrow-down': (direction != 0)}" ></i> </ng-template>
    </ngx-column-template>

    <ngx-column-template name="Type" parent="Numbers" collection="Type" index="1" [draggable]="false">
        <ng-template let-row="row" let-cell="cell" let-index="index" name="body" >{{row.Type[index]}}</ng-template>
        <ng-template let-cell="cell" let-direction="direction"  name="header">{{cell.name}} <i class="fa" *ngIf="direction!=null" [ngClass]="{'fa-arrow-up': (direction == 0), 'fa-arrow-down': (direction != 0)}" ></i> </ng-template>
    </ngx-column-template>

    <ngx-column-template name="Size" parent="Numbers" collection="Size" index="1" [draggable]="false">
            <ng-template let-row="row" let-cell="cell" let-index="index" name="body" >{{row.Size[index]}}</ng-template>
            <ng-template let-cell="cell" let-direction="direction"  name="header">{{cell.name}} <i class="fa" *ngIf="direction!=null" [ngClass]="{'fa-arrow-up': (direction == 0), 'fa-arrow-down': (direction != 0)}" ></i> </ng-template>
        </ngx-column-template>

    <ngx-column-template name="Name"  index="1" [draggable]="false">
        <ng-template let-row="row" let-cell="cell" name="body">{{row.Name}}</ng-template>
        <ng-template let-cell="cell" let-direction="direction"  name="header">{{cell.name}} <i class="fa" *ngIf="direction!=null" [ngClass]="{'fa-arrow-up': (direction == 0), 'fa-arrow-down': (direction != 0)}" ></i> </ng-template>
    </ngx-column-template>

</ngx-magic-table>
```
## Preview
![Preview](https://imgur.com/V5Sy0HN.jpg)

## Next up

- Detailed documentation will be ready soon

## Issues

[Github Issues](https://github.com/noushmac/ngx-magic-table/issues)

## Making a Contribution
Any contribution is welcomed

## License
[MIT](https://github.com/noushmac/ngx-magic-table/blob/master/LICENSE)
