

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

Your pull request shall contain:

  - tests for the added feature
  - the feature (scoped, don't make 1 PR for 3 features)
  - increment of the package.json semver
  - added entry in CHANGELOG.md