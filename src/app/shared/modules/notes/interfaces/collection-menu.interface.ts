import {Collection} from './collection.interface';

export interface CollectionMenu {
  name: string | null;
  children?: ChildrenCollectionMenu[] | undefined;
  action?:  ((param?: string | undefined) => void) | undefined;
  icon?: string;
}

export interface ChildrenCollectionMenu extends CollectionMenu, Collection {
  name: string | null
}
