import { Transaction } from 'firebase-admin/firestore';


export class UnimplementedTransaction implements Transaction {
  get<T>(query: FirebaseFirestore.Query<T>): Promise<FirebaseFirestore.QuerySnapshot<T>>;
  get<T>(documentRef: FirebaseFirestore.DocumentReference<T>): Promise<FirebaseFirestore.DocumentSnapshot<T>>;
  get<T extends FirebaseFirestore.AggregateSpec>(aggregateQuery: FirebaseFirestore.AggregateQuery<T>): Promise<FirebaseFirestore.AggregateQuerySnapshot<T>>;
  get<T extends FirebaseFirestore.AggregateSpec>(aggregateQuery: unknown): Promise<FirebaseFirestore.QuerySnapshot<T>> | Promise<FirebaseFirestore.DocumentSnapshot<T>> | Promise<FirebaseFirestore.AggregateQuerySnapshot<T>> {
    throw new Error('Method not implemented.');
  }
  getAll<T>(...documentRefsOrReadOptions: (FirebaseFirestore.ReadOptions | FirebaseFirestore.DocumentReference<T>)[]): Promise<FirebaseFirestore.DocumentSnapshot<T>[]> {
    throw new Error('Method not implemented.');
  }
  create<T>(documentRef: FirebaseFirestore.DocumentReference<T>, data: FirebaseFirestore.WithFieldValue<T>): Transaction {
    throw new Error('Method not implemented.');
  }
  set<T>(documentRef: FirebaseFirestore.DocumentReference<T>, data: FirebaseFirestore.PartialWithFieldValue<T>, options: FirebaseFirestore.SetOptions): Transaction;
  set<T>(documentRef: FirebaseFirestore.DocumentReference<T>, data: FirebaseFirestore.WithFieldValue<T>): Transaction;
  set(documentRef: unknown, data: unknown, options?: unknown): Transaction {
    throw new Error('Method not implemented.');
  }
  update<T>(documentRef: FirebaseFirestore.DocumentReference<T>, data: FirebaseFirestore.UpdateData<T>, precondition?: FirebaseFirestore.Precondition | undefined): Transaction;
  update(documentRef: FirebaseFirestore.DocumentReference<any>, field: string | FirebaseFirestore.FieldPath, value: any, ...fieldsOrPrecondition: any[]): Transaction;
  update(documentRef: unknown, data: unknown, precondition?: unknown, ...rest: any): Transaction {
    throw new Error('Method not implemented.');
  }
  delete(documentRef: FirebaseFirestore.DocumentReference<any>, precondition?: FirebaseFirestore.Precondition | undefined): Transaction {
    throw new Error('Method not implemented.');
  }

}