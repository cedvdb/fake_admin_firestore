import { DocumentReference, QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { UnimplementedQuerySnapshot } from './base/unimplemented_query_snapshot';
import { FakeQueryDocumentSnapshot } from './fake_document_snapshot';
import { FakeFirestoreCollectionData, FakeFirestoreDocumentData } from './fake_firestore_data';
import { FakeDocumentRef } from './fake_document_ref';


export class FakeQuerySnapshot<T> extends UnimplementedQuerySnapshot<T> {
  constructor(
    private _filteredData: FakeFirestoreCollectionData<T>,
    private _onCreate: (id: string, data: FakeFirestoreDocumentData<T>) => void,
    private _onUpdate: (id: string, data: FakeFirestoreDocumentData<T>) => void,
    private _onDelete: (id: string, data: FakeFirestoreDocumentData<T>) => void,
  ) { super(); }

  override get size(): number {
    return Object.keys(this._filteredData).length;
  }

  override get empty(): boolean {
    return this.size == 0;
  }

  override get docs(): QueryDocumentSnapshot<T>[] {
    const docs = [];
    for (let [id, value] of Object.entries(this._filteredData)) {
      const docRef = new FakeDocumentRef(id, value, this._onCreate, this._onUpdate, this._onDelete);
      docs.push(new FakeQueryDocumentSnapshot(docRef, value.data as T))
    }
    return docs;
  }

}

