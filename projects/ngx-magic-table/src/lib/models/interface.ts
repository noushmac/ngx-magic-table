import SortDirection from './sort-direction';
export interface IPagingInput {
   page: Number;
   pageSize: Number;
}

export interface ISortInput {
   sort: String;
   direction: SortDirection;
}
