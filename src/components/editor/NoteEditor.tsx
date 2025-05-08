'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import { useNoteStore } from '@/lib/store/useNoteStore';
import { useUIStore } from '@/lib/store/useUIStore';
import { mockChatResponse } from '@/lib/api/chat';
import ChatButton from '@/components/chat/ChatButton';
import ChatInterface from '@/components/chat/ChatInterface';
import '@/styles/editor.css';
import {
  BoldIcon,
  ItalicIcon,
  ListBulletIcon,
  TagIcon,
  MapPinIcon,
  XMarkIcon,
  PaintBrushIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

interface NoteEditorProps {
  noteId: string;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ noteId }) => {
  const { 
    notes, 
    updateNote, 
    chatHistory, 
    addChatMessage, 
    pinNote, 
    unpinNote, 
    setNoteColor, 
    theme 
  } = useNoteStore();
  
  const { showToast } = useUIStore();
  const note = notes.find((n) => n.id === noteId);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [newTag, setNewTag] = useState('');


  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, 
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'bullet-list',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'ordered-list',
        },
      }),
    ],
    content: note?.content || '',
    onUpdate: ({ editor }) => {
      updateNote(noteId, { content: editor.getHTML() });
    },
  });

  useEffect(() => {
    if (editor && note) {
      if (editor.getHTML() !== note.content) {
        editor.commands.setContent(note.content || '');
      }
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

    try {
      const response = await mockChatResponse(content);
      const aiMessage = {
        id: crypto.randomUUID(),
        noteId,
        role: 'assistant' as const,
        content: response,
        timestamp: new Date(),
      };
      addChatMessage(noteId, aiMessage);
    } catch (error) {
      showToast('Failed to get response from AI', 'error');
      console.error('Error getting AI response:', error);
    }
  };

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    
    const updatedTags = [...(note?.tags || []), newTag.trim()];
    updateNote(noteId, { tags: updatedTags });
    setNewTag('');
    setIsAddingTag(false);
    showToast('Tag added!', 'success');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = note?.tags?.filter(tag => tag !== tagToRemove) || [];
    updateNote(noteId, { tags: updatedTags });
    showToast('Tag removed!', 'info');
  };

  const handleTogglePin = () => {
    if (note?.isPinned) {
      unpinNote(noteId);
      showToast('Note unpinned!', 'info');
    } else {
      pinNote(noteId);
      showToast('Note pinned!', 'success');
    }
  };

  const handleColorChange = (color: string) => {
    setNoteColor(noteId, color);
    setIsColorPickerOpen(false);
    showToast('Note color updated!', 'success');
  };

  if (!note) return null;

  const colors = [
    { name: 'White', value: '#ffffff' },
    { name: 'Yellow', value: '#fef3c7' },
    { name: 'Blue', value: '#dbeafe' },
    { name: 'Green', value: '#d1fae5' },
    { name: 'Purple', value: '#f3e8ff' },
    { name: 'Pink', value: '#fce7f3' },
    { name: 'Orange', value: '#ffedd5' },
  ];

  return (
    <div 
      className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
      style={{ backgroundColor: note.color || (theme === 'dark' ? '#111827' : '#ffffff') }}
    >
      {/* Title and Controls */}
      <div className={`border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800/70' : 'border-gray-200 bg-gray-50/70'} p-4`}>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={note.title}
            onChange={handleTitleChange}
            className={`flex-1 text-2xl font-bold outline-none bg-transparent ${
              theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-400'
            }`}
            placeholder="Untitled Note"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePin}
              className={`p-2 rounded-full ${
                note.isPinned 
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-900/70' 
                  : theme === 'dark' 
                    ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-300' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
              title={note.isPinned ? 'Unpin note' : 'Pin note'}
            >
              <MapPinIcon className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsAddingTag(!isAddingTag)}
                className={`p-2 rounded-full ${
                  isAddingTag
                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-900/70'
                    : theme === 'dark' 
                      ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-300' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
                title="Add tag"
              >
                <TagIcon className="w-5 h-5" />
              </button>
              {isAddingTag && (
                <div className={`absolute right-0 mt-2 w-64 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} p-3 z-10`}>
                  <h3 className={`mb-2 font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Add tag</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Enter tag name..."
                      className={`flex-1 px-3 py-1.5 border ${theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                      autoFocus
                    />
                    <button
                      onClick={handleAddTag}
                      disabled={!newTag.trim()}
                      className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                className={`p-2 rounded-full ${
                  isColorPickerOpen
                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-900/70'
                    : theme === 'dark' 
                      ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-300' 
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
                title="Change note color"
              >
                <PaintBrushIcon className="w-5 h-5" />
              </button>
              {isColorPickerOpen && (
                <div className={`absolute right-0 mt-2 p-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} z-10`}>
                  <h3 className={`mb-2 font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Choose color</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => handleColorChange(color.value)}
                        className={`w-7 h-7 rounded-full border ${color.value === '#ffffff' ? (theme === 'dark' ? 'border-gray-600' : 'border-gray-300') : 'border-transparent'} ${note.color === color.value ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-200' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} ml-1`}
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Editor Toolbar */}
      <div className={`border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800/70' : 'border-gray-200 bg-gray-50/70'} p-2 flex flex-wrap gap-1`}>
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor?.isActive('bold') 
              ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800') 
              : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="Bold"
        >
          <BoldIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor?.isActive('italic') 
              ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800') 
              : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="Italic"
        >
          <ItalicIcon className="w-5 h-5" />
        </button>
        <div className={`w-px h-6 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} mx-1`} />
        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded ${
            editor?.isActive('heading', { level: 1 }) 
              ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800') 
              : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="Heading 1"
        >
          <span className="font-bold">H1</span>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${
            editor?.isActive('heading', { level: 2 }) 
              ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800') 
              : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="Heading 2"
        >
          <span className="font-bold">H2</span>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded ${
            editor?.isActive('heading', { level: 3 }) 
              ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800') 
              : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="Heading 3"
        >
          <span className="font-bold">H3</span>
        </button>
        <div className={`w-px h-6 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} mx-1`} />
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor?.isActive('bulletList') 
              ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800') 
              : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="Bullet List"
        >
          <ListBulletIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${
            editor?.isActive('orderedList') 
              ? (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800') 
              : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'
          }`}
          title="Numbered List"
        >
          <span className="font-bold">1.</span>
        </button>
      </div>

      {/* Editor Content */}
      <div className={`flex-1 overflow-auto p-6 ${theme === 'dark' ? 'bg-gray-900/60' : 'bg-white/60'}`}>
        <EditorContent 
          editor={editor} 
          className={`prose max-w-none min-h-[200px] ${
            theme === 'dark' 
              ? 'prose-invert [&_.ProseMirror]:text-gray-300' 
              : 'prose-gray [&_.ProseMirror]:text-gray-900'
          } [&_.ProseMirror]:outline-none`}
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