import { Pipe, PipeTransform } from '@angular/core';
import { ListItemDropdown } from '../models/multiselect.model';


@Pipe({
    name: 'ng2ListFilter',
    pure: false
})
export class ListFilterPipe implements PipeTransform {
    transform(items: ListItemDropdown[], filter: ListItemDropdown): ListItemDropdown[] {
        if (!items || !filter) {
            return items;
        }
        return items.filter((item: ListItemDropdown) => this.applyFilter(item, filter));
    }

    applyFilter(item: ListItemDropdown, filter: ListItemDropdown): boolean {
        return !(filter.text && item.text && item.text.toLowerCase().indexOf(filter.text.toLowerCase()) === -1);
    }
}