'use client';

import { useNoteStore } from '@/lib/store/useNoteStore';
import { useUIStore } from '@/lib/store/useUIStore';
import { 
  SunIcon, 
  MoonIcon, 
  ListBulletIcon, 
  Squares2X2Icon,
  PlusIcon,
  TagIcon,
  MapPinIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const { 
    notes, 
    activeNoteId, 
    setActiveNote, 
    createNote,
    deleteNote,
    theme, 
    toggleTheme, 
    viewMode, 
    toggleViewMode,
    isSidebarOpen,
    toggleSidebar,
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    clearTags
  } = useNoteStore();

  const { showToast } = useUIStore();

  const handleNewNote = () => {
    createNote();
    showToast('New note created!', 'success');
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNote(id);
    showToast('Note deleted!', 'info');
  };

  // Sort notes - pinned first, then by updated date
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  // Get all unique tags from notes
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags || [])));

  // Filter notes based on search query and selected tags
  const filteredNotes = sortedNotes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedTags.length === 0 || selectedTags.some(tag => note.tags?.includes(tag)))
  );

  return (
    <div className={`h-screen ${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-800'} border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'} relative flex flex-col`}>
      {/* Header with Toggle Button */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        {isSidebarOpen ? (
          <h1 className="text-xl font-bold">AI Notes</h1>
        ) : (
          <span className="w-8"></span> 
        )}
        <div className="flex items-center gap-2">
          <button
            onClick={handleNewNote}
            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            title="New note"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
          <button
            onClick={toggleSidebar}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-700'}`}
            title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isSidebarOpen ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Search */}
        {isSidebarOpen && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        )}

        {/* Tags */}
        {isSidebarOpen && allTags.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex items-center">
                  <TagIcon className="w-4 h-4 mr-1" />
                  Tags
                </div>
              </h2>
              {selectedTags.length > 0 && (
                <button
                  onClick={clearTags}
                  className="text-xs text-blue-500 hover:text-blue-600"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-2 py-1 rounded-full text-xs ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-500 text-white'
                      : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className={`${isSidebarOpen ? '' : 'items-center'} ${viewMode === 'grid' && isSidebarOpen ? 'grid grid-cols-2 gap-2' : 'flex flex-col space-y-2'}`}>
          {filteredNotes.length === 0 ? (
            <div className={`text-center py-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {isSidebarOpen ? 'No notes found' : ''}
            </div>
          ) : (
            filteredNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => setActiveNote(note.id)}
                className={`relative w-full p-3 rounded-lg text-left transition-colors ${
                  activeNoteId === note.id
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark'
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-200'
                } ${viewMode === 'grid' && isSidebarOpen ? 'h-24' : ''} ${!isSidebarOpen ? 'flex justify-center' : ''}`}
                style={note.color && note.color !== '#ffffff' ? {
                  backgroundColor: activeNoteId === note.id ? undefined : note.color + '40' // Add transparency
                } : {}}
              >
                {isSidebarOpen ? (
                  <div className="flex flex-col w-full">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium">
                          {note.title || 'Untitled Note'}
                        </p>
                        <p className={`text-xs truncate ${activeNoteId === note.id ? 'text-white/75' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(note.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      {note.isPinned && (
                        <MapPinIcon className={`w-4 h-4 flex-shrink-0 ${activeNoteId === note.id ? 'text-white' : 'text-blue-500'}`} />
                      )}
                    </div>
                    {/* Delete button */}
                    <button 
                      onClick={(e) => handleDeleteNote(note.id, e)}
                      className={`absolute right-2 bottom-2 p-1 rounded-full ${
                        activeNoteId === note.id 
                          ? 'bg-white/20 text-white hover:bg-white/30'
                          : theme === 'dark'
                          ? 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
                          : 'bg-gray-200/50 text-gray-500 hover:bg-gray-300/50'
                      }`}
                      title="Delete note"
                    >
                      <TrashIcon className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  // Compact view for collapsed sidebar
                  <div className="flex flex-col items-center" title={note.title || 'Untitled Note'}>
                    <div 
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        note.isPinned ? 'ring-1 ring-blue-500' : ''
                      }`}
                      style={{ backgroundColor: note.color || (theme === 'dark' ? '#374151' : '#f3f4f6') }}
                    >
                      {note.title.charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className={`flex ${isSidebarOpen ? 'justify-between' : 'justify-center'} items-center`}>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <MoonIcon className="w-5 h-5" />
            ) : (
              <SunIcon className="w-5 h-5" />
            )}
          </button>
          
          {isSidebarOpen && (
            <button
              onClick={toggleViewMode}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              title={viewMode === 'list' ? 'Switch to grid view' : 'Switch to list view'}
            >
              {viewMode === 'list' ? (
                <Squares2X2Icon className="w-5 h-5" />
              ) : (
                <ListBulletIcon className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;