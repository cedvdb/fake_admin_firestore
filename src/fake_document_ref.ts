import mergeDeep from 'deepmerge';
import { DocumentData, DocumentReference, FirestoreDataConverter, SetOptions, WriteResult } from 'firebase-admin/firestore';
import { UnimplementedDocument as UnimplementedDocumentRef } from './base/unimplemented_document';
import { FakeFirestoreDocumentData } from './fake_firestore_data';
import { FakeDocumentSnapshot } from './fake_document_snapshot';

export class FakeDocumentRef<T> extends UnimplementedDocumentRef<T> implements DocumentReference<T> {


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
    return new FakeDocumentSnapshot(this._id, this._documentData.data, this);
  }

  override async set(data: any, options?: SetOptions): Promise<FirebaseFirestore.WriteResult> {
    if (options && ((options as any).merge || (options as any).mergeFields)) {
      const newData: T = mergeDeep(
        this._documentData.data,
        data,
      );
      this._documentData.data = newData;
    } else {
      const newData: T = {
        ...this._documentData.data,
        ...data,
      };
      this._documentData.data = newData;
    }
    this._onUpdate(this._id, this._documentData);
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


