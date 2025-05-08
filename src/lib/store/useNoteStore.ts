'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  color: string;
  isPinned: boolean;
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

interface NoteState {
  notes: Note[];
  activeNoteId: string | null;
  chatHistory: Record<string, ChatMessage[]>;
  theme: 'light' | 'dark';
  viewMode: 'list' | 'grid';
  isSidebarOpen: boolean;
  isChatOpen: boolean;
  searchQuery: string;
  selectedTags: string[];
  createNote: () => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setActiveNote: (id: string | null) => void;
  addChatMessage: (noteId: string, message: ChatMessage) => void;
  pinNote: (id: string) => void;
  unpinNote: (id: string) => void;
  setNoteColor: (id: string, color: string) => void;
  toggleTheme: () => void;
  toggleViewMode: () => void;
  toggleSidebar: () => void;
  toggleChat: () => void;
  setChatOpen: (isOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
  toggleTag: (tag: string) => void;
  clearTags: () => void;
  addNote: (note: Note) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setViewMode: (mode: 'list' | 'grid') => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      notes: [],
      activeNoteId: null,
      chatHistory: {},
      theme: 'light',
      viewMode: 'list',
      isSidebarOpen: true,
      isChatOpen: false,
      searchQuery: '',
      selectedTags: [],

      createNote: () => {
        const newNote: Note = {
          id: crypto.randomUUID(),
          title: 'Untitled Note',
          content: '',
          tags: [],
          color: '#ffffff',
          isPinned: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          notes: [newNote, ...state.notes],
          activeNoteId: newNote.id,
        }));
      },

      addNote: (note) =>
        set((state) => ({
          notes: [note, ...state.notes],
        })),

      updateNote: (id, updates) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, ...updates, updatedAt: new Date() }
              : note
          ),
        })),

      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
          activeNoteId: state.activeNoteId === id ? null : state.activeNoteId,
        })),

      setActiveNote: (id) => set({ activeNoteId: id }),

      addChatMessage: (noteId, message) =>
        set((state) => ({
          chatHistory: {
            ...state.chatHistory,
            [noteId]: [...(state.chatHistory[noteId] || []), message],
          },
        })),

      pinNote: (id) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, isPinned: true } : note
          ),
        })),

      unpinNote: (id) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, isPinned: false } : note
          ),
        })),

      setNoteColor: (id, color) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, color } : note
          ),
        })),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      setTheme: (theme) => set({ theme }),

      toggleViewMode: () =>
        set((state) => ({
          viewMode: state.viewMode === 'list' ? 'grid' : 'list',
        })),

      setViewMode: (mode) => set({ viewMode: mode }),

      toggleSidebar: () =>
        set((state) => ({
          isSidebarOpen: !state.isSidebarOpen,
        })),

      toggleChat: () => 
        set((state) => ({
          isChatOpen: !state.isChatOpen,
        })),

      setChatOpen: (isOpen) => set({ isChatOpen: isOpen }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      toggleTag: (tag) =>
        set((state) => ({
          selectedTags: state.selectedTags.includes(tag)
            ? state.selectedTags.filter((t) => t !== tag)
            : [...state.selectedTags, tag],
        })),

      clearTags: () => set({ selectedTags: [] }),
    }),
    {
      name: 'note-storage',
    }
  )
);