import { Query } from 'firebase-admin/firestore';


export class UnimplementedQuery<T> implements Query<T> {
  get firestore(): FirebaseFirestore.Firestore {
    throw new Error('Method not implemented.');
  }
  where(fieldPath: string | FirebaseFirestore.FieldPath, opStr: FirebaseFirestore.WhereFilterOp, value: any): Query<T>;
  where(filter: FirebaseFirestore.Filter): Query<T>;
  where(fieldPath: unknown, opStr?: unknown, value?: unknown): Query<T> {
    throw new Error('Method not implemented.');
  }
  orderBy(fieldPath: string | FirebaseFirestore.FieldPath, directionStr?: FirebaseFirestore.OrderByDirection | undefined): Query<T> {
    throw new Error('Method not implemented.');
  }
  limit(limit: number): Query<T> {
    throw new Error('Method not implemented.');
  }
  limitToLast(limit: number): Query<T> {
    throw new Error('Method not implemented.');
  }
  offset(offset: number): Query<T> {
    throw new Error('Method not implemented.');
  }
  select(...field: (string | FirebaseFirestore.FieldPath)[]): Query<FirebaseFirestore.DocumentData> {
    throw new Error('Method not implemented.');
  }
  startAt(snapshot: FirebaseFirestore.DocumentSnapshot<any>): Query<T>;
  startAt(...fieldValues: any[]): Query<T>;
  startAt(snapshot?: unknown, ...rest: any): Query<T> {
    throw new Error('Method not implemented.');
  }
  startAfter(snapshot: FirebaseFirestore.DocumentSnapshot<any>): Query<T>;
  startAfter(...fieldValues: any[]): Query<T>;
  startAfter(snapshot?: unknown, ...rest: any): Query<T> {
    throw new Error('Method not implemented.');
  }
  endBefore(snapshot: FirebaseFirestore.DocumentSnapshot<any>): Query<T>;
  endBefore(...fieldValues: any[]): Query<T>;
  endBefore(snapshot?: unknown, ...rest: any): Query<T> {
    throw new Error('Method not implemented.');
  }
  endAt(snapshot: FirebaseFirestore.DocumentSnapshot<any>): Query<T>;
  endAt(...fieldValues: any[]): Query<T>;
  endAt(snapshot?: unknown, ...rest: any): Query<T> {
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
  isEqual(other: Query<T>): boolean {
    throw new Error('Method not implemented.');
  }
  withConverter<U>(converter: FirebaseFirestore.FirestoreDataConverter<U>): Query<U>;
  withConverter(converter: null): Query<FirebaseFirestore.DocumentData>;
  withConverter<U>(converter: unknown): Query<FirebaseFirestore.DocumentData> | Query<U> {
    throw new Error('Method not implemented.');
  }

}