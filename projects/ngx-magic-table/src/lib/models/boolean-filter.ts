

export namespace BooleanFilter {

    export enum filters {
        equals = 'equals',
    }
    export function values() {
      return Object.keys(filters).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
  }

