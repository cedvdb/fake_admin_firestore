import { CollectionReference, DocumentReference, Firestore } from 'firebase-admin/firestore';
import assert from 'node:assert';
import { describe, it, } from 'node:test';
import { FakeFirestore } from '../src';


describe('FakeFirestore', () => {
  it('should implement firestore', () => {
    const firestore: Firestore = new FakeFirestore({ accounts: {} });
    const collection: CollectionReference = firestore.collection('accounts');
    const document: DocumentReference = collection.doc('user-id-1');
    assert(document != undefined);
  });

  it('should find collection');
  it('should find collectionGroup');
});

describe('FakeCollection', () => {
  it('should find document', () => { });
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