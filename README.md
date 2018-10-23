# Magic Table

[![Build Status](https://api.travis-ci.org/noushmac/ngx-magic-table.svg?branch=master)](https://travis-ci.org/noushmac/ngx-magic-table)
[![Maintainability](https://api.codeclimate.com/v1/badges/9bdb33820bfdaa028c78/maintainability)](https://codeclimate.com/github/noushmac/ngx-magic-table/maintainability)
[![npm version](https://img.shields.io/npm/v/ngx-magic-table.svg)](https://img.shields.io/npm/v/ngx-magic-table.svg)
[![npm total downloads](https://img.shields.io/npm/dt/ngx-magic-table.svg)](https://img.shields.io/npm/dt/ngx-magic-table.svg)
[![npm monthly downloads](https://img.shields.io/npm/dm/ngx-magic-table.svg)](https://img.shields.io/npm/dm/ngx-magic-table.svg)


Angular 6 smart DataGrid based on `bootstrap` and `font-awesome`

## Features
- Server-side or client-side sorting
- Server-side or client-side pagination
- Arrange columns placement by dragging columns
- Headers custom templates
- Cells custom templates
- Grouping headers
- Grouping rows
- Filtering rows (under development)
- Custom Styling
- Resize column
- Visible column
- List columns
- Save table style
- Load table style
- Auto Size table

## Preview
![Preview](https://imgur.com/V5Sy0HN.jpg)

## Demo

Try the [Demo](https://noushmac.github.io/ngx-magic-table/)


## Getting started
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

  [isRTL]="false" 
  [rows]="data" 
  [customSort]="false" 
  sort="Phone" 

  [paginated]="true"
  [pageSize]="3" 
  [customPaginate]="false" 
  [currentPage]="2" 
  [pageSizes]="[3, 5, 20, 50, 100]" 
  (pageSizesChange)="pageSizesChange($event)"
  (pageChange)="pageChange($event)" 
  tcellClass="text-center" 
  trowClass="table-primary" 
  (selectedChange)="selectChanged($event)"
  selectedClass="table-secondary" 

  (columnsArrangeChange)="columnsArrangeChange($event)"
  [loadTable]="table" 
  (saveTable)="saveTable($event)"
  buttonListColumnStyle="btn btn-outline-info" 
  buttonSaveTableStyle="btn btn-outline-info"
  [autoSize] = "true">
 


  </ngx-magic-table>


```

## Next up

- Detailed documentation will be ready soon

## Issues

[Github Issues](https://github.com/noushmac/ngx-magic-table/issues)

## Contribution
Contribution is welcomed warmly ( specially in writing documentation)

## License
[MIT](https://github.com/noushmac/ngx-magic-table/blob/master/LICENSE)
