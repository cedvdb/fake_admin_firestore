import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { UnimplementedQuerySnapshot } from './base/unimplemented_query_snapshot';
import { FakeFirestoreCollectionData } from './fake_firestore_data';
import { FakeDocumentSnapshot } from './fake_document_snapshot';
import { FakeDocumentRef } from './fake_document_ref';


export class FakeQuerySnapshot<T> extends UnimplementedQuerySnapshot<T> {
  constructor(
    private _filteredData: FakeFirestoreCollectionData<T>,
  ) { super(); }

  override get size(): number {
    return Object.keys(this._filteredData).length;
  }

  override get empty(): boolean {
    return this.size == 0;
  }

  override get docs(): QueryDocumentSnapshot<T>[] {
    return Object.entries(this._filteredData).map(([id, value]) => new FakeDocumentRef<T>(id, value));
  }
}

