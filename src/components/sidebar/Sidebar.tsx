'use client';

import React from 'react';
import { useNoteStore } from '@/lib/store/useNoteStore';
import { Note } from '@/types';
import { PlusIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  const { notes, activeNoteId, setActiveNote, addNote } = useNoteStore();

  const handleNewNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    addNote(newNote);
    setActiveNote(newNote.id);
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={handleNewNote}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          <span>New Note</span>
        </button>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-2">
        {notes.map((note) => (
          <button
            key={note.id}
            onClick={() => setActiveNote(note.id)}
            className={`w-full flex items-center gap-2 p-3 rounded-lg mb-1 transition-colors ${
              activeNoteId === note.id
                ? 'bg-blue-50 text-blue-700'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <DocumentTextIcon className="w-5 h-5" />
            <div className="flex-1 text-left truncate">
              <div className="font-medium truncate">{note.title}</div>
              <div className="text-xs text-gray-500">
                {new Date(note.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 