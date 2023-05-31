import mergeDeep from 'deepmerge';
import { CollectionGroup, CollectionReference, DocumentData, DocumentReference, DocumentSnapshot, Firestore, FirestoreDataConverter, Query, QueryDocumentSnapshot, SetOptions, WriteResult } from 'firebase-admin/firestore';
import { FakeFirestoreCollectionData, FakeFirestoreCollectionGroupData, FakeFirestoreDocumentData } from './fake_firestore_data';
import { UnimplementedCollection } from './base/unimplemented_collection';
import { UnimplementedDocument as UnimplementedDocumentRef, UnimplementedDocumentSnapshot } from './base/unimplemented_document';
import { UnimplementedFirestore } from './base/unimplemented_firestore';
import { UnimplementedQuery } from './base/unimplemented_query';
import { UnimplementedCollectionGroup } from './base/unimplemented_collection_group';
import { UnimplementedQuerySnapshot } from './base/unimplemented_query_snapshot';
import { randomUUID } from 'crypto';

export class FakeFirestore extends UnimplementedFirestore implements Firestore {
  private _data: FakeFirestoreCollectionGroupData;

  constructor(data: FakeFirestoreCollectionGroupData) {
    super();
    this._data = JSON.parse(JSON.stringify(data)); // copy
  }

  override collection(collectionPath: string): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return new FakeCollectionRef(this._data[collectionPath]);
  }

  override collectionGroup(collectionId: string): FirebaseFirestore.CollectionGroup<FirebaseFirestore.DocumentData> {
    // find level collections
    const foundCollectionGroupData = this._walkCollectionTree(collectionId, this._data);
    const fakeCollection = new FakeCollectionRef<FirebaseFirestore.DocumentData>(foundCollectionGroupData);
    return new FakeCollectionGroup<FirebaseFirestore.DocumentData>(fakeCollection);
  }

  private _walkCollectionTree(collectionId: string, currentLevelCollections: FakeFirestoreCollectionGroupData): FakeFirestoreCollectionData {
    const foundData: FakeFirestoreCollectionData = {};
    // for each key in the collection group level ...
    Object.keys(currentLevelCollections).forEach(key => {
      const collection = currentLevelCollections[key];
      // add the collection data if it matches the id
      if (key == collectionId) {
        Object.keys(collection).forEach(key => foundData[key] = collection[key]);
      }
      const documents = Object.values(collection);
      documents.forEach((doc) => {
        const subcollections = this._walkCollectionTree(collectionId, doc.collections || {});
        if (Object.keys(subcollections).length > 0) {
          Object.keys(subcollections).forEach(key => foundData[key] = subcollections[key]);
        }
      });
    });
    return foundData;
  }
}

class FakeCollectionRef<T> extends UnimplementedCollection<T> implements CollectionReference<T> {

  constructor(
    private _collectionData: FakeFirestoreCollectionData<T>,
  ) {
    super();
  }

  override doc(id?: any): FirebaseFirestore.DocumentReference<T> {
    const data = this._collectionData[id];
    return new FakeDocumentRef<T>(
      id,
      data,
      (id, data) => this._onCreate(id, data),
      (id, data) => this._onUpdate(id, data),
      (id, _) => this._onDelete(id)
    );
  }

  override async get(): Promise<FirebaseFirestore.QuerySnapshot<T>> {
    return new FakeQuerySnapshot(this._collectionData);
  }

  override async add(data: FirebaseFirestore.WithFieldValue<T>): Promise<DocumentReference<T>> {
    const id = randomUUID();
    this._collectionData = { ...this._collectionData, [id]: { data: data as T } };
    return this.doc(id);
  }

  override withConverter<U>(converter: FirebaseFirestore.FirestoreDataConverter<U>): CollectionReference<U>;
  override withConverter(converter: null): CollectionReference<FirebaseFirestore.DocumentData>;
  override withConverter<U>(converter: unknown): CollectionReference<FirebaseFirestore.DocumentData> | CollectionReference<U> {
    return this as unknown as CollectionReference<U>;
  }

  private _onCreate(id: string, documentData: FakeFirestoreDocumentData<T>) {
    this._collectionData = { ...this._collectionData, [id]: documentData };
  }

  private _onUpdate(id: string, documentData: FakeFirestoreDocumentData<T>) {
    this._collectionData = { ...this._collectionData, [id]: documentData };
  }

  private _onDelete(id: string) {
    const data = { ...this._collectionData };
    delete data[id];
    this._collectionData = data;
  }

  override where(fieldPath: string | FirebaseFirestore.FieldPath, opStr: FirebaseFirestore.WhereFilterOp, value: any): Query<T>;
  override where(filter: FirebaseFirestore.Filter): Query<T>;
  override where(fieldPath: string | FirebaseFirestore.FieldPath, opStr?: FirebaseFirestore.WhereFilterOp, value?: any): Query<T> {
    return new FakeQuery(this._collectionData).where(fieldPath, opStr || '==', value);
  }
}

class FakeCollectionGroup<T> extends UnimplementedCollectionGroup<T> implements CollectionGroup<T> {
  constructor(private _collection: FakeCollectionRef<T>) { super(); }

  get(): Promise<FirebaseFirestore.QuerySnapshot<T>> {
    return this._collection.get();
  }

  override where(fieldPath: string | FirebaseFirestore.FieldPath, opStr: FirebaseFirestore.WhereFilterOp, value: any): Query<T>;
  override where(filter: FirebaseFirestore.Filter): Query<T>;
  override where(fieldPath: string | FirebaseFirestore.FieldPath, opStr?: FirebaseFirestore.WhereFilterOp, value?: any): Query<T> {
    return this._collection.where(fieldPath, opStr || '==', value);
  }
}


class FakeDocumentRef<T> extends UnimplementedDocumentRef<T> implements DocumentReference<T> {


  constructor(
    private _id: string,
    private _documentData: FakeFirestoreDocumentData<T>,
    private _onCreate: (id: string, data: FakeFirestoreDocumentData<T>) => void,
    private _onUpdate: (id: string, data: FakeFirestoreDocumentData<T>) => void,
    private _onDelete: (id: string, data: FakeFirestoreDocumentData<T>) => void,
  ) {
    super();
  }

  override get id() {
    return this._id;
  }

  override async get() {
    return new FakeDocumentSnapshot(this._id, this._documentData.data);
  }

  override async set(data: any, options?: SetOptions): Promise<FirebaseFirestore.WriteResult> {
    if (options && ((options as any).merge || (options as any).mergeFields)) {
      this._documentData.data = mergeDeep(
        this._documentData.data,
        data,
      );
    } else {
      this._documentData.data = {
        ...this._documentData.data,
        ...data,
      };
    }
    return {} as unknown as FirebaseFirestore.WriteResult;
  }

  override async create(data: T): Promise<WriteResult> {
    this._onCreate(this._id, this._documentData);
    return {} as unknown as FirebaseFirestore.WriteResult;
  }

  override async delete(precondition?: FirebaseFirestore.Precondition | undefined): Promise<WriteResult> {
    this._onDelete(this._id, this._documentData);
    return {} as unknown as FirebaseFirestore.WriteResult;
  }

  override withConverter<U>(converter: FirestoreDataConverter<U>): DocumentReference<U>;
  override withConverter(converter: null): DocumentReference<DocumentData>;
  override withConverter<U>(converter: unknown): DocumentReference<DocumentData> | DocumentReference<U> {
    return this as unknown as DocumentReference<U>;
  }
}

class FakeDocumentSnapshot<T> extends UnimplementedDocumentSnapshot<T> implements QueryDocumentSnapshot<T> {
  constructor(
    private _id: string,
    private _data: T,
  ) { super(); }

  override get id(): string {
    return this._id;
  }

  override data(): T {
    return this._data as T;
  }

  override get exists(): boolean {
    return this._data != undefined;
  }

}

export class FakeQueryDocumentSnapshot<T> extends FakeDocumentSnapshot<T> implements QueryDocumentSnapshot<T> {
  data(): T {
    return super.data() as T;
  }
}

class FakeQuerySnapshot<T> extends UnimplementedQuerySnapshot<T> {
  constructor(
    private _collectionData: FakeFirestoreCollectionData<T>,
  ) { super(); }

  override get size(): number {
    return Object.keys(this._collectionData).length;
  }

  override get empty(): boolean {
    return this.size == 0;
  }

  override get docs(): QueryDocumentSnapshot<T>[] {
    return Object.entries(this._collectionData).map(([id, value]) => new FakeDocumentSnapshot<T>(id, value.data));
  }
}

class FakeQuery<T> extends UnimplementedQuery<T> implements Query<T> {
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
