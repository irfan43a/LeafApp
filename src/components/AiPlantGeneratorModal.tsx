import React, { useState } from 'react';
import { Sparkles, X, Loader2, CheckCircle2, AlertTriangle, ArrowRight, Settings } from 'lucide-react';
import { generatePlantArticleWithAi } from '../services/geminiApi';
import type { Plant } from '../types/plant';
import { getGeminiApiKey } from '../services/storage';

interface AiPlantGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveGeneratedPlant: (plant: Plant) => void;
  onOpenSettings: () => void;
}

export const AiPlantGeneratorModal: React.FC<AiPlantGeneratorModalProps> = ({
  isOpen,
  onClose,
  onSaveGeneratedPlant,
  onOpenSettings,
}) => {
  const [plantName, setPlantName] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedPlant, setGeneratedPlant] = useState<Plant | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const hasApiKey = !!getGeminiApiKey();

  const handleGenerate = async () => {
    if (!plantName.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setGeneratedPlant(null);

    try {
      const plant = await generatePlantArticleWithAi(plantName.trim());
      if (plant) {
        setGeneratedPlant(plant);
      }
    } catch (e: any) {
      setErrorMsg(e.message || 'Gagal menghasilkan artikel tanaman dengan AI.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!generatedPlant) return;
    onSaveGeneratedPlant(generatedPlant);
    onClose();
  };

  const examplePlants = [
    'Bunga Telang (Clitoria ternatea)',
    'Daun Sirsak (Annona muricata)',
    'Ginkgo Biloba',
    'Daun Meniran',
    'Kacip Fatimah',
    'Daun Dewa'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold">AI Botanical Article Generator</h3>
              <p className="text-xs text-emerald-200">Powered by Google Gemini 3.8 Flash</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup jendela pembuat artikel AI"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {!hasApiKey && (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> API Key Belum Dikonfigurasi
              </div>
              <p>
                Fitur ini memerlukan <strong>Google Gemini API Key</strong>. Anda dapat memperoleh kunci gratis dari Google AI Studio dan menyimpannya di menu Pengaturan.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenSettings();
                }}
                className="mt-1 px-3 py-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-950 font-semibold text-xs flex items-center gap-1 transition-colors"
              >
                <Settings className="w-3.5 h-3.5" /> Buka Pengaturan API
              </button>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Masukkan Nama Tumbuhan / Tanaman
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="Contoh: Bunga Telang, Daun Sirsak, Rosemary..."
                className="flex-1 px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={handleGenerate}
                disabled={!plantName.trim() || loading}
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-all shrink-0"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>Generate</span>
              </button>
            </div>

            {/* Examples */}
            <div className="mt-3 flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] text-stone-400 mr-1">Coba ide ini:</span>
              {examplePlants.map((ex, idx) => (
                <button
                  key={idx}
                  onClick={() => setPlantName(ex)}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 text-[11px] transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Generated Plant Preview */}
          {generatedPlant && (
            <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-200 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Artikel Berhasil Dihasilkan oleh Gemini AI
              </div>

              <div>
                <h4 className="text-xl font-serif font-bold text-stone-900">{generatedPlant.name}</h4>
                <p className="text-xs italic font-serif text-emerald-800">{generatedPlant.scientificName} • Fam. {generatedPlant.family}</p>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed">
                {generatedPlant.description}
              </p>

              <div className="pt-2 border-t border-emerald-200/60 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-bold text-stone-700">Khasiat Manusia: </span>
                  <span className="text-stone-600">{generatedPlant.healthBenefits.length} manfaat teridentifikasi</span>
                </div>
                <div>
                  <span className="font-bold text-stone-700">Perawatan: </span>
                  <span className="text-stone-600">Tingkat {generatedPlant.careGuide.difficulty}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold"
          >
            Batal
          </button>

          {generatedPlant && (
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-1.5 transition-all"
            >
              <span>Simpan ke Ensiklopedia</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
