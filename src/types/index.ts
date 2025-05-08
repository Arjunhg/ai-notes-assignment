export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  noteId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface NoteState {
  notes: Note[];
  activeNoteId: string | null;
  chatHistory: Record<string, ChatMessage[]>;
} 