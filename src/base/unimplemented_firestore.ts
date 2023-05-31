import { Firestore } from 'firebase-admin/firestore';

export class UnimplementedFirestore implements Firestore {


  collection(collectionPath: string): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    throw new Error('Method not implemented.');
  }
  doc(documentPath: string): FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> {
    throw new Error('Method not implemented.');
  }
  collectionGroup(collectionId: string): FirebaseFirestore.CollectionGroup<FirebaseFirestore.DocumentData> {
    throw new Error('Method not implemented.');
  }
  runTransaction<T>(updateFunction: (transaction: FirebaseFirestore.Transaction) => Promise<T>, transactionOptions?: FirebaseFirestore.ReadWriteTransactionOptions | FirebaseFirestore.ReadOnlyTransactionOptions | undefined): Promise<T> {
    throw new Error('Method not implemented.');
  }

  settings(settings: FirebaseFirestore.Settings): void {
    throw new Error('Method not implemented.');
  }
  getAll(...documentRefsOrReadOptions: (FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> | FirebaseFirestore.ReadOptions)[]): Promise<FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>[]> {
    throw new Error('Method not implemented.');
  }
  recursiveDelete(ref: FirebaseFirestore.CollectionReference<unknown> | FirebaseFirestore.DocumentReference<unknown>, bulkWriter?: FirebaseFirestore.BulkWriter | undefined): Promise<void> {
    throw new Error('Method not implemented.');
  }
  terminate(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  listCollections(): Promise<FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>[]> {
    throw new Error('Method not implemented.');
  }
  batch(): FirebaseFirestore.WriteBatch {
    throw new Error('Method not implemented.');
  }
  bulkWriter(options?: FirebaseFirestore.BulkWriterOptions | undefined): FirebaseFirestore.BulkWriter {
    throw new Error('Method not implemented.');
  }
  bundle(bundleId?: string | undefined): FirebaseFirestore.BundleBuilder {
    throw new Error('Method not implemented.');
  }

}


