export interface Note {
  id: string | null;
  title: string | null;
  content: string | null;
  color: string | null | undefined;
  createdAt: Date | null;
  disabled: boolean | null;
  collections?: string[]
}

export interface NoteState {
  notes: Note[];
}

export const initialNoteState: AppState = {
  notes: []
};

export interface AppState {
  notes: Note[];
}
