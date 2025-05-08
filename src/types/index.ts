export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  isPinned: boolean;
  color: string;
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
  isSidebarOpen: boolean;
  isChatOpen: boolean;
  theme: 'light' | 'dark';
  viewMode: 'list' | 'grid';
  searchQuery: string;
  selectedTags: string[];
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export interface UIState {
  isLoading: boolean;
  error: string | null;
  isChatOpen: boolean;
  toast: {
    message: string;
    type: ToastType;
    isVisible: boolean;
  };
  toasts: Toast[];
}