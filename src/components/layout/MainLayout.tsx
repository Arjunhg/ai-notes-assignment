'use client';

import React, { useEffect } from 'react';
import { useNoteStore } from '@/lib/store/useNoteStore';
import Sidebar from '@/components/sidebar/Sidebar';
import NoteEditor from '@/components/editor/NoteEditor';
import Toast from '@/components/ui/Toast';

const MainLayout: React.FC = () => {
  const { notes, activeNoteId, setActiveNote, createNote, theme, hasHydrated } = useNoteStore();

  useEffect(() => {
    if (hasHydrated) {
      if (notes.length === 0) {
        createNote();
      } else if (!activeNoteId && notes.length > 0) {
        setActiveNote(notes[0].id);
      }
    }
  }, [hasHydrated, notes.length, activeNoteId, createNote, setActiveNote]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (!hasHydrated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-blue-600 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">Loading your notes...</p>
        </div>
      </div>
    );
  }

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