import SortDirection from './sort-direction';
export interface IPagingInput {
   page: number;
   pageSize: number;
}

export interface ISortInput {
   sort: string;
   direction: SortDirection;
}
