import React, { useState } from 'react';
import { Search, Globe, ExternalLink, Plus, BookOpen, Loader2, Info } from 'lucide-react';
import { fetchWikipediaPlantSummary, searchWikipediaPlants } from '../services/wikipediaApi';
import type { WikiSearchResult } from '../services/wikipediaApi';
import type { Plant, WikipediaSummary } from '../types/plant';

interface WikipediaExplorerProps {
  onImportPlant: (plant: Plant) => void;
}

export const WikipediaExplorer: React.FC<WikipediaExplorerProps> = ({ onImportPlant }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<WikiSearchResult[]>([]);
  const [selectedPlantSummary, setSelectedPlantSummary] = useState<WikipediaSummary | null>(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [imported, setImported] = useState(false);

  const presets = [
    { label: 'Kelor (Moringa)', term: 'Moringa oleifera' },
    { label: 'Kunyit', term: 'Kunyit' },
    { label: 'Pegagan (Cica)', term: 'Centella asiatica' },
    { label: 'Meniran Hijau', term: 'Meniran' },
    { label: 'Tapak Dara', term: 'Catharanthus roseus' },
    { label: 'Ginkgo Biloba', term: 'Ginkgo biloba' },
    { label: 'Ginseng', term: 'Ginseng' },
    { label: 'Lidah Mertua', term: 'Sansevieria' },
    { label: 'Sirih Merah', term: 'Sirih merah' },
  ];

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setLoadingSearch(true);
    setSelectedPlantSummary(null);
    setImported(false);
    try {
      const results = await searchWikipediaPlants(searchTerm);
      setSearchResults(results);
      if (results.length > 0) {
        // Automatically fetch the top result
        handleSelectWikiPage(results[0].title);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleSelectWikiPage = async (title: string) => {
    setLoadingSummary(true);
    setImported(false);
    try {
      const data = await fetchWikipediaPlantSummary(title);
      setSelectedPlantSummary(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleConvertAndImport = () => {
    if (!selectedPlantSummary) return;

    const newPlant: Plant = {
      id: 'wiki-' + selectedPlantSummary.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now(),
      name: selectedPlantSummary.title,
      scientificName: selectedPlantSummary.description || selectedPlantSummary.title,
      family: 'Data Botani Wikipedia',
      localNames: [selectedPlantSummary.title],
      category: 'herbal',
      image: selectedPlantSummary.originalimage?.source || selectedPlantSummary.thumbnail?.source || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
      description: selectedPlantSummary.extract,
      origin: 'Berdasarkan data persebaran Wikipedia',
      activeCompounds: ['Senyawa Fitokimia Alami', 'Antioksidan'],
      healthBenefits: [
        {
          title: `Khasiat Alami ${selectedPlantSummary.title}`,
          description: selectedPlantSummary.extract.slice(0, 180) + '...',
          targetCategory: 'Kesehatan Umum'
        }
      ],
      usageAndRecipes: [
        {
          title: `Seduhan Herbal Tradisional ${selectedPlantSummary.title}`,
          purpose: 'Menjaga kebugaran dan memelihara daya tahan tubuh.',
          ingredients: [`Bagian daun/rimpang ${selectedPlantSummary.title} secukupnya`, '300 ml air bersih'],
          steps: ['Cuci bersih tanaman', 'Rebus dengan air hingga mendidih selama 10 menit', 'Saring dan minum saat hangat'],
          dosage: '1 cangkir per hari'
        }
      ],
      careGuide: {
        difficulty: 'Sedang',
        sunlight: 'Sinar matahari 4-6 jam per hari',
        watering: 'Siram 1-2 hari sekali sesuai kelembaban tanah',
        soil: 'Tanah gembur dengan drainase yang lancar',
        fertilizer: 'Pupuk kompos atau pupuk organik cair sebulan sekali',
        temperature: '20°C - 32°C',
        propagation: 'Biji atau stek batang',
        commonPests: ['Ulat daun', 'Kutu tanaman'],
        harvestingTips: 'Panen daun atau rimpang di pagi hari saat kandungan air stabil'
      },
      cautions: {
        warnings: ['Konsultasikan dengan dokter jika memiliki riwayat alergi atau komorbiditas medis.'],
        contraindications: ['Ibu hamil dan menyusui disarankan berkonsultasi terlebih dahulu.'],
        maxDailyIntake: 'Konsumsi secukupnya dalam batas wajar.'
      },
      wikiSlug: selectedPlantSummary.title,
      tags: ['Wikipedia', 'Botani Daring', 'Ensiklopedia'],
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    onImportPlant(newPlant);
    setImported(true);
  };

  return (
    <div className="space-y-6">
      {/* Intro banner */}
      <div className="bg-gradient-to-r from-sky-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-sky-300 text-xs font-semibold uppercase tracking-wider">
          <Globe className="w-4 h-4 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Koneksi Live REST API Wikipedia Botani</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-2">
          Eksplorasi Jutaan Tumbuhan di Seluruh Dunia
        </h2>
        <p className="text-sky-100/90 text-sm max-w-2xl leading-relaxed">
          Cari nama ilmiah botani atau nama lokal tanaman apa saja secara langsung melalui Wikipedia API. Anda dapat membaca informasi morfologi, taksonomi, dan langsung mengimpornya ke ensiklopedia FloraPedia Anda!
        </p>

        {/* Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
              placeholder="Ketik nama tumbuhan (misal: Ginkgo biloba, Meniran, Lavender, Sirih)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/95 text-stone-900 placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <button
            onClick={() => handleSearch(query)}
            disabled={loadingSearch}
            className="px-6 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
          >
            {loadingSearch ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Cari di Wikipedia</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-sky-200/80 mr-1">Rekomendasi Cepat:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(p.term);
                handleSearch(p.term);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-sky-100 text-xs font-medium backdrop-blur-md transition-all"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Search Results list */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-600" />
            <span>Hasil Pencarian ({searchResults.length})</span>
          </h3>

          {searchResults.length === 0 ? (
            <div className="py-12 text-center text-stone-400 text-xs space-y-2">
              <Globe className="w-8 h-8 mx-auto text-stone-300" />
              <p>Belum ada pencarian. Masukkan nama tanaman di atas atau klik rekomendasi.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {searchResults.map((item, idx) => {
                const isSelected = selectedPlantSummary?.title === item.title;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectWikiPage(item.title)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-sky-50 border-sky-300 text-sky-950 font-semibold shadow-2xs'
                        : 'bg-stone-50/50 border-stone-200/80 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <div className="text-sm font-bold">{item.title}</div>
                    <div className="text-xs text-stone-500 line-clamp-2 mt-0.5 font-normal">
                      {item.snippet}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Selected Plant Article Preview */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs">
          {loadingSummary ? (
            <div className="py-20 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-sky-600 animate-spin mx-auto" />
              <p className="text-xs text-stone-500">Mengambil data botani dari Wikipedia REST API...</p>
            </div>
          ) : selectedPlantSummary ? (
            <div className="space-y-5">
              {/* Header */}
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                {(selectedPlantSummary.originalimage?.source || selectedPlantSummary.thumbnail?.source) && (
                  <div className="w-full sm:w-48 h-44 rounded-2xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
                    <img
                      src={selectedPlantSummary.originalimage?.source || selectedPlantSummary.thumbnail?.source}
                      alt={selectedPlantSummary.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-stone-900">
                        {selectedPlantSummary.title}
                      </h3>
                      {selectedPlantSummary.description && (
                        <p className="text-xs text-stone-500 italic mt-0.5">
                          {selectedPlantSummary.description}
                        </p>
                      )}
                    </div>
                    {selectedPlantSummary.content_urls?.desktop?.page && (
                      <a
                        href={selectedPlantSummary.content_urls.desktop.page}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-sky-600 font-semibold hover:underline bg-sky-50 px-2.5 py-1 rounded-lg shrink-0"
                      >
                        Buka Asli <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Extract Text */}
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pt-2">
                    {selectedPlantSummary.extract}
                  </p>
                </div>
              </div>

              {/* Import Action Box */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-stone-500 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-sky-600" />
                  <span>Data ditarik secara live dari Wikipedia Foundation API.</span>
                </div>

                <button
                  onClick={handleConvertAndImport}
                  disabled={imported}
                  className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs ${
                    imported
                      ? 'bg-emerald-100 text-emerald-800 cursor-default'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>{imported ? '✓ Berhasil Disimpan ke Ensiklopedia' : 'Impor ke Ensiklopedia Saya'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center text-stone-400 space-y-3">
              <Globe className="w-12 h-12 mx-auto text-stone-300 stroke-[1.5]" />
              <h4 className="text-sm font-semibold text-stone-600">Pratinjau Artikel Botani</h4>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Pilih tanaman dari hasil pencarian di sebelah kiri untuk melihat ringkasan ilmiah dan mengimpornya.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
