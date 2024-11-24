import {Component, OnInit, OnDestroy, viewChild, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil, of } from 'rxjs';
import { selectAllNotes } from '../stores/note.selectors';
import { Note } from '../interfaces/note.interface';
import {addNote, loadNotes, updateNote, deleteNote, updateAllNotes} from '../stores/note.actions';
import { v4 as uuidv4 } from 'uuid';
import {CdkDragDrop, CdkDragMove, moveItemInArray} from '@angular/cdk/drag-drop';
import {NgxTileLayoutComponent} from '../../../../../../projects/ngx-tile-layout/src/lib/ngx-tile-layout.component';
import {NgxResponsiveColumnsService} from 'ngx-responsive-columns';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  @ViewChild('masonryLayoutComponent') masonryLayoutComponent: NgxTileLayoutComponent | undefined;
  private destroy$ = new Subject<void>();

  notes$: Observable<Note[]> = of([]);
  newNote: Note | null = null;
  breakpoint = 3;

  initNewNote: Note = {
    id: null,
    title: null,
    content: null,
    createdAt: null,
    color: null,
    disabled: false
  };

  noteList: any[] = [] ;
  noteEdit: string | undefined;

  constructor(
    private store: Store,
    private responsiveColumnsService: NgxResponsiveColumnsService
  ) {}

  ngOnInit(): void {
    this.notes$ = this.store.select(selectAllNotes).pipe(
      map((notes) => notes.slice().reverse())
    );

    this.store.select(selectAllNotes).pipe(
      map((notes) => notes.slice().reverse())
    ).subscribe(notes => this.noteList = notes);

    this.store.dispatch(loadNotes());

    this.responsiveColumnsService.breakpoint$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cols) => {
        this.breakpoint = cols;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addNewNote(): void {
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
}
