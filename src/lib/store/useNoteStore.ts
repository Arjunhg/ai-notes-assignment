import { create } from 'zustand';
import { Note, ChatMessage, NoteState } from '@/types';

interface NoteStore extends NoteState {
  addNote: (note: Note) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setActiveNote: (id: string | null) => void;
  addChatMessage: (noteId: string, message: ChatMessage) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  activeNoteId: null,
  chatHistory: {},

  addNote: (note) =>
    set((state) => ({
      notes: [...state.notes, note],
    })),

  updateNote: (id, updatedNote) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...updatedNote, updatedAt: new Date() } : note
      ),
    })),

  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
      chatHistory: Object.fromEntries(
        Object.entries(state.chatHistory).filter(([noteId]) => noteId !== id)
      ),
    })),

  setActiveNote: (id) =>
    set(() => ({
      activeNoteId: id,
    })),

  addChatMessage: (noteId, message) =>
    set((state) => ({
      chatHistory: {
        ...state.chatHistory,
        [noteId]: [...(state.chatHistory[noteId] || []), message],
      },
    })),
})); 