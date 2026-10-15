import React, { useState, useEffect } from 'react';
import type { Plant, WikipediaSummary } from '../types/plant';
import { fetchWikipediaPlantSummary } from '../services/wikipediaApi';
import { 
  X, 
  Heart, 
  Sparkles, 
  Droplets, 
  Sun, 
  Layers, 
  Thermometer, 
  Sprout, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  ExternalLink, 
  CalendarPlus, 
  Share2, 
  Bug, 
  Scissors, 
  Clock,
  ShieldAlert,
  Globe
} from 'lucide-react';

interface PlantDetailModalProps {
  plant: Plant | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (plantId: string) => void;
  onAddToCareSchedule: (plant: Plant) => void;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({
  plant,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onAddToCareSchedule,
}) => {
  const [activeSection, setActiveSection] = useState<'benefits' | 'recipes' | 'care' | 'cautions' | 'wiki'>('benefits');
  const [wikiData, setWikiData] = useState<WikipediaSummary | null>(null);
  const [loadingWiki, setLoadingWiki] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!plant) return;
    setActiveSection('benefits');
    setWikiData(null);

    // Auto load Wikipedia data
    const query = plant.wikiSlug || plant.scientificName || plant.name;
    setLoadingWiki(true);
    fetchWikipediaPlantSummary(query)
      .then((res) => setWikiData(res))
      .catch((err) => console.error(err))
      .finally(() => setLoadingWiki(false));
  }, [plant]);

  if (!plant) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${plant.name} (${plant.scientificName}) - FloraPedia`,
        text: `Pelajari khasiat herbal dan cara perawatan tanaman ${plant.name} di FloraPedia!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.href} - Ensiklopedia ${plant.name}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header / Image Area */}
        <div className="relative h-64 sm:h-80 w-full shrink-0 overflow-hidden bg-stone-900">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-black/30" />

          {/* Action buttons top-right */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Bagikan Artikel"
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => onToggleBookmark(plant.id)}
              title={isBookmarked ? 'Hapus dari favorit' : 'Simpan ke favorit'}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              title="Tutup"
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Plant Title Info bottom-left */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-xs">
                {plant.category.toUpperCase().replace('_', ' ')}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-md border border-white/30 text-white">
                Famili: {plant.family}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/80 backdrop-blur-md text-white">
                Perawatan: {plant.careGuide.difficulty}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-white drop-shadow-md">
              {plant.name}
            </h1>
            <p className="text-sm sm:text-base italic text-emerald-200 font-serif drop-shadow-sm mt-0.5">
              {plant.scientificName}
            </p>

            {plant.localNames && plant.localNames.length > 0 && (
              <p className="text-xs text-stone-300 mt-1">
                <span className="font-medium text-stone-200">Nama Daerah:</span> {plant.localNames.join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-stone-50 border-b border-stone-200 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveSection('benefits')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeSection === 'benefits'
                ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Khasiat Manusia ({plant.healthBenefits.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('recipes')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeSection === 'recipes'
                ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Resep & Cara Olah ({plant.usageAndRecipes.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('care')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeSection === 'care'
                ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sprout className="w-4 h-4 text-teal-600" />
            <span>Panduan Rawat</span>
          </button>

          <button
            onClick={() => setActiveSection('cautions')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeSection === 'cautions'
                ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span>Peringatan & Keamanan</span>
          </button>

          <button
            onClick={() => setActiveSection('wiki')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeSection === 'wiki'
                ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Globe className="w-4 h-4 text-sky-600" />
            <span>Live Wikipedia API</span>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {copied && (
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-semibold text-center animate-pulse">
              Link artikel disalin ke papan klip!
            </div>
          )}

          {/* Section 1: Overview & Active Compounds */}
          <div className="bg-stone-50/80 rounded-2xl p-4 sm:p-5 border border-stone-200/80 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Morfologi & Gambaran Umum</h4>
            <p className="text-stone-700 text-sm leading-relaxed">
              {plant.description}
            </p>
            <div className="text-xs text-stone-500">
              <span className="font-semibold text-stone-700">Asal Persebaran:</span> {plant.origin}
            </div>

            {/* Active compounds tags */}
            {plant.activeCompounds && plant.activeCompounds.length > 0 && (
              <div className="pt-2 border-t border-stone-200/60">
                <div className="text-xs font-semibold text-stone-700 mb-2">Kandungan Senyawa Aktif Utama:</div>
                <div className="flex flex-wrap gap-1.5">
                  {plant.activeCompounds.map((comp, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-emerald-100/70 border border-emerald-200/70 text-emerald-900 text-xs font-medium"
                    >
                      🧪 {comp}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* TAB: HEALTH BENEFITS */}
          {activeSection === 'benefits' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  Khasiat Bagi Kesehatan Manusia
                </h3>
                <span className="text-xs text-stone-500">Berdasarkan data klinis & empiris</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plant.healthBenefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-white border border-emerald-100 shadow-2xs hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        {benefit.targetCategory}
                      </span>
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm mb-1.5">{benefit.title}</h4>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: RECIPES & PREPARATIONS */}
          {activeSection === 'recipes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  Resep Herbal Tradisional & Cara Pengolahan
                </h3>
              </div>

              {plant.usageAndRecipes.map((recipe, idx) => (
                <div key={idx} className="bg-amber-50/40 rounded-2xl p-5 border border-amber-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-stone-900 font-serif">
                      🥣 {recipe.title}
                    </h4>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {recipe.purpose}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5">Bahan-Bahan:</h5>
                    <ul className="list-disc list-inside text-xs sm:text-sm text-stone-700 space-y-1">
                      {recipe.ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1.5">Langkah Pembuatan:</h5>
                    <ol className="list-decimal list-inside text-xs sm:text-sm text-stone-700 space-y-1.5">
                      {recipe.steps.map((step, i) => (
                        <li key={i} className="pl-1 leading-relaxed">{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="pt-2 border-t border-amber-200/60 flex items-center gap-2 text-xs font-medium text-amber-950">
                    <Clock className="w-4 h-4 text-amber-700" />
                    <span><strong>Anjuran Takaran/Dosis:</strong> {recipe.dosage}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: PLANT CARE GUIDE */}
          {activeSection === 'care' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-serif text-stone-900 flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-teal-600" />
                  Panduan Lengkap Merawat Tumbuhan
                </h3>
                <button
                  onClick={() => onAddToCareSchedule(plant)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition-all"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  Tambah ke Jadwal Rawat
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase text-stone-500">Kebutuhan Cahaya Matahari</h5>
                    <p className="text-xs sm:text-sm text-stone-800 font-medium mt-0.5">{plant.careGuide.sunlight}</p>
                  </div>
                </div>

                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase text-stone-500">Frekuensi Penyiraman</h5>
                    <p className="text-xs sm:text-sm text-stone-800 font-medium mt-0.5">{plant.careGuide.watering}</p>
                  </div>
                </div>

                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-stone-200 text-stone-800 flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase text-stone-500">Media Tanam / Tanah</h5>
                    <p className="text-xs sm:text-sm text-stone-800 font-medium mt-0.5">{plant.careGuide.soil}</p>
                  </div>
                </div>

                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase text-stone-500">Pemupukan</h5>
                    <p className="text-xs sm:text-sm text-stone-800 font-medium mt-0.5">{plant.careGuide.fertilizer}</p>
                  </div>
                </div>

                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                    <Thermometer className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase text-stone-500">Suhu & Lingkungan</h5>
                    <p className="text-xs sm:text-sm text-stone-800 font-medium mt-0.5">{plant.careGuide.temperature}</p>
                  </div>
                </div>

                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-lime-100 text-lime-800 flex items-center justify-center shrink-0">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase text-stone-500">Perbanyakan / Bibit</h5>
                    <p className="text-xs sm:text-sm text-stone-800 font-medium mt-0.5">{plant.careGuide.propagation}</p>
                  </div>
                </div>
              </div>

              {/* Pests & Harvest */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
                <div className="flex items-start gap-2">
                  <Bug className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-stone-700">Hama Umum & Penyakit: </span>
                    <span className="text-xs text-stone-600">{plant.careGuide.commonPests.join(', ')}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-stone-700">Tips Pemanenan: </span>
                    <span className="text-xs text-stone-600">{plant.careGuide.harvestingTips}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CAUTIONS & SAFETY */}
          {activeSection === 'cautions' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h3 className="text-lg font-bold font-serif text-stone-900">
                  Peringatan, Efek Samping & Kontraindikasi
                </h3>
              </div>

              <div className="bg-rose-50 rounded-2xl p-5 border border-rose-200 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" /> Peringatan Medis:
                  </h4>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-rose-900 space-y-1.5">
                    {plant.cautions.warnings.map((warn, i) => (
                      <li key={i}>{warn}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 mb-2">
                    Kontraindikasi (Dilarang untuk):
                  </h4>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-rose-900 space-y-1.5">
                    {plant.cautions.contraindications.map((contra, i) => (
                      <li key={i}>{contra}</li>
                    ))}
                  </ul>
                </div>

                {plant.cautions.maxDailyIntake && (
                  <div className="pt-3 border-t border-rose-200/80 text-xs font-semibold text-rose-950">
                    ⚠️ Batas Maksimal Konsumsi Harian: {plant.cautions.maxDailyIntake}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: WIKIPEDIA API */}
          {activeSection === 'wiki' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-sky-600" />
                  <h3 className="text-lg font-bold font-serif text-stone-900">
                    Live Data dari Wikipedia Botanical API
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 font-semibold">
                  REST API Connected
                </span>
              </div>

              {loadingWiki ? (
                <div className="p-8 text-center space-y-2">
                  <div className="w-8 h-8 border-3 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-stone-500">Menghubungkan ke Wikipedia API...</p>
                </div>
              ) : wikiData ? (
                <div className="bg-sky-50/50 rounded-2xl p-5 border border-sky-200 space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    {wikiData.thumbnail && (
                      <img 
                        src={wikiData.thumbnail.source} 
                        alt={wikiData.title} 
                        className="w-full sm:w-44 h-36 object-cover rounded-xl border border-sky-200 shadow-xs"
                      />
                    )}
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold font-serif text-sky-950">
                          {wikiData.title}
                        </h4>
                        {wikiData.content_urls?.desktop?.page && (
                          <a
                            href={wikiData.content_urls.desktop.page}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:underline"
                          >
                            Buka di Wikipedia <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      {wikiData.description && (
                        <p className="text-xs text-sky-800 font-medium italic">
                          {wikiData.description}
                        </p>
                      )}
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                        {wikiData.extract}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center bg-stone-50 rounded-2xl border border-stone-200 text-stone-500 text-sm">
                  Tidak dapat menemukan halaman Wikipedia untuk "{plant.wikiSlug || plant.scientificName}". Anda dapat mencari manual di tab Eksplorasi Wikipedia API.
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>Diverifikasi oleh tim botani & jamu tradisional.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold transition-colors"
          >
            Tutup Jendela
          </button>
        </div>
      </div>
    </div>
  );
};
