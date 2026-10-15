import React, { useState } from 'react';
import { 
  X, 
  Key, 
  Globe, 
  Sparkles, 
  Check, 
  Trash2, 
  ExternalLink 
} from 'lucide-react';
import { getGeminiApiKey, setGeminiApiKey, resetPlantsToDefault } from '../services/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onResetData,
}) => {
  const [apiKey, setApiKey] = useState(getGeminiApiKey());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  if (!isOpen) return null;

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    setGeminiApiKey(apiKey);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    resetPlantsToDefault();
    onResetData();
    setShowConfirmReset(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold">Pengaturan & Integrasi API</h3>
              <p className="text-xs text-stone-300">Konfigurasi sumber data dan kecerdasan buatan</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup jendela pengaturan"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Status 1: Wikipedia REST API */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-sky-950">Wikipedia Botanical REST API</h4>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> Aktif
                </span>
              </div>
              <p className="text-xs text-sky-900 leading-relaxed">
                Terhubung langsung ke basis data ensiklopedia Wikimedia. Tidak memerlukan kunci API dan dapat mencari jutaan spesies tumbuhan di seluruh dunia.
              </p>
            </div>
          </div>

          {/* Status 2: Google Gemini API */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-emerald-950">Google Gemini AI (3.8 Flash)</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    apiKey ? 'bg-emerald-200 text-emerald-900' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {apiKey ? 'Terkonfigurasi' : 'Belum Terpasang'}
                  </span>
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Digunakan untuk konsultasi interaktif dengan "Dr. Botanika" dan pembuatan artikel tanaman otomatis secara instan.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveApiKey} className="space-y-2 pt-2 border-t border-emerald-200/80">
              <label className="block text-xs font-bold text-emerald-950 uppercase">
                Google Gemini API Key
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-emerald-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Simpan</span>
                </button>
              </div>

              {savedSuccess && (
                <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  ✓ Kunci API berhasil disimpan secara lokal di browser Anda!
                </div>
              )}

              <p className="text-[11px] text-emerald-800/80">
                Belum punya kunci? Buat kunci API gratis di{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold text-emerald-950 inline-flex items-center gap-0.5"
                >
                  Google AI Studio <ExternalLink className="w-2.5 h-2.5" />
                </a>.
              </p>
            </form>
          </div>

          {/* Reset Data Section */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <h4 className="text-xs font-bold text-stone-700 uppercase">Kelola Data Lokal</h4>
            <p className="text-xs text-stone-500">
              Jika Anda ingin mengembalikan daftar tanaman ke katalog bawaan awal (menghapus tanaman kustom atau impor).
            </p>

            {showConfirmReset ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors"
                >
                  Ya, Reset Semua
                </button>
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-200 text-stone-700 font-semibold text-xs"
                >
                  Batal
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirmReset(true)}
                className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-600 border border-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Ensiklopedia ke Standar Awal</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold transition-colors"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
