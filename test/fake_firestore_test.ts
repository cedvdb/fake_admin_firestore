import { CollectionReference, DocumentReference, Firestore } from 'firebase-admin/firestore';
import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';
import { FakeFirestore } from '../src';
import { Account, Animal, petAppData } from './data';

let firestore: Firestore;



describe('FakeFirestore', () => {
  beforeEach(() => firestore = new FakeFirestore(petAppData));

  it('should implement firestore', () => {
    const collection: CollectionReference = firestore.collection('accounts');
    const document: DocumentReference = collection.doc('user-id-1');
    assert(document != undefined);
  });

  it('should find collection', () => {
    const accounts = firestore.collection('accounts');
    assert(accounts != undefined);
  });

  it('should find collectionGroup', async () => {
    const petGroup = firestore.collectionGroup('pets');
    const petsDocs = await petGroup.get();
    assert.equal(petsDocs.size, 2);
  });

  it('should run a transaction', async () => {
    await firestore.runTransaction(async (transaction) => {
      const accountSnapshot = await transaction.get(firestore.collection('accounts').doc('user-id-1'));
      transaction.set(accountSnapshot.ref, { age: 7 })
    });

  });

});

describe('FakeCollection', () => {
  let accounts: CollectionReference;
  beforeEach(() => accounts = firestore.collection('accounts'));
  beforeEach(() => firestore = new FakeFirestore(petAppData));

  it('should find document', async () => {
    const document = accounts.doc('user-id-1');
    assert.notEqual(document, undefined);
    assert.deepStrictEqual(document.id, 'user-id-1');
    const snapshot = await document.get();
    assert.deepStrictEqual(snapshot.data(), petAppData.accounts['user-id-1'].data)
  });

  it('should allow a noop withConverter', async () => {
    const accounts = firestore.collection('accounts').withConverter<Account>({
      toFirestore: (modelObject) => modelObject,
      fromFirestore: (snapshot) => snapshot.data() as Account,
    });
    const accountSnapshot = await accounts.doc('user-id-1').get();
    const accountData: Account | undefined = accountSnapshot.data();
    assert.deepStrictEqual(accountData, petAppData.accounts['user-id-1'].data);
  });

  it('should add document', async () => {
    const account: Account = {
      age: 10,
      likes: [],
      name: 'Timmy',
    }
    await accounts.add(account);
    const docs = await accounts.get();
    assert.equal(docs.size, 3);
  });

  describe('Query', () => {
    beforeEach(() => firestore = new FakeFirestore(petAppData));

    it('should filter with >', async () => {
      const foundAccounts = await accounts.where('age', '>', 10).get();
      assert.equal(foundAccounts.docs.length, 1);
      assert.equal(foundAccounts.docs[0].id, 'user-id-1');
    });

    it('should filter with >=', async () => {
      const foundAccounts = await accounts.where('age', '>=', 10).get();
      assert.equal(foundAccounts.docs.length, 2);
    });

    it('should filter with ==', async () => {
      const foundAccounts = await accounts.where('age', '==', 30).get();
      assert.equal(foundAccounts.docs.length, 1);
      assert.equal(foundAccounts.docs[0].id, 'user-id-1');
    });

    it('should filter with !=', async () => {
      const foundAccounts = await accounts.where('age', '!=', 30).get();
      assert.equal(foundAccounts.docs.length, 1);
      assert.equal(foundAccounts.docs[0].id, 'user-id-2');
    });

    it('should filter with <=', async () => {
      const foundAccounts = await accounts.where('age', '<=', 30).get();
      assert.equal(foundAccounts.docs.length, 2);
    });

    it('should filter with <', async () => {
      const foundAccounts = await accounts.where('age', '<', 30).get();
      assert.equal(foundAccounts.docs.length, 1);
      assert.equal(foundAccounts.docs[0].id, 'user-id-2');
    });

    it('should filter with array-contains', async () => {
      const foundAccountsThatLikeCats = await accounts.where('likes', 'array-contains', Animal.cat).get();
      assert.equal(foundAccountsThatLikeCats.docs.length, 1);
      assert.equal(foundAccountsThatLikeCats.docs[0].id, 'user-id-1');
      const foundAccountsThatLikeSnakes = await accounts.where('likes', 'array-contains', Animal.snake).get();
      assert.equal(foundAccountsThatLikeSnakes.docs.length, 1);
      assert.equal(foundAccountsThatLikeSnakes.docs[0].id, 'user-id-2');
      const foundAccountsThatLikeDogs = await accounts.where('likes', 'array-contains', Animal.dog).get();
      assert.equal(foundAccountsThatLikeDogs.docs.length, 2);
    });

    it('should filter with array-contains-any', async () => {
      const likesCats = await accounts.where('likes', 'array-contains-any', [Animal.cat]).get();
      assert.equal(likesCats.docs.length, 1);
      assert.equal(likesCats.docs[0].id, 'user-id-1');
      const likesCatsOrSnakes = await accounts.where('likes', 'array-contains-any', [Animal.cat, Animal.snake]).get();
      assert.equal(likesCatsOrSnakes.docs.length, 2);
    });

    it('should filter with in', async () => {
      const parks = await firestore.collection('parks').where('animalPolicy.favoriteAnimal', 'in', [Animal.cat, Animal.snake]).get();
      assert.equal(parks.docs.length, 1);
      assert.equal(parks.docs[0].id, 'park-id-2');
    });

    it('should filter with not-in', async () => {
      const parks = await firestore.collection('parks').where('animalPolicy.favoriteAnimal', 'not-in', [Animal.cat, Animal.snake]).get();
      assert.equal(parks.docs.length, 1);
      assert.equal(parks.docs[0].id, 'park-id-1');
    });
  });
});

describe('FakeDocument', () => {
  let accounts: CollectionReference;
  beforeEach(() => firestore = new FakeFirestore(petAppData));
  beforeEach(() => accounts = firestore.collection('accounts'));

  it('should know its existence', async () => {
    const account = await accounts.doc('user-id-1').get();
    assert.equal(account.exists, true);
  });

  it('should have data', async () => {
    const account = await accounts.doc('user-id-1').get();
    assert.deepStrictEqual(account.data(), petAppData.accounts['user-id-1'].data);
  });

  it('should create', async () => {
    await accounts.doc('user-id-3').create({
      age: 2, likes: [], name: 'Joseph'
    } as Account);
    const allAccounts = await accounts.get();
    assert.equal(allAccounts.size, 3);
  });

  it('should delete', async () => {
    await accounts.doc('user-id-1').delete();
    const allAccounts = await accounts.get();
    assert.equal(allAccounts.size, 1);
  });

  describe('set', () => {
    beforeEach(() => firestore = new FakeFirestore(petAppData));

    it('should set when field is a root field', async () => {
      await accounts.doc('user-id-1').set({ age: 21 });
      const account = await accounts.doc('user-id-1').get();
      assert.equal(account.data()?.age, 21);
    });

    it('should merge when field is nested and merge is true', async () => {
      await firestore.collection('parks').doc('park-id-1').set(
        { animalPolicy: { favoriteAnimal: Animal.cat } },
        { merge: true }
      );
      const park = await firestore.collection('parks').doc('park-id-1').get();
      assert.equal(park.data()?.animalPolicy.favoriteAnimal, Animal.cat);
      assert.deepStrictEqual(park.data()?.animalPolicy.acceptedAnimals, [Animal.dog, Animal.cat]);
    });
  });

});
