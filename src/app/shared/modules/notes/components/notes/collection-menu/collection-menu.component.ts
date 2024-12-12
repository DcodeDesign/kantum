import {Component, EventEmitter, Input, Output} from '@angular/core';
import {noteMenu} from '../../../interfaces/note-menu.interface';

@Component({
  selector: 'app-collection-menu',
  templateUrl: './collection-menu.component.html',
  styleUrl: './collection-menu.component.scss'
})
export class CollectionMenuComponent {
  @Input() treeList: noteMenu[] = [];

  childrenAccessor = (node: noteMenu) => node.children ?? [];

  hasChild = (_: number, node: noteMenu) => !!node.children && node.children.length > 0;
}
