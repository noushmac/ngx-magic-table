

export namespace StringFilter {

    export enum filters {
        equals = 'equals',
        notEquals = 'not equals',
        startsWith = 'starts with',
        notStartsWith = 'not starts with',
        endsWith = 'ends with',
        notEndsWith = 'not ends with',
        contains = 'contains',
        notContains = 'not contains'
    
    }
    export function values() {
      return Object.keys(filters).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
  }

