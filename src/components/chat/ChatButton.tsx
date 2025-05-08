import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
        isOpen
          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      <SparklesIcon className="w-6 h-6" />
    </button>
  );
};

export default ChatButton; 