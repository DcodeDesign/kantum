import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  inject,
  Injector,
  afterNextRender,
  OnDestroy, OnInit, HostBinding, ElementRef, AfterViewInit
} from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit, OnDestroy, AfterViewInit {
  @HostBinding('class') hostClass: string |  null = null;
  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;
  @ViewChild('textAreaElement') textAreaElement: ElementRef | undefined;
  @Output() noteAdded: EventEmitter<Note> = new EventEmitter<Note>();
  @Output() noteUpdated: EventEmitter<Note> = new EventEmitter<Note>();
  @Output() noteDeleted: EventEmitter<string> = new EventEmitter<string>();
  @Output() cancelEdit: EventEmitter<void> = new EventEmitter<void>();
  @Output() resizeTextArea: EventEmitter<void> = new EventEmitter<void>();
  @Output() isEditMode: EventEmitter<string | undefined> = new EventEmitter<string | undefined>();

  private _note: Note | undefined;

  newNoteId: string | null = null;
  private resizeObserver: ResizeObserver | undefined;

  @Input() set note(value: Note | undefined) {

    if (value) {
      if(!value.id) {
        value = {...value, id :uuidv4()};
        this.newNoteId = value.id;
        this.hostClass = 'add-note-card';
      }

      this._note = value;
    }
  }

  get note(): Note | undefined {
    return this._note;
  }

  private _injector = inject(Injector);
  private destroy$ = new Subject<void>();

  noteForm: FormGroup;
  editingNote: Note | null = null;
  currentEditNoteId: string | null | 0 = null;
  mouseOvered: boolean | undefined;

  constructor(
    private fb: FormBuilder
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      color: ['']
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  saveNote(): void {
    if (this.noteForm.invalid) {
      return;
    }

    const note: Note = {
      ...this.noteForm.value,
      id: this.currentEditNoteId || this.newNoteId || uuidv4(),
      createdAt: this.editingNote?.createdAt || new Date()
    };

    if (this.currentEditNoteId) {
      this.noteUpdated.emit(note);
    } else {
      this.noteAdded.emit(note);
    }

    this.onCancel();
  }

  editNote(note: Note | null): void {
    if(!note) return;
    this.editingNote = note;
    this.currentEditNoteId = note?.id;
    this.noteForm.patchValue(note);
    this.hostClass = 'edit-note-card';
    this.isEditMode.emit(this.currentEditNoteId || undefined)
  }

  deleteNote(id: string | null): void {
    if (id) {
      this.noteDeleted.emit(id);
    }
  }

  onCancel(): void {
    this.noteForm.reset();
    this.editingNote = null;
    this.currentEditNoteId = null;
    this.newNoteId = null;
    this.hostClass = null;
    this.cancelEdit.emit();
    this.isEditMode.emit(undefined)
  }

  triggerResize(): void {
    afterNextRender(
      () => {
       this.autosize?.resizeToFitContent(true);
      },
      { injector: this._injector }
    );
  }

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

  textAreaResizeObserver(textAreaElement: HTMLTextAreaElement) {
    this.resizeObserver?.observe(textAreaElement)
  }


  loadImage() {
    this.resizeTextArea.emit();
  }
}
