import { UnimplementedTransaction } from './base/unimplemented_transaction';


export class FakeTransaction extends UnimplementedTransaction {


  override create<T>(documentRef: FirebaseFirestore.DocumentReference<T>, data: FirebaseFirestore.WithFieldValue<T>): FirebaseFirestore.Transaction {
    documentRef.create(data);
    return this;
  }

  override delete(documentRef: FirebaseFirestore.DocumentReference<any>, precondition?: FirebaseFirestore.Precondition | undefined): FirebaseFirestore.Transaction {
    documentRef.delete();
    return this;
  }

  override get<T>(query: FirebaseFirestore.Query<T>): Promise<FirebaseFirestore.QuerySnapshot<T>>;
  override get<T>(documentRef: FirebaseFirestore.DocumentReference<T>): Promise<FirebaseFirestore.DocumentSnapshot<T>>;
  override get<T extends FirebaseFirestore.AggregateSpec>(aggregateQuery: FirebaseFirestore.AggregateQuery<T>): Promise<FirebaseFirestore.AggregateQuerySnapshot<T>>;
  override get<T extends FirebaseFirestore.AggregateSpec>(documentRef: any): Promise<FirebaseFirestore.QuerySnapshot<T>> | Promise<FirebaseFirestore.DocumentSnapshot<T>> | Promise<FirebaseFirestore.AggregateQuerySnapshot<T>> {
    return documentRef.get();
  }

  override set<T>(documentRef: FirebaseFirestore.DocumentReference<T>, data: FirebaseFirestore.PartialWithFieldValue<T>, options: FirebaseFirestore.SetOptions): FirebaseFirestore.Transaction;
  override set(documentRef: unknown, data: unknown, options?: unknown): FirebaseFirestore.Transaction;
  override set<T>(documentRef: FirebaseFirestore.DocumentReference<T>, data: FirebaseFirestore.WithFieldValue<T>): FirebaseFirestore.Transaction {
    documentRef.set(data);
    return this;
  }
}