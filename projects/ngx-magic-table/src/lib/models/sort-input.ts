import { ISortInput } from './interface';
import SortDirection from './sort-direction';

export class SortInput implements ISortInput {
   sort: string;
   direction: SortDirection;
}
