export namespace NumericFilter {

    export enum filters {
        equals = 'equals',
        notEquals = 'not equals',
        greaterThan = 'greater than',
        notGreaterThan = 'not greater than',
        smallerThan = 'smaller than',
        notSmallerThan = 'not smaller than'

    }
    export function values() {
        return Object.keys(filters).filter(
        (type) => isNaN(<any>type) && type !== 'values'
        );
    }
}

