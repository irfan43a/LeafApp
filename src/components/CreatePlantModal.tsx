import React, { useState } from 'react';
import { X, Sprout, Heart, Check } from 'lucide-react';
import type { Plant, PlantCategory } from '../types/plant';

interface CreatePlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePlant: (plant: Plant) => void;
}

export const CreatePlantModal: React.FC<CreatePlantModalProps> = ({
  isOpen,
  onClose,
  onSavePlant,
}) => {
  const [name, setName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [family, setFamily] = useState('');
  const [category, setCategory] = useState<PlantCategory>('herbal');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [origin, setOrigin] = useState('');
  const [compounds, setCompounds] = useState('');
  const [benefitTitle, setBenefitTitle] = useState('');
  const [benefitDesc, setBenefitDesc] = useState('');
  const [benefitCat, setBenefitCat] = useState('Imunitas');
  
  // Care
  const [difficulty, setDifficulty] = useState<'Mudah' | 'Sedang' | 'Tantangan'>('Mudah');
  const [sunlight, setSunlight] = useState('Sinar matahari 4-6 jam');
  const [watering, setWatering] = useState('Siram 1 kali sehari');
  const [soil, setSoil] = useState('Tanah gembur kaya kompos');
  const [fertilizer, setFertilizer] = useState('Pupuk organik sebulan sekali');

  // Caution
  const [warning, setWarning] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPlant: Plant = {
      id: 'custom-' + name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now(),
      name: name.trim(),
      scientificName: scientificName.trim() || name.trim(),
      family: family.trim() || 'Botanika Tropis',
      localNames: [name.trim()],
      category,
      image: image.trim() || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
      description: description.trim() || `Tanaman ${name} yang kaya manfaat herbal dan nilai botani.`,
      origin: origin.trim() || 'Indonesia',
      activeCompounds: compounds.split(',').map(s => s.trim()).filter(Boolean),
      healthBenefits: [
        {
          title: benefitTitle.trim() || `Memelihara Kesehatan dengan ${name}`,
          description: benefitDesc.trim() || 'Membantu menjaga vitalitas tubuh dan daya tahan alami.',
          targetCategory: benefitCat
        }
      ],
      usageAndRecipes: [
        {
          title: `Rebusan Alami ${name}`,
          purpose: 'Meningkatkan kebugaran tubuh',
          ingredients: [`Bagian ${name} secukupnya`, '400 ml air'],
          steps: ['Cuci bersih bahan', 'Rebus selama 10 menit', 'Saring dan nikmati selagi hangat'],
          dosage: '1 cangkir per hari'
        }
      ],
      careGuide: {
        difficulty,
        sunlight,
        watering,
        soil,
        fertilizer,
        temperature: '22°C - 34°C',
        propagation: 'Stek batang / biji',
        commonPests: ['Ulat daun', 'Kutu putih'],
        harvestingTips: 'Panen daun segar di pagi hari'
      },
      cautions: {
        warnings: [warning.trim() || 'Konsumsi dalam batas wajar dan hindari dosis berlebih.'],
        contraindications: ['Ibu hamil sebaiknya berkonsultasi dengan tenaga medis.'],
        maxDailyIntake: '1-2 cangkir olahan per hari'
      },
      tags: ['Koleksi Pribadi', category, benefitCat],
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    onSavePlant(newPlant);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold">Tulis Artikel Tanaman Baru</h3>
              <p className="text-xs text-stone-300">Bagikan pengetahuan botani, khasiat & resep racikan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup formulir tulis artikel"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Nama Tumbuhan</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Daun Sirsak"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Nama Ilmiah (Latin)</label>
              <input
                type="text"
                value={scientificName}
                onChange={(e) => setScientificName(e.target.value)}
                placeholder="Contoh: Annona muricata"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 italic"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Famili Botani</label>
              <input
                type="text"
                value={family}
                onChange={(e) => setFamily(e.target.value)}
                placeholder="Contoh: Annonaceae"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PlantCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="herbal">Tanaman Obat & Herbal</option>
                  <option value="rempah">Rempah Tradisional</option>
                  <option value="sayur_buah">Sayuran & Buah Sehat</option>
                  <option value="hias">Tanaman Hias & Relaksasi</option>
                  <option value="liar_berkhasiat">Tumbuhan Liar Berkhasiat</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Asal Daerah / Persebaran</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Contoh: Asia Tenggara Tropis"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1">URL Foto Tanaman (Opsional)</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Deskripsi Singkat Morfologi</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi bentuk daun, bunga, batang, dan habitat aslinya..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Senyawa Aktif (Pisahkan koma)</label>
            <input
              type="text"
              value={compounds}
              onChange={(e) => setCompounds(e.target.value)}
              placeholder="Contoh: Flavonoid, Tanin, Alkaloid, Vitamin C"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Section: Khasiat */}
          <div className="pt-2 border-t border-stone-200">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-emerald-600" /> Khasiat Utama Bagi Manusia
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Judul Khasiat</label>
                <input
                  type="text"
                  value={benefitTitle}
                  onChange={(e) => setBenefitTitle(e.target.value)}
                  placeholder="Contoh: Meredakan Asam Lambung"
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Target Organ / Kategori</label>
                <input
                  type="text"
                  value={benefitCat}
                  onChange={(e) => setBenefitCat(e.target.value)}
                  placeholder="Contoh: Lambung / Imunitas / Tensi"
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-xs font-medium text-stone-600 mb-1">Penjelasan Khasiat</label>
              <textarea
                rows={2}
                value={benefitDesc}
                onChange={(e) => setBenefitDesc(e.target.value)}
                placeholder="Mekanisme kerja khasiat bagi organ tubuh manusia..."
                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Section: Care */}
          <div className="pt-2 border-t border-stone-200">
            <h4 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-teal-600" /> Panduan Perawatan Tanaman
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Tingkat Kesulitan</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                >
                  <option value="Mudah">Mudah</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Tantangan">Tantangan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Sinar Matahari</label>
                <input
                  type="text"
                  value={sunlight}
                  onChange={(e) => setSunlight(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Penyiraman</label>
                <input
                  type="text"
                  value={watering}
                  onChange={(e) => setWatering(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Media Tanam / Tanah</label>
                <input
                  type="text"
                  value={soil}
                  onChange={(e) => setSoil(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Pemupukan</label>
                <input
                  type="text"
                  value={fertilizer}
                  onChange={(e) => setFertilizer(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-200">
            <label className="block text-xs font-bold text-rose-800 uppercase mb-1">
              Peringatan Medis / Efek Samping (Opsional)
            </label>
            <input
              type="text"
              value={warning}
              onChange={(e) => setWarning(e.target.value)}
              placeholder="Contoh: Tidak dianjurkan untuk penderita darah rendah ekstrem."
              className="w-full px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Artikel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
