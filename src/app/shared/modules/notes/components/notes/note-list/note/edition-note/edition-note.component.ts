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
import {Note} from '../../../../../interfaces/note.interface';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResizeObserver} from '@juggle/resize-observer';
import {NotesService} from '../../../../../services/notes.service';

@Component({
  selector: 'app-edition-note',
  templateUrl: './edition-note.component.html',
  styleUrl: '../note.component.scss'
})
export class EditionNoteComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class') hostClass: string |  null = null;
  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;
  @ViewChild('textAreaElement') textAreaElement: ElementRef | undefined;

  @Output() cancelEdition: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeEdition: EventEmitter<void> = new EventEmitter<void>();

  @Output() resizeTextArea: EventEmitter<void> = new EventEmitter<void>();

  @Input() note: Note | undefined;

  private _injector = inject(Injector);
  private destroy$ = new Subject<void>();

  private resizeObserver: ResizeObserver | undefined;

  noteForm: FormGroup | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NotesService
  ) { }

  ngOnInit(): void {
    this.initNoteForm();

    this.initNoteEditing(this.note)

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

  private initNoteForm(): void {
    this.noteForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      color: [null]
    });
  }

  private initNoteEditing(note: Note | undefined): void {
    if(!note) return;

    this.noteForm?.patchValue(note);
    this.hostClass = 'edit-note-card';
  }

  onSaveNote(): void {
    if (!this.noteForm || this.noteForm.invalid) {
      return;
    }

    if (this.note?.id) {
      this.noteService.updateNote({
        ...this.note,
        ...this.noteForm.value
      });
    } else {
      this.noteService.saveNote(this.noteForm.value);
    }

    this.closeEdition.emit();
  }

  onCancel(): void {
    this.noteForm?.reset();
    this.cancelEdition.emit();
  }

  triggerResize(): void {
    afterNextRender(
      () => {
        this.autosize?.resizeToFitContent(true);
      },
      { injector: this._injector }
    );
  }

  textAreaResizeObserver(textAreaElement: HTMLTextAreaElement) {
    this.resizeObserver?.observe(textAreaElement)
  }
}
