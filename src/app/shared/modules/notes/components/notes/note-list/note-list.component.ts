import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {Note} from '../../../interfaces/note.interface';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {
  NgxTileLayoutComponent
} from '../../../../../../../../projects/ngx-tile-layout/src/lib/ngx-tile-layout.component';
import {NgxResponsiveColumnsService} from 'ngx-responsive-columns';
import {MatDrawer} from '@angular/material/sidenav';
import {DEFAULT_COLLECTIONS} from '../notes.component';
import {NOTE_MODE} from '../../../enums/note-mode.enum';
import {NotesService} from '../../../services/notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy {
  @Input() drawer: MatDrawer | undefined;
  @ViewChild('masonryLayoutComponent') masonryLayoutComponent: NgxTileLayoutComponent | undefined;
  @Output() notesSelectedEmitter: EventEmitter<Note[]> = new EventEmitter<Note[]>();
  protected readonly NOTE_MODE = NOTE_MODE;

  noteMode: NOTE_MODE = NOTE_MODE.DETAIL;
  noteList: any[] = [];
  noteIdEdited: string | null = null;
  newNote: Note | null = null;
  breakpoint = 3;

  private initNewNote: Note = {
    id: undefined,
    title: undefined,
    content: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    color: undefined,
    collections: [DEFAULT_COLLECTIONS.ALL]
  };

  private selectedCollections: string[] = [DEFAULT_COLLECTIONS.ALL];
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
  }

  loadNote(collections: string[] = [DEFAULT_COLLECTIONS.ALL]) {
    this.selectedCollections = collections;
    this.noteService.getNotesByCollections(collections)
      .subscribe(notes => this.noteList = notes);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addNewNote(): void {
    this.initNewNote.collections = this.selectedCollections;
    this.newNote = {...this.initNewNote};
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
}
