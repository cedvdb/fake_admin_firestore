"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = __importDefault(require("node:assert"));
const node_test_1 = require("node:test");
const src_1 = require("../src");
const data_1 = require("./data");
let firestore;
(0, node_test_1.describe)('FakeFirestore', () => {
    (0, node_test_1.beforeEach)(() => firestore = new src_1.FakeFirestore(data_1.petAppData));
    (0, node_test_1.it)('should implement firestore', () => {
        const collection = firestore.collection('accounts');
        const document = collection.doc('user-id-1');
        (0, node_assert_1.default)(document != undefined);
    });
    (0, node_test_1.it)('should find collection', () => {
        const accounts = firestore.collection('accounts');
        (0, node_assert_1.default)(accounts != undefined);
    });
    (0, node_test_1.it)('should find collectionGroup', async () => {
        const petGroup = firestore.collectionGroup('pets');
        const petsDocs = await petGroup.get();
        node_assert_1.default.equal(petsDocs.size, 2);
    });
    (0, node_test_1.it)('should run a transaction', async () => {
        await firestore.runTransaction(async (transaction) => {
            const accountSnapshot = await transaction.get(firestore.collection('accounts').doc('user-id-1'));
            return transaction.set(accountSnapshot.ref, { age: 7 });
        });
        const snap = await firestore.collection('accounts').doc('user-id-1').get();
        node_assert_1.default.equal(snap.data()?.age, 7);
    });
});
(0, node_test_1.describe)('FakeCollection', () => {
    let accounts;
    (0, node_test_1.beforeEach)(() => firestore = new src_1.FakeFirestore(data_1.petAppData));
    (0, node_test_1.beforeEach)(() => accounts = firestore.collection('accounts'));
    (0, node_test_1.it)('should find document', async () => {
        const document = accounts.doc('user-id-1');
        node_assert_1.default.deepStrictEqual(document.id, 'user-id-1');
        const snapshot = await document.get();
        node_assert_1.default.deepStrictEqual(snapshot.data(), data_1.petAppData.accounts['user-id-1'].data);
    });
    (0, node_test_1.it)('should allow a noop withConverter', async () => {
        const accounts = firestore.collection('accounts').withConverter({
            toFirestore: (modelObject) => modelObject,
            fromFirestore: (snapshot) => snapshot.data(),
        });
        const accountSnapshot = await accounts.doc('user-id-1').get();
        const accountData = accountSnapshot.data();
        node_assert_1.default.deepStrictEqual(accountData, data_1.petAppData.accounts['user-id-1'].data);
    });
    (0, node_test_1.it)('should add document', async () => {
        const account = {
            age: 10,
            likes: [],
            name: 'Timmy',
        };
        await accounts.add(account);
        const docs = await accounts.get();
        node_assert_1.default.equal(docs.size, 3);
    });
    (0, node_test_1.describe)('Query', () => {
        (0, node_test_1.beforeEach)(() => firestore = new src_1.FakeFirestore(data_1.petAppData));
        (0, node_test_1.it)('should filter with >', async () => {
            const foundAccounts = await accounts.where('age', '>', 10).get();
            node_assert_1.default.equal(foundAccounts.docs.length, 1);
            node_assert_1.default.equal(foundAccounts.docs[0].id, 'user-id-1');
        });
        (0, node_test_1.it)('should filter with >=', async () => {
            const foundAccounts = await accounts.where('age', '>=', 10).get();
            node_assert_1.default.equal(foundAccounts.docs.length, 2);
        });
        (0, node_test_1.it)('should filter with ==', async () => {
            const foundAccounts = await accounts.where('age', '==', 30).get();
            node_assert_1.default.equal(foundAccounts.docs.length, 1);
            node_assert_1.default.equal(foundAccounts.docs[0].id, 'user-id-1');
        });
        (0, node_test_1.it)('should filter with !=', async () => {
            const foundAccounts = await accounts.where('age', '!=', 30).get();
            node_assert_1.default.equal(foundAccounts.docs.length, 1);
            node_assert_1.default.equal(foundAccounts.docs[0].id, 'user-id-2');
        });
        (0, node_test_1.it)('should filter with <=', async () => {
            const foundAccounts = await accounts.where('age', '<=', 30).get();
            node_assert_1.default.equal(foundAccounts.docs.length, 2);
        });
        (0, node_test_1.it)('should filter with <', async () => {
            const foundAccounts = await accounts.where('age', '<', 30).get();
            node_assert_1.default.equal(foundAccounts.docs.length, 1);
            node_assert_1.default.equal(foundAccounts.docs[0].id, 'user-id-2');
        });
        (0, node_test_1.it)('should filter with array-contains', async () => {
            const foundAccountsThatLikeCats = await accounts.where('likes', 'array-contains', data_1.Animal.cat).get();
            node_assert_1.default.equal(foundAccountsThatLikeCats.docs.length, 1);
            node_assert_1.default.equal(foundAccountsThatLikeCats.docs[0].id, 'user-id-1');
            const foundAccountsThatLikeSnakes = await accounts.where('likes', 'array-contains', data_1.Animal.snake).get();
            node_assert_1.default.equal(foundAccountsThatLikeSnakes.docs.length, 1);
            node_assert_1.default.equal(foundAccountsThatLikeSnakes.docs[0].id, 'user-id-2');
            const foundAccountsThatLikeDogs = await accounts.where('likes', 'array-contains', data_1.Animal.dog).get();
            node_assert_1.default.equal(foundAccountsThatLikeDogs.docs.length, 2);
        });
        (0, node_test_1.it)('should filter with array-contains-any', async () => {
            const likesCats = await accounts.where('likes', 'array-contains-any', [data_1.Animal.cat]).get();
            node_assert_1.default.equal(likesCats.docs.length, 1);
            node_assert_1.default.equal(likesCats.docs[0].id, 'user-id-1');
            const likesCatsOrSnakes = await accounts.where('likes', 'array-contains-any', [data_1.Animal.cat, data_1.Animal.snake]).get();
            node_assert_1.default.equal(likesCatsOrSnakes.docs.length, 2);
        });
        (0, node_test_1.it)('should filter with in', async () => {
            const parks = await firestore.collection('parks').where('animalPolicy.favoriteAnimal', 'in', [data_1.Animal.cat, data_1.Animal.snake]).get();
            node_assert_1.default.equal(parks.docs.length, 1);
            node_assert_1.default.equal(parks.docs[0].id, 'park-id-2');
        });
        (0, node_test_1.it)('should filter with not-in', async () => {
            const parks = await firestore.collection('parks').where('animalPolicy.favoriteAnimal', 'not-in', [data_1.Animal.cat, data_1.Animal.snake]).get();
            node_assert_1.default.equal(parks.docs.length, 1);
            node_assert_1.default.equal(parks.docs[0].id, 'park-id-1');
        });
    });
});
(0, node_test_1.describe)('FakeDocument', () => {
    let accounts;
    (0, node_test_1.beforeEach)(() => firestore = new src_1.FakeFirestore(data_1.petAppData));
    (0, node_test_1.beforeEach)(() => accounts = firestore.collection('accounts'));
    (0, node_test_1.it)('should know its existence', async () => {
        const account = await accounts.doc('user-id-1').get();
        node_assert_1.default.equal(account.exists, true);
    });
    (0, node_test_1.it)('should have data', async () => {
        const account = await accounts.doc('user-id-1').get();
        node_assert_1.default.deepStrictEqual(account.data(), data_1.petAppData.accounts['user-id-1'].data);
    });
    (0, node_test_1.it)('should create', async () => {
        await accounts.doc('user-id-3').create({
            age: 2, likes: [], name: 'Joseph'
        });
        const allAccounts = await accounts.get();
        node_assert_1.default.equal(allAccounts.size, 3);
    });
    (0, node_test_1.it)('should delete', async () => {
        await accounts.doc('user-id-1').delete();
        const allAccounts = await accounts.get();
        node_assert_1.default.equal(allAccounts.size, 1);
    });
    (0, node_test_1.describe)('set', () => {
        (0, node_test_1.beforeEach)(() => firestore = new src_1.FakeFirestore(data_1.petAppData));
        (0, node_test_1.it)('should set when field is a root field', async () => {
            await accounts.doc('user-id-1').set({ age: 21 });
            const account = await accounts.doc('user-id-1').get();
            node_assert_1.default.equal(account.data()?.age, 21);
        });
        (0, node_test_1.it)('should merge when field is nested and merge is true', async () => {
            await firestore.collection('parks').doc('park-id-1').set({ animalPolicy: { favoriteAnimal: data_1.Animal.cat } }, { merge: true });
            const park = await firestore.collection('parks').doc('park-id-1').get();
            node_assert_1.default.equal(park.data()?.animalPolicy.favoriteAnimal, data_1.Animal.cat);
            node_assert_1.default.deepStrictEqual(park.data()?.animalPolicy.acceptedAnimals, [data_1.Animal.dog, data_1.Animal.cat]);
        });
    });
});
