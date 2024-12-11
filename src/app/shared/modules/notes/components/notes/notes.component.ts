import {Component, OnInit, OnDestroy, viewChild, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import { Store } from '@ngrx/store';
import {map, Observable, Subject, takeUntil, of, filter} from 'rxjs';
import { selectAllNotes } from '../../stores/note.selectors';
import { Note } from '../../interfaces/note.interface';
import {addNote, loadNotes, updateNote, deleteNote, updateAllNotes} from '../../stores/note.actions';
import { v4 as uuidv4 } from 'uuid';
import {CdkDragDrop, CdkDragMove, moveItemInArray} from '@angular/cdk/drag-drop';
import {NgxTileLayoutComponent} from '../../../../../../../projects/ngx-tile-layout/src/lib/ngx-tile-layout.component';
import {NgxResponsiveColumnsService} from 'ngx-responsive-columns';
import {MatDrawer} from '@angular/material/sidenav';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  @Input() drawer: MatDrawer | undefined;
  @ViewChild('masonryLayoutComponent') masonryLayoutComponent: NgxTileLayoutComponent | undefined;
  @Output() notesSelectedEmitter:  EventEmitter<Note[]> = new EventEmitter<Note[]>();
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
    collections: ['All']
  };

  noteList: any[] = [] ;
  noteEdit: string | undefined;

  notesSelected: Note[] = [];
  selectedCollections: string[] = ['All'];

  constructor(
    private store: Store,
    private responsiveColumnsService: NgxResponsiveColumnsService
  ) {}

  ngOnInit(): void {
    this.loadNote();

    this.responsiveColumnsService.breakpoint$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cols) => {
        this.breakpoint = cols;
      });
  }

  loadNote(collections: string[] = ['All']) {
    this.selectedCollections = collections;
    this.store.select(selectAllNotes).pipe(
      map(notes => notes.filter(note => {
        const matchesAll =
          collections?.every(collection => note?.collections?.includes(collection));
        const matchesAny =
          collections?.some(collection => note?.collections?.includes(collection));
        return matchesAll || matchesAny;
      })),
      map((notes) => notes.slice().reverse())
    ).subscribe(notes => this.noteList = notes);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addNewNote(): void {
    this.initNewNote.collections = this.selectedCollections || ['All']
    this.newNote = { ...this.initNewNote };
  }

  addNoteHandler(note: Note) {
    this.store.dispatch(addNote({ note }));
    this.newNote = null;
    this.noteEdit = undefined;
  }

  updateNoteHandler(note: Note) {
    this.store.dispatch(updateNote({ note }));
    this.noteEdit = undefined;
  }

  deleteNoteHandler(id: string) {
    if (!id) return;
    this.store.dispatch(deleteNote({ id }));
    this.newNote = null;
  }

  cancelEditNoteHandler() {
    this.newNote = null;
    this.noteEdit = undefined;
  }

  drop($event: CdkDragDrop<any, any>) {
    if(!this.noteList) return;

    moveItemInArray(this.noteList, $event.previousIndex, $event.currentIndex);

    this.store.dispatch(updateAllNotes({ notes: this.noteList.slice().reverse() }));
  }

  dragMoved($event: CdkDragMove<any>) {
    this.masonryLayoutComponent?.debounceRecalculateLayout(100);
  }

  resizeTextArea() {
    this.masonryLayoutComponent?.debounceRecalculateLayout(700);
  }

  loadImage() {
    this.masonryLayoutComponent?.debounceRecalculateLayout(100);
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
    if(note) {
      note = { ...note, collections: ['archive'] }
      this.store.dispatch(updateNote({ note }));
    }
  }
}
