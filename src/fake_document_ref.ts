import mergeDeep from 'deepmerge';
import { DocumentData, DocumentReference, DocumentSnapshot, FirestoreDataConverter, SetOptions, WriteResult } from 'firebase-admin/firestore';
import { UnimplementedDocument as UnimplementedDocumentRef } from './base/unimplemented_document';
import { FakeFirestoreDocumentData } from './fake_firestore_data';
import { FakeDocumentSnapshot } from './fake_document_snapshot';
import { FakeCollectionRef } from './fake_collection_ref';

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

  override collection(collectionPath: string): FirebaseFirestore.CollectionReference<DocumentData> {
    let subcollections = this._documentData.collections;
    if (subcollections == undefined) {
      subcollections = {};
      this._documentData.collections = subcollections;
    }
    if (subcollections[collectionPath] == undefined) {
      subcollections[collectionPath] = {};
    }
    return new FakeCollectionRef(subcollections[collectionPath]);
  }

  override async get(): Promise<DocumentSnapshot<T>> {
    return new FakeDocumentSnapshot(this, this._documentData.data);
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


