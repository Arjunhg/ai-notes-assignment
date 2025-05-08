'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useNoteStore } from '@/lib/store/useNoteStore';
import { mockChatResponse } from '@/lib/api/chat';
import ChatButton from '@/components/chat/ChatButton';
import ChatInterface from '@/components/chat/ChatInterface';
import {
  BoldIcon,
  ItalicIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';

interface NoteEditorProps {
  noteId: string;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ noteId }) => {
  const { notes, updateNote, chatHistory, addChatMessage } = useNoteStore();
  const note = notes.find((n) => n.id === noteId);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: note?.content || '',
    onUpdate: ({ editor }) => {
      updateNote(noteId, { content: editor.getHTML() });
    },
  });

  useEffect(() => {
    if (editor && note) {
      editor.commands.setContent(note.content);
    }
  }, [note?.id, editor]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNote(noteId, { title: e.target.value });
  };

  const handleSendMessage = async (content: string) => {
    const userMessage = {
      id: crypto.randomUUID(),
      noteId,
      role: 'user' as const,
      content,
      timestamp: new Date(),
    };
    addChatMessage(noteId, userMessage);

    const response = await mockChatResponse(content);
    
    const aiMessage = {
      id: crypto.randomUUID(),
      noteId,
      role: 'assistant' as const,
      content: response,
      timestamp: new Date(),
    };
    addChatMessage(noteId, aiMessage);
  };

  if (!note) return null;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Title Input */}
      <div className="border-b border-gray-200 p-4 bg-gray-50">
        <input
          type="text"
          value={note.title}
          onChange={handleTitleChange}
          className="w-full text-2xl font-bold outline-none bg-transparent text-gray-800 placeholder-gray-400"
          placeholder="Untitled Note"
        />
      </div>

      {/* Editor Toolbar */}
      <div className="border-b border-gray-200 p-2 flex gap-1 bg-gray-50">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 text-gray-700 ${
            editor?.isActive('bold') ? 'bg-gray-200' : ''
          }`}
          title="Bold"
        >
          <BoldIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 text-gray-700 ${
            editor?.isActive('italic') ? 'bg-gray-200' : ''
          }`}
          title="Italic"
        >
          <ItalicIcon className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-200 text-gray-700 ${
            editor?.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''
          }`}
          title="Heading 1"
        >
          <span className="font-bold">H1</span>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-200 text-gray-700 ${
            editor?.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''
          }`}
          title="Heading 2"
        >
          <span className="font-bold">H2</span>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-gray-200 text-gray-700 ${
            editor?.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''
          }`}
          title="Heading 3"
        >
          <span className="font-bold">H3</span>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 text-gray-700 ${
            editor?.isActive('bulletList') ? 'bg-gray-200' : ''
          }`}
          title="Bullet List"
        >
          <ListBulletIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 text-gray-700 ${
            editor?.isActive('orderedList') ? 'bg-gray-200' : ''
          }`}
          title="Numbered List"
        >
          <span className="font-bold">1.</span>
        </button>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-auto p-6 bg-white">
        <EditorContent 
          editor={editor} 
          className="prose prose-gray max-w-none min-h-[200px] [&_.ProseMirror]:text-gray-900 [&_.ProseMirror]:outline-none [&_.ProseMirror_p]:text-gray-900 [&_.ProseMirror_h1]:text-gray-900 [&_.ProseMirror_h2]:text-gray-900 [&_.ProseMirror_h3]:text-gray-900 [&_.ProseMirror_ul]:text-gray-900 [&_.ProseMirror_ol]:text-gray-900 [&_.ProseMirror_li]:text-gray-900 [&_.ProseMirror_strong]:text-gray-900 [&_.ProseMirror_em]:text-gray-900" 
        />
      </div>

      {/* Chat Components */}
      <ChatButton onClick={() => setIsChatOpen(!isChatOpen)} isOpen={isChatOpen} />
      {isChatOpen && (
        <ChatInterface
          messages={chatHistory[noteId] || []}
          onSendMessage={handleSendMessage}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </div>
  );
};

export default NoteEditor; 