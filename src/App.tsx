import { useState, useEffect, useMemo } from 'react';
import type { Plant, CareReminder, PlantCategory } from './types/plant';
import { 
  getAllPlants, 
  savePlant, 
  getBookmarks, 
  toggleBookmark as toggleBookmarkStorage,
  getCareReminders,
  saveCareReminder,
  markReminderDone as markDoneStorage,
  deleteCareReminder as deleteReminderStorage 
} from './services/storage';

import { Navbar } from './components/Navbar';
import { PlantCard } from './components/PlantCard';
import { PlantFilterBar } from './components/PlantFilterBar';
import { PlantDetailModal } from './components/PlantDetailModal';
import { WikipediaExplorer } from './components/WikipediaExplorer';
import { AiBotanistChat } from './components/AiBotanistChat';
import { PlantCareTracker } from './components/PlantCareTracker';
import { CreatePlantModal } from './components/CreatePlantModal';
import { AiPlantGeneratorModal } from './components/AiPlantGeneratorModal';
import { SettingsModal } from './components/SettingsModal';

import { 
  Sparkles, 
  Globe, 
  Sprout, 
  Heart, 
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Search
} from 'lucide-react';

export function App() {
  // Main Data States
  const [plants, setPlants] = useState<Plant[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [reminders, setReminders] = useState<CareReminder[]>([]);

  // Navigation & Modal States
  const [activeTab, setActiveTab] = useState<'catalog' | 'wiki' | 'ai-chat' | 'care' | 'bookmarks'>('catalog');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAiGeneratorOpen, setIsAiGeneratorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PlantCategory | 'all'>('all');
  const [selectedBenefitTag, setSelectedBenefitTag] = useState('Semua Khasiat');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Load from local storage
  useEffect(() => {
    setPlants(getAllPlants());
    setBookmarks(getBookmarks());
    setReminders(getCareReminders());
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Bookmark Toggle
  const handleToggleBookmark = (plantId: string) => {
    const updated = toggleBookmarkStorage(plantId);
    setBookmarks(updated);
    const isNow = updated.includes(plantId);
    showToast(isNow ? '❤️ Ditambahkan ke koleksi tersimpan' : 'Dihapus dari koleksi tersimpan');
  };

  // Add to Care Schedule
  const handleAddToCareSchedule = (plant: Plant) => {
    const newRem: CareReminder = {
      id: 'rem-' + Date.now(),
      plantId: plant.id,
      plantName: plant.name,
      plantImage: plant.image,
      action: 'Siram Air',
      frequencyDays: plant.category === 'herbal' ? 2 : 3,
      lastDoneDate: new Date().toISOString(),
      notes: plant.careGuide.watering,
    };
    saveCareReminder(newRem);
    setReminders(getCareReminders());
    showToast(`🌱 ${plant.name} ditambahkan ke Jadwal Rawat!`);
  };

  // Save Plant (from manual creation, AI, or Wikipedia)
  const handleSavePlant = (plant: Plant) => {
    savePlant(plant);
    setPlants(getAllPlants());
    setSelectedPlant(plant);
    showToast(`🌿 Artikel untuk "${plant.name}" berhasil disimpan!`);
  };

  // Care Reminders Actions
  const handleMarkDone = (id: string) => {
    const updated = markDoneStorage(id);
    setReminders(updated);
    showToast('✓ Tugas perawatan selesai hari ini!');
  };

  const handleDeleteReminder = (id: string) => {
    const updated = deleteReminderStorage(id);
    setReminders(updated);
    showToast('Jadwal perawatan dihapus.');
  };

  const handleAddReminder = (reminder: CareReminder) => {
    saveCareReminder(reminder);
    setReminders(getCareReminders());
    showToast('Jadwal perawatan baru ditambahkan!');
  };

  // Filtering Logic
  const filteredPlants = useMemo(() => {
    return plants.filter((p) => {
      // If bookmarks tab active, filter by bookmarks
      if (activeTab === 'bookmarks' && !bookmarks.includes(p.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && p.careGuide.difficulty !== selectedDifficulty) {
        return false;
      }

      // Health Benefit Tag filter
      if (selectedBenefitTag !== 'Semua Khasiat') {
        const matchesTag = p.tags.some(t => t.toLowerCase().includes(selectedBenefitTag.toLowerCase()));
        const matchesBenefit = p.healthBenefits.some(b => 
          b.title.toLowerCase().includes(selectedBenefitTag.toLowerCase()) || 
          b.targetCategory.toLowerCase().includes(selectedBenefitTag.toLowerCase())
        );
        if (!matchesTag && !matchesBenefit) return false;
      }

      // Search query (name, scientificName, description, tags, activeCompounds)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSci = p.scientificName.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesTags = p.tags.some(t => t.toLowerCase().includes(q));
        const matchesCompounds = p.activeCompounds?.some(c => c.toLowerCase().includes(q));
        const matchesBenefits = p.healthBenefits.some(b => 
          b.title.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)
        );

        if (!matchesName && !matchesSci && !matchesDesc && !matchesTags && !matchesCompounds && !matchesBenefits) {
          return false;
        }
      }

      return true;
    });
  }, [plants, bookmarks, activeTab, selectedCategory, selectedDifficulty, selectedBenefitTag, searchQuery]);

  return (
    <div className="min-h-screen bg-stone-50/70 text-stone-800 flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900/90 text-white backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border border-white/10 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenAiGeneratorModal={() => setIsAiGeneratorOpen(true)}
        onOpenSettingsModal={() => setIsSettingsOpen(true)}
        bookmarkCount={bookmarks.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* TAB: CATALOG or BOOKMARKS */}
        {(activeTab === 'catalog' || activeTab === 'bookmarks') && (
          <div className="space-y-6">
            
            {/* Editorial Hero Banner (Only on Catalog) */}
            {activeTab === 'catalog' && (
              <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 via-stone-900 to-teal-950 text-white p-6 sm:p-10 shadow-lg border border-emerald-900/40">
                <div className="relative z-10 max-w-2xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ensiklopedia Herbal & Panduan Botani Nusantara</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-tight leading-tight text-stone-50">
                    Khasiat Alami Tumbuhan & Rahasia Perawatannya.
                  </h1>

                  <p className="text-stone-300 text-xs sm:text-base leading-relaxed">
                    Jelajahi ratusan artikel mendalam mengenai tanaman obat, kandungan senyawa aktif, resep olahan herbal tradisional, cara menanam dan merawat, hingga data ilmiah dari <strong>Wikipedia REST API</strong> dan <strong>Gemini AI</strong>.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab('wiki')}
                      className="px-4 py-2.5 rounded-xl bg-white text-stone-900 font-semibold text-xs sm:text-sm hover:bg-emerald-50 transition-all flex items-center gap-1.5 shadow-md"
                    >
                      <Globe className="w-4 h-4 text-sky-600" />
                      <span>Eksplorasi Wikipedia API</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('ai-chat')}
                      className="px-4 py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm border border-emerald-600 transition-all flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-300" />
                      <span>Tanya Dr. Botanika AI</span>
                    </button>

                    <button
                      onClick={() => setIsAiGeneratorOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-teal-800/80 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm border border-teal-600 transition-all flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Generate Artikel Tanaman</span>
                    </button>
                  </div>
                </div>

                {/* Decorative botanical leaf illustration background */}
                <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 pointer-events-none hidden md:flex items-center justify-center">
                  <Sprout className="w-96 h-96 text-emerald-400 stroke-[1]" />
                </div>
              </section>
            )}

            {/* Bookmarks Header Banner */}
            {activeTab === 'bookmarks' && (
              <div className="p-6 rounded-3xl bg-rose-50/60 border border-rose-200/80 mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-rose-950 flex items-center gap-2">
                    <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
                    Koleksi Tanaman Favorit Saya
                  </h2>
                  <p className="text-xs sm:text-sm text-rose-800 mt-1">
                    Daftar artikel tanaman dan resep herbal yang Anda simpan untuk referensi cepat.
                  </p>
                </div>
                <span className="px-3.5 py-1.5 rounded-xl bg-rose-200 text-rose-900 font-bold text-xs sm:text-sm">
                  {bookmarks.length} Tanaman
                </span>
              </div>
            )}

            {/* Filter Bar */}
            <PlantFilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBenefitTag={selectedBenefitTag}
              setSelectedBenefitTag={setSelectedBenefitTag}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              totalCount={filteredPlants.length}
            />

            {/* Plants Grid */}
            {filteredPlants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredPlants.map((plant) => (
                  <PlantCard
                    key={plant.id}
                    plant={plant}
                    isBookmarked={bookmarks.includes(plant.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onSelectPlant={(p) => setSelectedPlant(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white rounded-3xl border border-stone-200/80 p-8 space-y-3">
                <Search className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="text-lg font-bold text-stone-700">Tidak ada tanaman yang cocok</h3>
                <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
                  Cobalah kata kunci pencarian yang berbeda, atur ulang filter, atau gunakan fitur pencarian daring <strong>Wikipedia API</strong> untuk mencari spesies ini.
                </p>
                <div className="pt-2 flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedBenefitTag('Semua Khasiat');
                      setSelectedDifficulty('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700"
                  >
                    Reset Filter
                  </button>
                  <button
                    onClick={() => setActiveTab('wiki')}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-xs font-semibold text-white flex items-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Cari di Wikipedia</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: WIKIPEDIA API EXPLORER */}
        {activeTab === 'wiki' && (
          <WikipediaExplorer
            onImportPlant={(p) => {
              handleSavePlant(p);
              setSelectedPlant(p);
            }}
          />
        )}

        {/* TAB: AI BOTANIST CHAT */}
        {activeTab === 'ai-chat' && (
          <AiBotanistChat onOpenSettings={() => setIsSettingsOpen(true)} />
        )}

        {/* TAB: CARE TRACKER */}
        {activeTab === 'care' && (
          <PlantCareTracker
            reminders={reminders}
            onMarkDone={handleMarkDone}
            onDeleteReminder={handleDeleteReminder}
            onAddReminder={handleAddReminder}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-800 text-sm">FloraPedia</span>
            <span>• Ensiklopedia Tanaman & Khasiat Herbal Manusia</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4" /> Divalidasi data botani & literatur empiris
            </span>
            <span>Didukung Wikipedia REST API & Google Gemini AI</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PlantDetailModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
        isBookmarked={selectedPlant ? bookmarks.includes(selectedPlant.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onAddToCareSchedule={handleAddToCareSchedule}
      />

      <CreatePlantModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSavePlant={handleSavePlant}
      />

      <AiPlantGeneratorModal
        isOpen={isAiGeneratorOpen}
        onClose={() => setIsAiGeneratorOpen(false)}
        onSaveGeneratedPlant={handleSavePlant}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onResetData={() => {
          setPlants(getAllPlants());
          setBookmarks(getBookmarks());
          showToast('Data ensiklopedia berhasil direset ke katalog default.');
        }}
      />
    </div>
  );
}
export default App;
