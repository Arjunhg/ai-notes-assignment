import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar will go here */}
      <div className="w-64 bg-white border-r border-gray-200">
        {/* Sidebar content */}
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <main className="h-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 