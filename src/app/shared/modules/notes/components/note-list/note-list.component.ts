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
import {Subject, takeUntil} from 'rxjs';
import {NgxTileLayoutComponent} from 'ngx-tile-layout';
import {MatDrawer} from '@angular/material/sidenav';
import {Note} from '../../interfaces/note.interface';
import {NotesService} from '../../services/notes.service';
import {NgxResponsiveColumnsService} from 'ngx-responsive-columns';
import {DEFAULT_COLLECTIONS} from '../../constants/default-collections.constant';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { NOTE_MODE } from '../../enums/note-mode.enum';


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() drawer: MatDrawer | undefined;
  @Input() collectionSelected: string | undefined;
  @ViewChild('masonryLayoutComponent') masonryLayoutComponent: NgxTileLayoutComponent | undefined;
  @Output() selectedNotes = new EventEmitter<Note[]>();
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

  loadNote(collections: string[] = [DEFAULT_COLLECTIONS.ALL]) {
    this.noteService.getNotesByCollections(collections)
      .pipe(takeUntil(this.destroy$))
      .subscribe((notes: Note[]) => {
        this.noteList = notes
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
      const collectionName = changes['collectionSelected'].currentValue
      this.loadNote([collectionName]);
    }
  }
}
