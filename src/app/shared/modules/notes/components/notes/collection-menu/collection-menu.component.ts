import {Component, Input} from '@angular/core';
import {CollectionMenu} from '../../../interfaces/collection-menu.interface';

@Component({
  selector: 'app-collection-menu',
  templateUrl: './collection-menu.component.html',
  styleUrl: './collection-menu.component.scss'
})
export class CollectionMenuComponent {
  @Input() treeList: CollectionMenu[] = [];

  childrenAccessor = (node: CollectionMenu) => node.children ?? [];

  hasChild = (_: number, node: CollectionMenu) => !!node.children && node.children.length > 0;
}
