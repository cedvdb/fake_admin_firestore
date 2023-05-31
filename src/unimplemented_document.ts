import { DocumentReference, DocumentSnapshot } from 'firebase-admin/firestore';



export class UnimplementedDocument<T> implements DocumentReference<T> {
  get id(): string {
    throw new Error('Method not implemented.');
  }
  get parent(): FirebaseFirestore.CollectionReference<T> {
    throw new Error('Method not implemented.');
  }

  get path(): string {
    throw new Error('Method not implemented.');
  }

  get firestore(): FirebaseFirestore.Firestore {
    throw new Error('Method not implemented.');
  }

  collection(collectionPath: string): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    throw new Error('Method not implemented.');
  }
  listCollections(): Promise<FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>[]> {
    throw new Error('Method not implemented.');
  }
  create(data: FirebaseFirestore.WithFieldValue<T>): Promise<FirebaseFirestore.WriteResult> {
    throw new Error('Method not implemented.');
  }
  set(data: FirebaseFirestore.PartialWithFieldValue<T>, options: FirebaseFirestore.SetOptions): Promise<FirebaseFirestore.WriteResult>;
  set(data: FirebaseFirestore.WithFieldValue<T>): Promise<FirebaseFirestore.WriteResult>;
  set(data: unknown, options?: unknown): Promise<FirebaseFirestore.WriteResult> {
    throw new Error('Method not implemented.');
  }
  update(data: FirebaseFirestore.UpdateData<T>, precondition?: FirebaseFirestore.Precondition | undefined): Promise<FirebaseFirestore.WriteResult>;
  update(field: string | FirebaseFirestore.FieldPath, value: any, ...moreFieldsOrPrecondition: any[]): Promise<FirebaseFirestore.WriteResult>;
  update(data: unknown, precondition?: unknown, ...rest: any): Promise<FirebaseFirestore.WriteResult> {
    throw new Error('Method not implemented.');
  }
  delete(precondition?: FirebaseFirestore.Precondition | undefined): Promise<FirebaseFirestore.WriteResult> {
    throw new Error('Method not implemented.');
  }
  get(): Promise<FirebaseFirestore.DocumentSnapshot<T>> {
    throw new Error('Method not implemented.');
  }
  onSnapshot(onNext: (snapshot: FirebaseFirestore.DocumentSnapshot<T>) => void, onError?: ((error: Error) => void) | undefined): () => void {
    throw new Error('Method not implemented.');
  }
  isEqual(other: DocumentReference<T>): boolean {
    throw new Error('Method not implemented.');
  }
  withConverter<U>(converter: FirebaseFirestore.FirestoreDataConverter<U>): DocumentReference<U>;
  withConverter(converter: null): DocumentReference<FirebaseFirestore.DocumentData>;
  withConverter<U>(converter: unknown): DocumentReference<FirebaseFirestore.DocumentData> | DocumentReference<U> {
    throw new Error('Method not implemented.');
  }
}


export class UnimplementedDocumentSnapshot<T> implements DocumentSnapshot<T> {
  get exists(): boolean {
    throw new Error('Method not implemented.');
  }
  get ref(): DocumentReference<T> {
    throw new Error('Method not implemented.');
  }
  get id(): string {
    throw new Error('Method not implemented.');
  }
  get createTime(): FirebaseFirestore.Timestamp | undefined {
    throw new Error('Method not implemented.');
  }
  get updateTime(): FirebaseFirestore.Timestamp | undefined {
    throw new Error('Method not implemented.');
  }
  get readTime(): FirebaseFirestore.Timestamp {
    throw new Error('Method not implemented.');
  }
  data(): T | undefined {
    throw new Error('Method not implemented.');
  }
  get(fieldPath: string | FirebaseFirestore.FieldPath) {
    throw new Error('Method not implemented.');
  }
  isEqual(other: DocumentSnapshot<T>): boolean {
    throw new Error('Method not implemented.');
  }

}