import { CollectionReference, DocumentReference, Firestore } from 'firebase-admin/firestore';
import assert from 'node:assert';
import { describe, it, beforeEach } from 'node:test';
import { FakeFirestore } from '../src';
import { petAppData } from './data';

let firestore: Firestore;


beforeEach(() => firestore = new FakeFirestore(petAppData));

describe('FakeFirestore', () => {
  it('should implement firestore', () => {
    const collection: CollectionReference = firestore.collection('accounts');
    const document: DocumentReference = collection.doc('user-id-1');
    assert(document != undefined);
  });

  it('should find collection', () => {
    const accounts = firestore.collection('accounts');
    assert(accounts != undefined);
  });

  it('should find collectionGroup', () => {
    const pets = firestore.collectionGroup('pets');
    assert(pets != undefined);
  });


  describe('FakeCollection', () => {
    const accounts: CollectionReference = firestore.collection('accounts');

    it('should find document', async () => {
      const document = accounts.doc('user-id-1');
      assert(document != undefined);
      assert(document.id == 'user-id-1');
      const snapshot = await document.get();
      assert(snapshot.data() == petAppData.accounts['user-id-1'].data)
    });

    it('should convert document');
    it('should add document');
    describe('Query', () => {
      it('should filter with >');
      it('should filter with >=');
      it('should filter with ==');
      it('should filter with !=');
      it('should filter with <=');
      it('should filter with <');
      it('should filter with array-contains');
      it('should filter with array-contains-any');
      it('should filter with in');
      it('should filter with not-in');
    });
  });

  describe('FakeDocument', () => {
    it('should know if it exists');
    it('should have data');
    it('should create');
    it('should set');
    it('should update');
    it('should delete');
  });
});
