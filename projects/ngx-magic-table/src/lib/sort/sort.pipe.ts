import { Pipe, PipeTransform } from '@angular/core';
import { OrderDirection } from '../models/enum';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(rows: any[], args: any): any[] {
    const field = args.field;
    const active = args.active || true;
    const direction = args.direction;
    if (rows === undefined) {
      rows = [];
    }
    if (active) {
      if (direction === OrderDirection.Ascending) {
        rows.sort((a: any, b: any) => {
          if (a[field] < b[field]) {
            return -1;
          } else if (a[field] > b[field]) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        rows.sort((a: any, b: any) => {
          if (a[field] > b[field]) {
            return -1;
          } else if (a[field] < b[field]) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    }
    return rows;
  }

}
