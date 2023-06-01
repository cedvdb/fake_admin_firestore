import { randomUUID } from 'crypto';
import { CollectionReference, DocumentReference, Query } from 'firebase-admin/firestore';
import { UnimplementedCollection } from './base/unimplemented_collection';
import { FakeDocumentRef } from './fake_document_ref';
import { FakeFirestoreCollectionData, FakeFirestoreDocumentData } from './fake_firestore_data';
import { FakeQuerySnapshot } from './fake_query_snapshot';
import { FakeQuery } from './fake_query';

export class FakeCollectionRef<T> extends UnimplementedCollection<T> implements CollectionReference<T> {

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
    return new FakeQuerySnapshot(
      Object.keys(this._collectionData),
      (id) => this.doc(id),
    );
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
    this._collectionData[id] = documentData;
  }

  private _onUpdate(id: string, documentData: FakeFirestoreDocumentData<T>) {
    // nothing to do
  }

  private _onDelete(id: string) {
    delete this._collectionData[id];
    console.log(Object.keys(this._collectionData));
  }

  override where(fieldPath: string | FirebaseFirestore.FieldPath, opStr: FirebaseFirestore.WhereFilterOp, value: any): Query<T>;
  override where(filter: FirebaseFirestore.Filter): Query<T>;
  override where(fieldPath: string | FirebaseFirestore.FieldPath, opStr?: FirebaseFirestore.WhereFilterOp, value?: any): Query<T> {
    return new FakeQuery(this._collectionData).where(fieldPath, opStr || '==', value);
  }
}