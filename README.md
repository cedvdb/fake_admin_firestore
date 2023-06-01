

# Fake firebase admin/firstore

This package contains an in memory admin/firestore intended to be used in testing scenarii.

# Usage

```ts
const firestore: Firestore = new FakeFirestore({
  accounts: {
    'user-id-1': {
      data: {
        name: 'cedric',
        age: 30,
        likes: ['cat', 'dog']
      },
      // sub collections
      collections: {
        pets: {
          'pet-id-1': {
            data: {
              name: 'Pita',
              age: 3,
              animal: 'cat',
            }
          }
        },
      },
    },
  }
});
```

# Implemented features


 - Firestore:
  - collection
    - withConverter : this is a no operation conversion, it does nothing
    - add
    - doc
      - get
      - create
      - set  (FieldValue unsupported)
      - delete
    - where
      - limit
      - orderBy
  - collectionGroup
    - where
  - runTransaction

Note on data conversion:

This library does not do data conversion, instead when dumping data to `FakeFirestore(dataDump)`, the data should be a plain old js object without Firestore special types.

# Contributing

The repository adopts a diy philosophy and does not accept issues, if you need something it's diy.

Your pull request shall contain:

  - tests for the added feature
  - the feature (scoped, 1 PR == added 1 feature)
  - increment of the package.json semver
  - added entry in CHANGELOG.md

