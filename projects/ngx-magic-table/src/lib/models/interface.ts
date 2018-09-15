import {OrderDirection} from './enum';
export interface IPagingInput {
   page: number;
   pageSize: number;
}

export interface ISortInput {
   sort: string;
   direction: OrderDirection;
}
