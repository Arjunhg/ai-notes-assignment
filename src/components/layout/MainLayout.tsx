'use client';
import React from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import NoteEditor from '@/components/editor/NoteEditor';
import { useNoteStore } from '@/lib/store/useNoteStore';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { activeNoteId } = useNoteStore();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex-1 overflow-auto bg-gray-100">
        <main className="h-full">
          {activeNoteId ? (
            <NoteEditor noteId={activeNoteId} />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <div className="text-center p-8 bg-white rounded-lg shadow-sm">
                {children}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 