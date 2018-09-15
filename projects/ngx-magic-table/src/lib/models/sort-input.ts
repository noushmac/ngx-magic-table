import { ISortInput } from './interface';
import {OrderDirection} from './enum';

export class SortInput implements ISortInput {
    sort: string;
    direction: OrderDirection;

}
