import { CollectionGroup, Query } from 'firebase-admin/firestore';
import { UnimplementedCollectionGroup } from './base/unimplemented_collection_group';
import { FakeCollectionRef } from './fake_collection_ref';

export class FakeCollectionGroup<T> extends UnimplementedCollectionGroup<T> implements CollectionGroup<T> {
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

