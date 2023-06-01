import { DocumentReference, QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { UnimplementedQuerySnapshot } from './base/unimplemented_query_snapshot';
import { FakeQueryDocumentSnapshot } from './fake_document_snapshot';
import { FakeFirestoreCollectionData } from './fake_firestore_data';


export class FakeQuerySnapshot<T> extends UnimplementedQuerySnapshot<T> {
  constructor(
    private _filteredData: FakeFirestoreCollectionData,
    private _getDocumentRef: (id: string) => DocumentReference<T>,
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
      const docRef = this._getDocumentRef(id);
      docs.push(new FakeQueryDocumentSnapshot(docRef, value.data as T))
    }
    return docs;
  }

}

