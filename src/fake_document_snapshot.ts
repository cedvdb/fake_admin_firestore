import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { UnimplementedDocumentSnapshot } from './base/unimplemented_document';
import { FakeDocumentRef } from './fake_document_ref';


export class FakeDocumentSnapshot<T> extends UnimplementedDocumentSnapshot<T> implements QueryDocumentSnapshot<T> {
  constructor(
    private _id: string,
    private _data: T,
    private _ref: FakeDocumentRef<T>,
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

  override get ref(): FirebaseFirestore.DocumentReference<T> {
    return this._ref;
  }

}

export class FakeQueryDocumentSnapshot<T> extends FakeDocumentSnapshot<T> implements QueryDocumentSnapshot<T> {
  data(): T {
    return super.data() as T;
  }
}
