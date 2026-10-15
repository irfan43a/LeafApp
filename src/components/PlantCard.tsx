import React from 'react';
import type { Plant } from '../types/plant';
import { Heart, Droplets, Sparkles } from 'lucide-react';

interface PlantCardProps {
  plant: Plant;
  isBookmarked: boolean;
  onToggleBookmark: (plantId: string) => void;
  onSelectPlant: (plant: Plant) => void;
}

export const PlantCard: React.FC<PlantCardProps> = ({
  plant,
  isBookmarked,
  onToggleBookmark,
  onSelectPlant,
}) => {
  const getCategoryLabel = (cat: Plant['category']) => {
    switch (cat) {
      case 'herbal':
        return { label: 'Tanaman Obat', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'hias':
        return { label: 'Tanaman Hias', color: 'bg-purple-100 text-purple-800 border-purple-200' };
      case 'sayur_buah':
        return { label: 'Sayur & Buah', color: 'bg-lime-100 text-lime-800 border-lime-200' };
      case 'rempah':
        return { label: 'Rempah Dapur', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'liar_berkhasiat':
        return { label: 'Tumbuhan Liar', color: 'bg-teal-100 text-teal-800 border-teal-200' };
      default:
        return { label: 'Botanika', color: 'bg-stone-100 text-stone-800 border-stone-200' };
    }
  };

  const categoryInfo = getCategoryLabel(plant.category);

  return (
    <article 
      onClick={() => onSelectPlant(plant)}
      className="group relative bg-white rounded-2xl sm:rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      {/* Image Banner */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            // Fallback image if unsplash link expires
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border backdrop-blur-md shadow-xs ${categoryInfo.color}`}>
            {categoryInfo.label}
          </span>
          {plant.isCustom && (
            <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-indigo-600 text-white shadow-xs">
              AI / Custom
            </span>
          )}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(plant.id);
          }}
          title={isBookmarked ? 'Hapus dari favorit' : 'Simpan ke favorit'}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-700 hover:text-rose-500 hover:bg-white shadow-md transition-all active:scale-90"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isBookmarked ? 'fill-rose-500 text-rose-500' : 'text-stone-600'
            }`}
          />
        </button>

        {/* Difficulty Pill */}
        <div className="absolute bottom-3 left-3 text-white text-xs flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 font-medium">
            Perawatan: {plant.careGuide.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header titles */}
          <div className="mb-2">
            <h3 className="text-lg sm:text-xl font-bold font-serif text-stone-900 group-hover:text-emerald-700 transition-colors">
              {plant.name}
            </h3>
            <p className="text-xs sm:text-sm italic font-serif text-emerald-800/80 font-medium">
              {plant.scientificName} <span className="not-italic text-stone-400 font-sans text-xs">• Fam. {plant.family}</span>
            </p>
          </div>

          {/* Description snippet */}
          <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
            {plant.description}
          </p>

          {/* Key health benefit highlight */}
          {plant.healthBenefits.length > 0 && (
            <div className="bg-emerald-50/60 rounded-xl p-2.5 border border-emerald-100/80 mb-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Khasiat Utama:</span>
              </div>
              <p className="text-xs text-stone-700 line-clamp-1 font-medium">
                {plant.healthBenefits[0].title}
              </p>
            </div>
          )}

          {/* Quick tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {plant.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-stone-100 text-stone-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer info: Care summary */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5 text-blue-500" />
            <span className="truncate max-w-[150px]">{plant.careGuide.watering.split('.')[0]}</span>
          </div>
          <span className="font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
            Lihat Detail &rarr;
          </span>
        </div>
      </div>
    </article>
  );
};
