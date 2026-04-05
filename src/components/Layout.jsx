import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Chatbot from './Chatbot';

export default function Layout({ children, currentPage, setCurrentPage }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-primary/20 selection:text-primary">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-20 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      <div className="md:pl-72 flex flex-col min-h-screen transition-all duration-300">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-5 sm:p-8 lg:p-10 pt-24 sm:pt-28 max-w-[1400px] w-full mx-auto animate-in fade-in duration-500">
          {children}
        </main>
      </div>

      <Chatbot />
    </div>
  );
}
