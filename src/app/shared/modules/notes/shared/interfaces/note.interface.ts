export interface Note {
  id?: string | undefined;
  title: string | undefined;
  content: string | undefined;
  color: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  collections: string[] | undefined;
}

export interface NoteState {
  notes: Note[];
}

export const initialNoteState: AppStateNote = {
  notes: []
};

export interface AppStateNote {
  notes: Note[];
}
