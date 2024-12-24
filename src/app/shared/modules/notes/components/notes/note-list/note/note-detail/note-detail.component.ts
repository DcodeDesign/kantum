import {
  afterNextRender, AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  Injector,
  Input, OnDestroy, OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Note} from '../../../../../shared/interfaces/note.interface';
import {Subject} from 'rxjs';
import {NotesService} from '../../../../../shared/services/notes.service';
import {DEFAULT_COLLECTIONS} from '../../../notes.component';
import {ISelectedNote} from '../../../../../shared/interfaces/selected-note.interface';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrl: '../note.component.scss'
})
export class NoteDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') hostClass: string |  null = null;
  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;
  @ViewChild('textAreaElement') textAreaElement: ElementRef | undefined;

  @Output() editionNote: EventEmitter<Note> = new EventEmitter<Note>();
  @Output() resizeTextArea = new EventEmitter<void>();
  @Output() noteSelected = new EventEmitter<ISelectedNote>();

  @Input() note: Note | undefined;

  private resizeObserver: ResizeObserver | undefined;
  private _injector = inject(Injector);
  private destroy$ = new Subject<void>();

  mouseOvered: boolean | undefined;
  isChecked: boolean | undefined;

  constructor(private noteService: NotesService){ }

  ngOnInit(): void {
    this.triggerResize();

    this.resizeObserver = new ResizeObserver(() => {
      this.resizeTextArea.emit()
    })
  }

  ngAfterViewInit(): void {
    if(this.textAreaElement?.nativeElement) {
      this.resizeObserver?.observe(this.textAreaElement?.nativeElement)
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onEditNote(note: Note | undefined): void {
    if(!note) return;

    this.editionNote.emit(note);
  }

  onArchiveNote(note: Note | undefined) {
      if (note)
        this.noteService.updateNote(
          { ...note, collections: [DEFAULT_COLLECTIONS.ARCHIVE] }
        );
  }

  onDeleteNote(id: string | undefined): void {
    if (id) this.noteService.deleteNote(id);
  }

  onChecked(checked: boolean, note: Note | undefined) {
    if(!note) return;

    this.isChecked = checked;

    this.noteSelected.emit({ note: note, isSelected: checked });
  }

  triggerResize(): void {
    afterNextRender(
      () => {
        this.autosize?.resizeToFitContent(true);
      },
      { injector: this._injector }
    );
  }

  isMouseOvered(isOvered: boolean) {
    this.mouseOvered = isOvered;
  }
}
