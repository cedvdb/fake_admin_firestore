import { CollectionGroup } from 'firebase-admin/firestore';



export class UnimplementedCollectionGroup<T> implements CollectionGroup<T> {
  firestore: FirebaseFirestore.Firestore;

  getPartitions(desiredPartitionCount: number): AsyncIterable<FirebaseFirestore.QueryPartition<T>> {
    throw new Error('Method not implemented.');
  }
  withConverter<U>(converter: FirebaseFirestore.FirestoreDataConverter<U>): CollectionGroup<U>;
  withConverter(converter: null): CollectionGroup<FirebaseFirestore.DocumentData>;
  withConverter<U>(converter: unknown): CollectionGroup<FirebaseFirestore.DocumentData> | CollectionGroup<U> {
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
  isEqual(other: FirebaseFirestore.Query<T>): boolean {
    throw new Error('Method not implemented.');
  }

} 