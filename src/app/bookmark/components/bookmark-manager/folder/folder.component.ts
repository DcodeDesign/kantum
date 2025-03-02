import {Component, Input} from '@angular/core';
import {Folder} from '../bookmark-manager.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.scss'
})
export class FolderComponent {
  @Input() folder!: Folder;

  toggleFolder() {
    this.folder.expanded = !this.folder.expanded;
  }
}
