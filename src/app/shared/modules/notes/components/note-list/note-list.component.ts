import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {map, Subject, takeUntil} from 'rxjs';

import {MatDrawer} from '@angular/material/sidenav';
import {Note} from '../../interfaces/note.interface';
import {NotesService} from '../../services/notes.service';

import {DEFAULT_COLLECTIONS} from '../../constants/default-collections.constant';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { NOTE_MODE } from '../../enums/note-mode.enum';
import {
  NgxResponsiveColumnsService
} from '../../../../../../../projects/ngx-responsive-columns/src/lib/services/ngx-responsive-columns.service';
import {NgxTileLayoutComponent} from '../../../../../../../projects/ngx-tile-layout/src/lib/ngx-tile-layout.component';


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() drawer: MatDrawer | undefined;
  @Input() collectionSelected: string = DEFAULT_COLLECTIONS.ALL;
  @Input() searchText: string | undefined | null;

  @Output() selectedNotes = new EventEmitter<Note[]>();

  @ViewChild('masonryLayoutComponent') masonryLayoutComponent: NgxTileLayoutComponent | undefined;

  protected readonly NOTE_MODE = NOTE_MODE;

  noteMode: NOTE_MODE = NOTE_MODE.DETAIL;
  noteList: any[] = [];
  noteIdEdited: string | null = null;
  newNote: Note | null = null;
  breakpoint = 3;

  private destroy$ = new Subject<void>();

  constructor(
    private noteService: NotesService,
    private responsiveColumnsService: NgxResponsiveColumnsService
  ) { }

  ngOnInit(): void {
    this.responsiveColumnsService.breakpoint$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cols) => {
        this.breakpoint = cols;
      });

    this.loadNote()
  }

  loadNote(collections: string[] = [DEFAULT_COLLECTIONS.ALL], searchText?: string): void {
    this.noteService.getNotesByCollections(collections)
      .pipe(
        takeUntil(this.destroy$),
        map((notes: Note[]) =>
          searchText
            ? notes?.filter(note => note?.title?.includes(searchText) || note?.content?.includes(searchText))
            : notes
        )
      )
      .subscribe((filteredNotes: Note[]) => {
        this.noteList = filteredNotes;
      });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  drop($event: CdkDragDrop<any, any>) {
    if (!this.noteList) return;

    moveItemInArray(this.noteList, $event.previousIndex, $event.currentIndex);

    this.noteService.updateAllNotes(this.noteList.slice().reverse())
  }

  dragMoved() {
    this.masonryLayoutComponent?.debounceRecalculateLayout(100);
  }

  resizeTextArea() {
    this.masonryLayoutComponent?.debounceRecalculateLayout(700);
  }

  cancelEdition() {
    this.noteIdEdited = null;
  }

  closeEdition() {
    this.noteIdEdited = null;
  }

  getNoteIdEditionMode(noteId: string) {
    this.noteIdEdited = noteId;
  }

  onNoteSelected(selectedNote: { note: Note; isSelected: boolean }) {
    const selectedNotes =  this.noteService.selectedNote(selectedNote)
    this.selectedNotes.emit(selectedNotes);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['collectionSelected']) {
      this.collectionSelected = changes['collectionSelected'].currentValue;
      this.loadNote([this.collectionSelected]);
    }

    if(changes['searchText']) {
      const searchText = changes['searchText'].currentValue;
      this.loadNote([this.collectionSelected], searchText);
    }
  }
}
