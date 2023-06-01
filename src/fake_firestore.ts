import { Firestore } from 'firebase-admin/firestore';
import { UnimplementedFirestore } from './base/unimplemented_firestore';
import { FakeCollectionRef } from './fake_collection_ref';
import { FakeFirestoreCollectionData, FakeFirestoreCollectionGroupData } from './fake_firestore_data';
import { FakeCollectionGroup } from './fake_collection_group';
import { FakeTransaction } from './fake_transaction';

export class FakeFirestore extends UnimplementedFirestore implements Firestore {
  private _data: FakeFirestoreCollectionGroupData;

  constructor(data: FakeFirestoreCollectionGroupData) {
    super();
    this._data = JSON.parse(JSON.stringify(data)); // copy
  }

  override collection(collectionPath: string): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
    return new FakeCollectionRef(this._data[collectionPath]);
  }

  override collectionGroup(collectionId: string): FirebaseFirestore.CollectionGroup<FirebaseFirestore.DocumentData> {
    // find level collections
    const foundCollectionGroupData = this._walkCollectionTree(collectionId, this._data);
    const fakeCollection = new FakeCollectionRef<FirebaseFirestore.DocumentData>(foundCollectionGroupData);
    return new FakeCollectionGroup<FirebaseFirestore.DocumentData>(fakeCollection);
  }

  override async runTransaction<G>(updateFunction: (transaction: FirebaseFirestore.Transaction) => Promise<G>, transactionOptions?: FirebaseFirestore.ReadWriteTransactionOptions | FirebaseFirestore.ReadOnlyTransactionOptions | undefined): Promise<G> {
    return updateFunction(new FakeTransaction());
  }

  private _walkCollectionTree(collectionId: string, currentLevelCollections: FakeFirestoreCollectionGroupData): FakeFirestoreCollectionData {
    const foundData: FakeFirestoreCollectionData = {};
    // for each key in the collection group level ...
    Object.keys(currentLevelCollections).forEach(key => {
      const collection = currentLevelCollections[key];
      // add the collection data if it matches the id
      if (key == collectionId) {
        Object.keys(collection).forEach(key => foundData[key] = collection[key]);
      }
      const documents = Object.values(collection);
      documents.forEach((doc) => {
        const subcollections = this._walkCollectionTree(collectionId, doc.collections || {});
        if (Object.keys(subcollections).length > 0) {
          Object.keys(subcollections).forEach(key => foundData[key] = subcollections[key]);
        }
      });
    });
    return foundData;
  }
}

