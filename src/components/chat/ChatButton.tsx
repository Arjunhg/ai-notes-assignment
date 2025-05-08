'use client';

import React from 'react';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { useNoteStore } from '@/lib/store/useNoteStore';

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen }) => {
  const { theme } = useNoteStore();

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 p-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
        isOpen
          ? 'bg-blue-500 text-white'
          : theme === 'dark'
          ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 z-20`}
      title={isOpen ? 'Close chat' : 'Open chat'}
    >
      <ChatBubbleLeftIcon className={`w-6 h-6 ${isOpen ? 'animate-pulse' : ''}`} />
    </button>
  );
};

export default ChatButton;