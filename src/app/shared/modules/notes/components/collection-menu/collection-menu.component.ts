import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';
import {CollectionMenu} from '../../interfaces/collection-menu.interface';
import {CollectionService} from '../../services/collection.service';

@Component({
  selector: 'app-collection-menu',
  templateUrl: './collection-menu.component.html',
  styleUrl: './collection-menu.component.scss'
})
export class CollectionMenuComponent implements OnInit {
  treeList$: Observable<CollectionMenu[]> | undefined;

  constructor(public collectionService: CollectionService) {}

  ngOnInit(): void {
    this.treeList$ = this.collectionService.getTreeList();
  }

  childrenAccessor = (node: CollectionMenu) => node.children ?? [];

  hasChild = (_: number, node: CollectionMenu) => !!node.children && node.children.length > 0;
}
