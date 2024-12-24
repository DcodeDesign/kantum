export interface Collection {
  id: string | null;
  name: string | null;
  createdAt: Date | null;
}

export interface CollectionState {
  collections: Collection[];
}

export const initialCollectionState: AppStateCollections = {
  collections: []
};

export interface AppStateCollections {
  collections: Collection[];
}
