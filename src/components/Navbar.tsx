import React from 'react';
import { 
  BookOpen, 
  Globe, 
  MessageSquare, 
  Calendar, 
  Bookmark, 
  Plus, 
  Sparkles, 
  Settings, 
  Leaf
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'catalog' | 'wiki' | 'ai-chat' | 'care' | 'bookmarks';
  setActiveTab: (tab: 'catalog' | 'wiki' | 'ai-chat' | 'care' | 'bookmarks') => void;
  onOpenCreateModal: () => void;
  onOpenAiGeneratorModal: () => void;
  onOpenSettingsModal: () => void;
  bookmarkCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCreateModal,
  onOpenAiGeneratorModal,
  onOpenSettingsModal,
  bookmarkCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('catalog')}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors">
                  FloraPedia
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  Nusantara
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">
                Ensiklopedia Tanaman, Khasiat Herbal & Panduan Rawat
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-100/80 p-1.5 rounded-2xl border border-stone-200/60">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'catalog'
                  ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Ensiklopedia</span>
            </button>

            <button
              onClick={() => setActiveTab('wiki')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'wiki'
                  ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <Globe className="w-4 h-4 text-sky-600" />
              <span>Live Wiki API</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-chat')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'ai-chat'
                  ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Tanya AI Herbalis</span>
            </button>

            <button
              onClick={() => setActiveTab('care')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'care'
                  ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Jadwal Rawat</span>
            </button>

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all relative ${
                activeTab === 'bookmarks'
                  ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <Bookmark className="w-4 h-4 text-rose-500" />
              <span>Tersimpan</span>
              {bookmarkCount > 0 && (
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-rose-500 text-white text-[11px] font-bold">
                  {bookmarkCount}
                </span>
              )}
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAiGeneratorModal}
              title="Buat Artikel Tanaman Baru Otomatis dengan AI"
              className="flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-medium rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-xs transition-all transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">AI Generator</span>
            </button>

            <button
              onClick={onOpenCreateModal}
              title="Tulis Artikel Tanaman Baru Manual"
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4 text-emerald-700" />
              <span className="hidden lg:inline">Tulis Artikel</span>
            </button>

            <button
              onClick={onOpenSettingsModal}
              title="Pengaturan API & Info"
              aria-label="Pengaturan API dan Info Aplikasi"
              className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-stone-100 scrollbar-none">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'catalog' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Ensiklopedia
          </button>
          <button
            onClick={() => setActiveTab('wiki')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'wiki' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Wiki API
          </button>
          <button
            onClick={() => setActiveTab('ai-chat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'ai-chat' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Tanya AI
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'care' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Jadwal Rawat
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'bookmarks' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            Favorit ({bookmarkCount})
          </button>
        </div>

      </div>
    </header>
  );
};
