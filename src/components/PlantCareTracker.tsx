import React, { useState } from 'react';
import type { CareReminder } from '../types/plant';
import { 
  Calendar, 
  Droplets, 
  Sprout, 
  Sun, 
  Scissors, 
  CheckCircle2, 
  Plus, 
  Trash2 
} from 'lucide-react';

interface PlantCareTrackerProps {
  reminders: CareReminder[];
  onMarkDone: (id: string) => void;
  onDeleteReminder: (id: string) => void;
  onAddReminder: (reminder: CareReminder) => void;
}

export const PlantCareTracker: React.FC<PlantCareTrackerProps> = ({
  reminders,
  onMarkDone,
  onDeleteReminder,
  onAddReminder,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [plantName, setPlantName] = useState('');
  const [action, setAction] = useState<CareReminder['action']>('Siram Air');
  const [frequencyDays, setFrequencyDays] = useState(2);
  const [notes, setNotes] = useState('');

  const getDueStatus = (reminder: CareReminder) => {
    const lastDate = new Date(reminder.lastDoneDate).getTime();
    const now = Date.now();
    const intervalMs = reminder.frequencyDays * 86400000;
    const nextDueDate = lastDate + intervalMs;
    const diffDays = Math.ceil((nextDueDate - now) / 86400000);

    if (diffDays < 0) {
      return { label: `Terlambat ${Math.abs(diffDays)} hari`, color: 'bg-rose-100 text-rose-800 border-rose-200', isDue: true };
    } else if (diffDays === 0) {
      return { label: 'Harus Hari Ini!', color: 'bg-amber-100 text-amber-800 border-amber-200 animate-pulse', isDue: true };
    } else {
      return { label: `${diffDays} hari lagi`, color: 'bg-emerald-100 text-emerald-800 border-emerald-200', isDue: false };
    }
  };

  const getActionIcon = (act: CareReminder['action']) => {
    switch (act) {
      case 'Siram Air':
        return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'Beri Pupuk':
        return <Sprout className="w-4 h-4 text-emerald-500" />;
      case 'Jemur Matahari':
        return <Sun className="w-4 h-4 text-amber-500" />;
      case 'Pangkas Daun':
        return <Scissors className="w-4 h-4 text-purple-500" />;
    }
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plantName.trim()) return;

    const newReminder: CareReminder = {
      id: 'rem-' + Date.now(),
      plantId: 'custom-' + Date.now(),
      plantName: plantName.trim(),
      plantImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
      action,
      frequencyDays: Number(frequencyDays),
      lastDoneDate: new Date().toISOString(),
      notes: notes.trim() || undefined,
    };

    onAddReminder(newReminder);
    setPlantName('');
    setNotes('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Calendar className="w-4 h-4" />
            <span>Plant Care Routine & Schedule</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
            Jadwal Rutin Perawatan Tumbuhan
          </h2>
          <p className="text-teal-100/90 text-sm max-w-xl mt-1 leading-relaxed">
            Pantau dan catat kapan tanaman herbal atau koleksi hijau Anda harus disiram, diberi nutrisi pupuk, atau dipangkas.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Jadwal Baru</span>
        </button>
      </div>

      {/* Add New Reminder Form Modal / Collapse */}
      {isAdding && (
        <form onSubmit={handleCreateNew} className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-4 animate-fadeIn">
          <h3 className="font-bold text-stone-900 font-serif text-base">Buat Jadwal Perawatan Baru</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Nama Tanaman</label>
              <input
                type="text"
                required
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                placeholder="Misal: Lidah Buaya, Rosemary"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Jenis Tindakan</label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Siram Air">Siram Air</option>
                <option value="Beri Pupuk">Beri Pupuk Organik</option>
                <option value="Jemur Matahari">Jemur Matahari</option>
                <option value="Pangkas Daun">Pangkas / Peremajaan Daun</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Frekuensi (Setiap Hari)</label>
              <input
                type="number"
                min="1"
                max="90"
                required
                value={frequencyDays}
                onChange={(e) => setFrequencyDays(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Catatan Tambahan (Opsional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Siram hanya tanahnya, jangan sampai daun terendam"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl text-stone-500 hover:text-stone-800 text-xs font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs"
            >
              Simpan Jadwal
            </button>
          </div>
        </form>
      )}

      {/* Reminders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reminders.map((rem) => {
          const status = getDueStatus(rem);
          return (
            <div
              key={rem.id}
              className={`bg-white rounded-3xl border p-5 shadow-xs flex flex-col justify-between transition-all ${
                status.isDue ? 'border-amber-300 ring-2 ring-amber-100' : 'border-stone-200'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rem.plantImage}
                      alt={rem.plantName}
                      className="w-12 h-12 rounded-2xl object-cover border border-stone-100 shadow-2xs"
                    />
                    <div>
                      <h4 className="font-bold text-stone-900 font-serif text-base">{rem.plantName}</h4>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                        {getActionIcon(rem.action)}
                        <span>{rem.action}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteReminder(rem.id)}
                    title="Hapus Jadwal"
                    className="p-1.5 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs my-2">
                  <span className="text-stone-500">Frekuensi:</span>
                  <span className="font-semibold text-stone-700">Setiap {rem.frequencyDays} hari</span>
                </div>

                {rem.notes && (
                  <p className="text-xs text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-100 mb-3 italic">
                    "{rem.notes}"
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${status.color}`}>
                  {status.label}
                </span>

                <button
                  onClick={() => onMarkDone(rem.id)}
                  title="Tandai Sudah Selesai Hari Ini"
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Selesai</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {reminders.length === 0 && (
        <div className="py-16 text-center text-stone-400 bg-white rounded-3xl border border-stone-200">
          <Sprout className="w-10 h-10 mx-auto text-stone-300 mb-2" />
          <p className="text-sm font-semibold text-stone-600">Belum ada jadwal perawatan</p>
          <p className="text-xs text-stone-400 mt-1">
            Klik tombol "Tambah Jadwal Baru" atau buka detail tanaman dan klik "Tambah ke Jadwal Rawat".
          </p>
        </div>
      )}
    </div>
  );
};
