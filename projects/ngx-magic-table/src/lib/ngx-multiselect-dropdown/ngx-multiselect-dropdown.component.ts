import {
  Component, OnInit, HostListener, Input, Output, EventEmitter,
  forwardRef, ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';
import { ListItemDropdown, IDropdownSettings } from '../models/multiselect.model';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const DROPDOWN_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgxMultiselectDropdownComponent),
  multi: true
};
const noop = () => { };

@Component({
  selector: 'lib-ngx-multiselect-dropdown',
  templateUrl: './ngx-multiselect-dropdown.component.html',
  styleUrls: ['./ngx-multiselect-dropdown.component.scss'],
  providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxMultiselectDropdownComponent implements ControlValueAccessor {

  _data: Array<ListItemDropdown> = [];
  selectedItems: Array<ListItemDropdown> = [];
  isDropdownOpen = false;
  _settings: IDropdownSettings;
  _placeholder = 'Select';
  filter: ListItemDropdown = new ListItemDropdown(this.data);

  defaultSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'text',
    parentField: 'parent',
    enableCheckAll: true,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: false,
    limitSelection: -1,
    clearSearchFilter: true,
    maxHeight: 197,
    itemsShowLimit: 999999999999,
    searchPlaceholderText: 'Search',
    noDataAvailablePlaceholderText: 'No data available',
    closeDropDownOnSelection: false,
    showSelectedItemsAtTop: false
  };

  @Output('onFilterChange') onFilterChange: EventEmitter<ListItemDropdown> = new EventEmitter<any>();
  @Output('onSelect') onSelect: EventEmitter<Array<ListItemDropdown>> = new EventEmitter<Array<any>>();
  @Output('onDeSelect') onDeSelect: EventEmitter<Array<ListItemDropdown>> = new EventEmitter<Array<any>>();
  @Output('onSelectAll') onSelectAll: EventEmitter<Array<ListItemDropdown>> = new EventEmitter<Array<any>>();
  @Output('onDeSelectAll') onDeSelectAll: EventEmitter<Array<ListItemDropdown>> = new EventEmitter<Array<any>>();
  // @Output('onResetTable') onResetTable: EventEmitter<Array<ListItemDropdown>> = new EventEmitter<Array<any>>();

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Input() buttonListColumnStyle: string;
  @Input() disabled = false;
  @Input()
  public set placeholder(value: string) {
    if (value) {
      this._placeholder = value;
    } else {
      this._placeholder = 'Select';
    }
  }
  @Input()
  public set settings(value: IDropdownSettings) {
    if (value) {
      this._settings = Object.assign(this.defaultSettings, value);
    } else {
      this._settings = Object.assign(this.defaultSettings);
    }
  }

  @Input()
  public set data(value: Array<any>) {
    if (!value) {
      this._data = [];
    } else {
      // const _items = value.filter((item: any) => {
      //   if (typeof item === 'string' || (typeof item === 'object' && item && item[this._settings.idField] && item[this._settings.textField])) {
      //     return item;
      //   }
      // });
      this._data = value.map(
        (item: any) =>
          typeof item === 'string'
            ? new ListItemDropdown(item)
            : new ListItemDropdown({
              id: item[this._settings.idField],
              text: item[this._settings.textField],
              parent: item[this._settings.parentField]
            })
      );
    }
  }



  writeValue(obj: any): void {
    if (obj !== undefined && obj !== null && obj.length > 0) {
      if (this._settings.singleSelection) {
        try {
          if (obj.length >= 1) {
            const firstItem = obj[0];
            this.selectedItems = [
              typeof firstItem === 'string'
                ? new ListItemDropdown(firstItem)
                : new ListItemDropdown({
                  id: firstItem[this._settings.idField],
                  text: firstItem[this._settings.textField],
                  parent: firstItem[this._settings.parentField]
                })
            ];
          }
        } catch (e) {
          // console.error(e.body.msg);
        }
      } else {
        const _data = obj.map(
          (item: any) =>
            typeof item === 'string'
              ? new ListItemDropdown(item)
              : new ListItemDropdown({
                id: item[this._settings.idField],
                text: item[this._settings.textField],
                parent: item[this._settings.parentField]
              })
        );
        if (this._settings.limitSelection > 0) {
          this.selectedItems = _data.splice(0, this._settings.limitSelection);
        } else {
          this.selectedItems = _data;
        }
      }
    } else {
      this.selectedItems = [];
    }
    this.onChangeCallback(obj);
  }
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error("Method not implemented.");
  // }




  constructor(private cdr: ChangeDetectorRef) {
    this.buttonListColumnStyle = "btn btn-outline-info";
  }

  showButton(): boolean {
    if (!this._settings.singleSelection) {
      if (this._settings.limitSelection > 0) {
        return false;
      }
      // this._settings.enableCheckAll = this._settings.limitSelection === -1 ? true : false;
      return true; // !this._settings.singleSelection && this._settings.enableCheckAll && this._data.length > 0;
    } else {
      // should be disabled in single selection mode
      return false;
    }
  }

  itemShowRemaining(): number {
    return this.selectedItems.length - this._settings.itemsShowLimit;
  }

  trackByFn(index, item) {
    return item.id;
  }
  // Set touched on blur
  @HostListener('blur')
  public onTouched() {
    this.closeDropdown();
    this.onTouchedCallback();
  }

  closeDropdown() {
    this.isDropdownOpen = false;
    // clear search text
    if (this._settings.clearSearchFilter) {
      this.filter.text = '';
    }
  }
  toggleDropdown(evt) {
    evt.preventDefault();
    if (this.disabled && this._settings.singleSelection) {
      return;
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleSelectAll() {
    if (this.disabled) {
      return false;
    }
    if (!this.isAllItemsSelected()) {
      this.selectedItems = this._data.slice();
      this.onSelectAll.emit(this.emittedValue(this.selectedItems));
    } else {
      // this.selectedItems = [];
      // this.onDeSelectAll.emit(this.emittedValue(this.selectedItems));
    }
    this.onChangeCallback(this.emittedValue(this.selectedItems));
  }

  // resetTable() {
  //   this.onResetTable.emit(this.emittedValue(true));
  // }

  isAllItemsSelected(): boolean {
    return this._data.length === this.selectedItems.length;
  }


  emittedValue(val: any): any {
    const selected = [];
    if (Array.isArray(val)) {
      val.map(item => {
        if (item.id === item.text) {
          selected.push(item.text);
        } else {
          selected.push(this.objectify(item));
        }
      });
    } else {
      if (val) {
        if (val.id === val.text) {
          return val.text;
        } else {
          return this.objectify(val);
        }
      }
    }
    return selected;
  }

  objectify(val: ListItemDropdown) {
    const obj = {};
    obj[this._settings.idField] = val.id;
    obj[this._settings.textField] = val.text;
    obj[this._settings.parentField] = val.parent;
    return obj;
  }

  isLimitSelectionReached(): boolean {
    return this._settings.limitSelection === this.selectedItems.length;
  }
  onFilterTextChange($event) {
    this.onFilterChange.emit($event);
  }

  onItemClick($event: any, item: ListItemDropdown) {
    if (this.disabled) {
      return false;
    }
    const found = this.isSelected(item);
    const allowAdd = this._settings.limitSelection === -1 || (this._settings.limitSelection > 0 && this.selectedItems.length < this._settings.limitSelection);
    if (!found) {
      if (allowAdd) {
        this.addSelected(item);
      }
    } else {
      this.removeSelected(item);
    }
    if (this._settings.singleSelection && this._settings.closeDropDownOnSelection) {
      this.closeDropdown();
    }
  }

  addSelected(item: ListItemDropdown) {
    if (this._settings.singleSelection) {
      this.selectedItems = [];
      this.selectedItems.push(item);
    } else {
      var parentItem = this._data.filter(x => x.text === item.parent);
      var parentItemseleted = this.selectedItems.filter(x => x.text === item.parent);
      if (parentItem.length > 0 && parentItemseleted.length <= 0) {
        this.selectedItems.push(parentItem[0]);
      }

      var childItem = this._data.filter(x => x.parent === item.text);
      var childItemseleted = this.selectedItems.filter(x => x.parent === item.text);
      if (childItem.length > 0 && childItemseleted.length <= 0) {
        this.selectedItems.push(childItem[0]);
      }

      this.selectedItems.push(item);
    }
    this.onChangeCallback(this.emittedValue(this.selectedItems));
    this.onSelect.emit(this.emittedValue(this.selectedItems));
  }

  removeSelected(itemSel: ListItemDropdown) {
    if (this.selectedItems.length > 1) {
      this.selectedItems.forEach(item => {
        if (itemSel.id === item.id) {
          if (this.selectedItems.filter(x => x.parent === item.parent).length > 1) {
            this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
            var childs = this.selectedItems.filter(x => x.parent === item.text);
            for (let index = 0; index < childs.length; index++) {
              const element = childs[index];
              if (this.selectedItems.indexOf(element) !== -1 && this.selectedItems.length > 1) {
                this.selectedItems.splice(this.selectedItems.indexOf(element), 1);
              }
            }
          }

        }
      });
    }

    // let deSelectedItems = Array<ListItemDropdown>();
    // for (let i = 0; i < this._data.length; i++) {
    //  if(this.selectedItems.indexOf(this._data[i]) === -1)
    //  {
    //   deSelectedItems.push(this._data[i]);
    //  }

    // }

    this.onChangeCallback(this.emittedValue(this.selectedItems));
    this.onDeSelect.emit(this.emittedValue(this.selectedItems));
  }

  isSelected(clickedItem: ListItemDropdown) {
    let found = false;
    this.selectedItems.forEach(item => {
      if (clickedItem.id === item.id) {
        found = true;
      }
    });
    return found;
  }



}
