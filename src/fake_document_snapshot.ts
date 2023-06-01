import { DocumentReference, QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { UnimplementedDocumentSnapshot } from './base/unimplemented_document';


export class FakeDocumentSnapshot<T> extends UnimplementedDocumentSnapshot<T> implements QueryDocumentSnapshot<T> {
  constructor(
    private _ref: DocumentReference<T>,
    private _data: T,
  ) { super(); }

  override get id(): string {
    return this._ref.id;
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
