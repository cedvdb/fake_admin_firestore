import { QuerySnapshot } from 'firebase-admin/firestore';


export class UnimplementedQuerySnapshot<T> implements QuerySnapshot<T> {
  get query(): FirebaseFirestore.Query<T> {
    throw new Error('Method not implemented.');
  }
  get docs(): FirebaseFirestore.QueryDocumentSnapshot<T>[] {
    throw new Error('Method not implemented.');
  }
  get size(): number {
    throw new Error('Method not implemented.');
  }
  get empty(): boolean {
    throw new Error('Method not implemented.');
  }
  get readTime(): FirebaseFirestore.Timestamp {
    throw new Error('Method not implemented.');
  }
  docChanges(): FirebaseFirestore.DocumentChange<T>[] {
    throw new Error('Method not implemented.');
  }
  forEach(callback: (result: FirebaseFirestore.QueryDocumentSnapshot<T>) => void, thisArg?: any): void {
    throw new Error('Method not implemented.');
  }
  isEqual(other: QuerySnapshot<T>): boolean {
    throw new Error('Method not implemented.');
  }

}