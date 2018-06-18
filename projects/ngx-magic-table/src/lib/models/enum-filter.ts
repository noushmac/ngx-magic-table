

export namespace EnumFilter {

    export enum filters {
        equals = 'equals',
        notEquals = 'not equals',
    }
    export function values() {
      return Object.keys(filters).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
  }

