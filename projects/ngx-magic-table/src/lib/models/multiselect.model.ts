export class ListItemDropdown {
    id: String;
    text: String;
    parent: String;
    public constructor(source: any) {
      if (typeof source === 'string') {
        this.id = this.text = source;
        this.parent='';
      }
      if (typeof source === 'object') {
        this.id = source.id;
        this.text = source.text;
        this.parent=source.parent;
      }
    }
  }

  export interface IDropdownSettings {
    singleSelection?: boolean;
    idField?: string;
    textField?: string;
    parentField?: string;
    enableCheckAll?: boolean;
    selectAllText?: string;
    unSelectAllText?: string;
    allowSearchFilter?: boolean;
    clearSearchFilter?: boolean;
    maxHeight?: number;
    itemsShowLimit?: number;
    limitSelection?: number;
    searchPlaceholderText?: string;
    noDataAvailablePlaceholderText?: string;
    closeDropDownOnSelection?: boolean;
    showSelectedItemsAtTop?: boolean;
  }