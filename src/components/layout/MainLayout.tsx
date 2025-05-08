'use client';

import React, { useEffect } from 'react';
import { useNoteStore } from '@/lib/store/useNoteStore';
import Sidebar from '@/components/sidebar/Sidebar';
import NoteEditor from '@/components/editor/NoteEditor';
import Toast from '@/components/ui/Toast';

const MainLayout: React.FC = () => {
  const { notes, activeNoteId, setActiveNote, createNote, theme } = useNoteStore();

  useEffect(() => {
    if (notes.length === 0) {
      createNote();
    } else if (!activeNoteId && notes.length > 0) {
      setActiveNote(notes[0].id);
    }
  }, [notes.length, activeNoteId, createNote, setActiveNote]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        {activeNoteId ? (
          <NoteEditor noteId={activeNoteId} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Select a note or create a new one
            </p>
          </div>
        )}
      </div>
      <Toast />
    </div>
  );
};

export default MainLayout;