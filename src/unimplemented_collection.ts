import { CollectionReference } from 'firebase-admin/firestore';


export class UnimplementedCollection<T> implements CollectionReference<T> {
  get id(): string {
    throw new Error('Method not implemented.');
  }
  get parent(): FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> | null {
    throw new Error('Method not implemented.');
  }
  get path(): string {
    throw new Error('Method not implemented.');
  }

  get firestore(): FirebaseFirestore.Firestore {
    throw new Error('Method not implemented.');
  }

  listDocuments(): Promise<FirebaseFirestore.DocumentReference<T>[]> {
    throw new Error('Method not implemented.');
  }
  doc(): FirebaseFirestore.DocumentReference<T>;
  doc(documentPath: string): FirebaseFirestore.DocumentReference<T>;
  doc(documentPath?: unknown): FirebaseFirestore.DocumentReference<T> {
    throw new Error('Method not implemented.');
  }
  add(data: FirebaseFirestore.WithFieldValue<T>): Promise<FirebaseFirestore.DocumentReference<T>> {
    throw new Error('Method not implemented.');
  }
  isEqual(other: CollectionReference<T>): boolean {
    throw new Error('Method not implemented.');
  }
  withConverter<U>(converter: FirebaseFirestore.FirestoreDataConverter<U>): CollectionReference<U>;
  withConverter(converter: null): CollectionReference<FirebaseFirestore.DocumentData>;
  withConverter<U>(converter: unknown): CollectionReference<FirebaseFirestore.DocumentData> | CollectionReference<U> {
    throw new Error('Method not implemented.');
  }
  where(fieldPath: string | FirebaseFirestore.FieldPath, opStr: FirebaseFirestore.WhereFilterOp, value: any): FirebaseFirestore.Query<T>;
  where(filter: FirebaseFirestore.Filter): FirebaseFirestore.Query<T>;
  where(fieldPath: unknown, opStr?: unknown, value?: unknown): FirebaseFirestore.Query<T> {
    throw new Error('Method not implemented.');
  }
  orderBy(fieldPath: string | FirebaseFirestore.FieldPath, directionStr?: FirebaseFirestore.OrderByDirection | undefined): FirebaseFirestore.Query<T> {
    throw new Error('Method not implemented.');
  }
  limit(limit: number): FirebaseFirestore.Query<T> {
    throw new Error('Method not implemented.');
  }
  limitToLast(limit: number): FirebaseFirestore.Query<T> {
    throw new Error('Method not implemented.');
  }
  offset(offset: number): FirebaseFirestore.Query<T> {
    throw new Error('Method not implemented.');
  }
  select(...field: (string | FirebaseFirestore.FieldPath)[]): FirebaseFirestore.Query<FirebaseFirestore.DocumentData> {
    throw new Error('Method not implemented.');
  }
  startAt(snapshot: FirebaseFirestore.DocumentSnapshot<any>): FirebaseFirestore.Query<T>;
  startAt(...fieldValues: any[]): FirebaseFirestore.Query<T>;
  startAt(snapshot?: unknown, ...rest: any): FirebaseFirestore.Query<T> {
    throw new Error('Method not implemented.');
  }
  startAfter(snapshot: FirebaseFirestore.DocumentSnapshot<any>): FirebaseFirestore.Query<T>;
  startAfter(...fieldValues: any[]): FirebaseFirestore.Query<T>;
  startAfter(snapshot?: unknown, ...rest: any): FirebaseFirestore.Query<T> {
    throw new Error('Method not implemented.');
  }
  endBefore(snapshot: FirebaseFirestore.DocumentSnapshot<any>): FirebaseFirestore.Query<T>;
  endBefore(...fieldValues: any[]): FirebaseFirestore.Query<T>;
  endBefore(snapshot?: unknown, ...rest: any): FirebaseFirestore.Query<T> {
    throw new Error('Method not implemented.');
  }
  endAt(snapshot: FirebaseFirestore.DocumentSnapshot<any>): FirebaseFirestore.Query<T>;
  endAt(...fieldValues: any[]): FirebaseFirestore.Query<T>;
  endAt(snapshot?: unknown, ...rest: any): FirebaseFirestore.Query<T> {
    throw new Error('Method not implemented.');
  }
  get(): Promise<FirebaseFirestore.QuerySnapshot<T>> {
    throw new Error('Method not implemented.');
  }
  stream(): NodeJS.ReadableStream {
    throw new Error('Method not implemented.');
  }
  onSnapshot(onNext: (snapshot: FirebaseFirestore.QuerySnapshot<T>) => void, onError?: ((error: Error) => void) | undefined): () => void {
    throw new Error('Method not implemented.');
  }
  count(): FirebaseFirestore.AggregateQuery<{ count: FirebaseFirestore.AggregateField<number>; }> {
    throw new Error('Method not implemented.');
  }

}