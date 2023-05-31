export type FakeFirestoreCollectionGroupData<G = Object> = Record<string, FakeFirestoreCollectionData<G>>;
export type FakeFirestoreCollectionData<G = Object> = Record<string, FakeFirestoreDocumentData<G>>;

export interface FakeFirestoreDocumentData<G = Object> {
  data: G,
  collections?: FakeFirestoreCollectionGroupData;
}