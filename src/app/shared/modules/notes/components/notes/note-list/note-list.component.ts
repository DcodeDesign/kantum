import {Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {Store} from '@ngrx/store';
import {map, Subject, takeUntil} from 'rxjs';
import {selectAllNotes} from '../../../stores/note/note.selectors';
import {Note} from '../../../interfaces/note.interface';
import {addNote, updateNote, deleteNote, updateAllNotes} from '../../../stores/note/note.actions';
import {CdkDragDrop, CdkDragMove, moveItemInArray} from '@angular/cdk/drag-drop';
import {
  NgxTileLayoutComponent
} from '../../../../../../../../projects/ngx-tile-layout/src/lib/ngx-tile-layout.component';
import {NgxResponsiveColumnsService} from 'ngx-responsive-columns';
import {MatDrawer} from '@angular/material/sidenav';
import {DEFAULT_COLLECTIONS} from '../notes.component';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnDestroy {
  @Input() drawer: MatDrawer | undefined;
  @ViewChild('masonryLayoutComponent') masonryLayoutComponent: NgxTileLayoutComponent | undefined;
  @Output() notesSelectedEmitter: EventEmitter<Note[]> = new EventEmitter<Note[]>();
  private destroy$ = new Subject<void>();

  newNote: Note | null = null;
  breakpoint = 3;

  initNewNote: Note = {
    id: null,
    title: null,
    content: null,
    createdAt: null,
    color: null,
    disabled: false,
    collections: [DEFAULT_COLLECTIONS.ALL]
  };

  noteList: any[] = [];
  noteEdit: string | undefined;

  notesSelected: Note[] = [];
  selectedCollections: string[] = [DEFAULT_COLLECTIONS.ALL];

  constructor(
    private store: Store,
    private responsiveColumnsService: NgxResponsiveColumnsService
  ) {
  }

  ngOnInit(): void {
    this.responsiveColumnsService.breakpoint$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cols) => {
        this.breakpoint = cols;
      });
  }

  loadNote(collections: string[] = [DEFAULT_COLLECTIONS.ALL]) {
    this.selectedCollections = collections;
    this.store.select(selectAllNotes).pipe(
      map(notes => notes.filter(note => {
        if (collections.length > 0) {
          const matchesAll =
            collections?.every(collection => note?.collections?.includes(collection));
          const matchesAny =
            collections?.some(collection => note?.collections?.includes(collection));
          return matchesAll || matchesAny;
        } else {
          return note?.collections?.length === 0;
        }
      })),
      map((notes) => notes.slice().reverse())
    ).subscribe(notes => this.noteList = notes);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addNewNote(): void {
    this.initNewNote.collections = this.selectedCollections;
    this.newNote = {...this.initNewNote};
  }

  addNoteHandler(note: Note) {
    this.store.dispatch(addNote({note}));
    this.newNote = null;
    this.noteEdit = undefined;
  }

  updateNoteHandler(note: Note) {
    this.store.dispatch(updateNote({note}));
    this.noteEdit = undefined;
  }

  deleteNoteHandler(id: string) {
    if (!id) return;
    this.store.dispatch(deleteNote({id}));
    this.newNote = null;
  }

  cancelEditNoteHandler() {
    this.newNote = null;
    this.noteEdit = undefined;
  }

  drop($event: CdkDragDrop<any, any>) {
    if (!this.noteList) return;

    moveItemInArray(this.noteList, $event.previousIndex, $event.currentIndex);

    this.store.dispatch(updateAllNotes({notes: this.noteList.slice().reverse()}));
  }

  dragMoved($event: CdkDragMove<any>) {
    this.masonryLayoutComponent?.debounceRecalculateLayout(100);
  }

  resizeTextArea() {
    this.masonryLayoutComponent?.debounceRecalculateLayout(700);
  }

  currentNoteEdite($event: string | undefined) {
    this.noteEdit = $event
  }

  onSelectedNote($event: Note | undefined): void {
    if (!$event) {
      return;
    }
    const index = this.notesSelected.findIndex(note => note.id === $event.id);
    if (index !== -1) {
      this.notesSelected.splice(index, 1);
    } else {
      this.notesSelected.push($event);
    }

    this.notesSelectedEmitter.emit(this.notesSelected)
  }

  archiveNote(note: Note | undefined) {
    if (note) {
      note = {...note, collections: [DEFAULT_COLLECTIONS.ARCHIVE]}
      this.store.dispatch(updateNote({note}));
    }
  }
}
