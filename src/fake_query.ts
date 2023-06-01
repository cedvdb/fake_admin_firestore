import { Query } from 'firebase-admin/firestore';
import { UnimplementedQuery } from './base/unimplemented_query';
import { FakeFirestoreCollectionData, FakeFirestoreDocumentData } from './fake_firestore_data';
import { FakeQuerySnapshot } from './fake_query_snapshot';


export class FakeQuery<T> extends UnimplementedQuery<T> implements Query<T> {
  constructor(
    private _collectionData: FakeFirestoreCollectionData<T>,
  ) { super(); }


  override async get(): Promise<FirebaseFirestore.QuerySnapshot<T>> {
    return new FakeQuerySnapshot(this._collectionData);
  }

  override limit(limit: number): FirebaseFirestore.Query<T> {
    const limitedData = Object.keys(this._collectionData).slice(0, limit).reduce((acc, key) => {
      acc[key] = this._collectionData[key];
      return acc;
    }, {} as FakeFirestoreCollectionData<T>);
    return new FakeQuery(limitedData);
  }

  override orderBy(
    fieldPath: string | FirebaseFirestore.FieldPath,
    directionStr: FirebaseFirestore.OrderByDirection | undefined = 'asc'
  ): FirebaseFirestore.Query<T> {

    // js keys are ordered by insertion order as per ES6 specs
    // https://exploringjs.com/es6/ch_oop-besides-classes.html#_traversal-order-of-properties
    const unorderedCollectionData = this._collectionData;
    const orderedCollectionData = Object.keys(unorderedCollectionData).sort((id1, id2) => {
      const firstDocument = unorderedCollectionData[id1];
      const secondDocument = unorderedCollectionData[id2];
      const firstValue = this._accessValue(firstDocument, fieldPath as string);
      const secondValue = this._accessValue(secondDocument, fieldPath as string);
      if (directionStr == 'asc') {
        return firstValue > secondValue ? 1 : -1;
      }
      return firstValue < secondValue ? 1 : -1;
    }).reduce(
      (acc, key) => {
        acc[key] = unorderedCollectionData[key];
        return acc;
      },
      {} as FakeFirestoreCollectionData<T>
    );
    return new FakeQuery(orderedCollectionData);
  }

  override where(fieldPath: string | FirebaseFirestore.FieldPath, opStr: FirebaseFirestore.WhereFilterOp, value: any): Query<T>;
  override where(filter: FirebaseFirestore.Filter): Query<T>;
  override where(fieldPath: any, opStr?: FirebaseFirestore.WhereFilterOp, value?: any): Query<T> {
    if (!(typeof fieldPath === 'string')) {
      throw 'FieldPath unsupported';
    }
    switch (opStr) {
      // "<" | "<=" | "==" | "!=" | ">=" | ">" | "array-contains" | "in" | "not-in" | "array-contains-any"
      case '<':
        return new FakeQuery<T>(this._filterData(fieldPath, (dataValue) => dataValue < value)) as Query<T>;
      case '<=':
        return new FakeQuery<T>(this._filterData(fieldPath, (dataValue) => dataValue <= value)) as Query<T>;
      case '==':
        return new FakeQuery<T>(this._filterData(fieldPath, (dataValue) => dataValue == value)) as Query<T>;
      case '!=':
        return new FakeQuery<T>(this._filterData(fieldPath, (dataValue) => dataValue != value)) as Query<T>;
      case '>=':
        return new FakeQuery<T>(this._filterData(fieldPath, (dataValue) => dataValue >= value)) as Query<T>;
      case '>':
        return new FakeQuery<T>(this._filterData(fieldPath, (dataValue) => dataValue > value)) as Query<T>;
      case 'array-contains':
        return new FakeQuery<T>(this._filterData(fieldPath, (dataValue) => {
          if (!(dataValue instanceof Array))
            throw 'using array-contains on a non array';
          return dataValue.includes(value);
        },),) as Query<T>;
      case 'array-contains-any':
        if (!(value instanceof Array)) {
          throw 'using in with non array value';
        }
        return new FakeQuery<T>(this._filterData(fieldPath, (dataValue) => {
          if (dataValue instanceof Array)
            return dataValue.some(item => value.includes(item));
          throw 'using array-contains on a non array';
        },),) as Query<T>;
      case 'in': {
        if (!(value instanceof Array)) {
          throw 'using in with non array value';
        }
        return new FakeQuery<T>(this._filterData(fieldPath, (dataValue) => value.includes(dataValue),),) as Query<T>;
      }
      case 'not-in': {
        if (!(value instanceof Array)) {
          throw 'using not-in with non array value';
        }
        return new FakeQuery<T>(this._filterData(fieldPath, (dataValue) => !value.includes(dataValue),),) as Query<T>;
      }
    }
    throw new Error(`${opStr} not implemented.`);
  }

  private _filterData(fieldPath: string, comparator: (a: any) => boolean): FakeFirestoreCollectionData<T> {
    const data = Object.keys(this._collectionData)
      .reduce((acc, key) => {
        const documentData = this._collectionData[key];
        const dataValue = this._accessValue(documentData.data, fieldPath);
        if (comparator(dataValue)) {
          acc[key] = this._collectionData[key];
        }
        return acc;
      }, {} as Record<string, FakeFirestoreDocumentData<T>>);
    return data;
  }

  private _accessValue(object: any, fieldPath: string) {
    const parts = fieldPath.split('.');
    const value = parts.reduce((acc, part) => {
      return acc[part];
    }, object);
    if (value == undefined) {
      throw `field path ${fieldPath} not found`;
    }
    return value;
  }
}
