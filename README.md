

# Fake firebase admin/firstore

This package contains an in memory admin/firestore intended to be used in testing scenarii.

# Implemented features

 - Firestore:
  - collection
    - withConverter
    - add
    - doc
      - get
      - create
      - set
      - update
      - delete
    - where
      - limit
      - orderBy
  - collectionGroup
    - where
  - runTransaction

# Contributing

The repository adopts a diy philosophy and does not accept issues, if you need something it's diy.

Your pull request shall contain:

  - tests for the added feature
  - the feature (scoped, 1 PR == added 1 feature)
  - increment of the package.json semver
  - added entry in CHANGELOG.md

