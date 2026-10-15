import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import type { PlantCategory } from '../types/plant';

interface PlantFilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: PlantCategory | 'all';
  setSelectedCategory: (cat: PlantCategory | 'all') => void;
  selectedBenefitTag: string;
  setSelectedBenefitTag: (tag: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (diff: string) => void;
  totalCount: number;
}

export const PlantFilterBar: React.FC<PlantFilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedBenefitTag,
  setSelectedBenefitTag,
  selectedDifficulty,
  setSelectedDifficulty,
  totalCount,
}) => {
  const categories: Array<{ id: PlantCategory | 'all'; label: string; icon: string }> = [
    { id: 'all', label: 'Semua Koleksi', icon: '🌿' },
    { id: 'herbal', label: 'Tanaman Obat & Herbal', icon: '💊' },
    { id: 'rempah', label: 'Rempah Tradisional', icon: '🧄' },
    { id: 'sayur_buah', label: 'Sayuran & Buah Sehat', icon: '🥬' },
    { id: 'hias', label: 'Tanaman Hias & Relaksasi', icon: '🌸' },
    { id: 'liar_berkhasiat', label: 'Tumbuhan Liar Berkhasiat', icon: '🌱' },
  ];

  const benefitTags = [
    'Semua Khasiat',
    'Lambung',
    'Imunitas',
    'Pernapasan',
    'Kulit',
    'Diabetes',
    'Ginjal',
    'Kolesterol',
    'Hipertensi',
    'Rambut',
    'Relaksasi'
  ];

  const hasActiveFilters = 
    searchQuery !== '' || 
    selectedCategory !== 'all' || 
    selectedBenefitTag !== 'Semua Khasiat' || 
    selectedDifficulty !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBenefitTag('Semua Khasiat');
    setSelectedDifficulty('all');
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 p-4 sm:p-6 shadow-sm mb-8 space-y-4">
      {/* Search Input Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tanaman, nama latin (misal: Curcuma), khasiat (lambung, batuk, tensi)..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Difficulty Selector */}
        <div className="flex items-center gap-2">
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            aria-label="Filter berdasarkan tingkat kesulitan perawatan tanaman"
            className="py-3 px-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Semua Kesulitan</option>
            <option value="Mudah">Perawatan: Mudah</option>
            <option value="Sedang">Perawatan: Sedang</option>
            <option value="Tantangan">Perawatan: Tantangan</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              title="Reset Semua Filter"
              className="p-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-semibold flex items-center gap-1 transition-colors whitespace-nowrap"
            >
              <X className="w-4 h-4 text-rose-500" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-sm shadow-emerald-900/20'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Health Benefit Quick Filter Chips */}
      <div className="pt-2 border-t border-stone-100 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
        <span className="text-stone-400 font-medium flex items-center gap-1 whitespace-nowrap pl-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Khasiat:
        </span>
        {benefitTags.map((tag) => {
          const isActive = selectedBenefitTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedBenefitTag(tag)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                isActive
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold'
                  : 'bg-stone-50 text-stone-500 hover:bg-stone-100 hover:text-stone-800 border border-stone-200/60'
              }`}
            >
              {tag}
            </button>
          );
        })}

        <div className="ml-auto text-stone-400 font-medium whitespace-nowrap text-[11px] pr-1">
          Ditemukan: <span className="font-bold text-stone-700">{totalCount}</span> artikel
        </div>
      </div>
    </div>
  );
};
