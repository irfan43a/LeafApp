import type { Plant, CareReminder } from '../types/plant';
import { initialPlants } from '../data/plantsData';

const STORAGE_KEYS = {
  PLANTS: 'florapedia_custom_plants',
  BOOKMARKS: 'florapedia_bookmarks',
  REMINDERS: 'florapedia_care_reminders',
  GEMINI_API_KEY: 'florapedia_gemini_api_key',
};

// --- Plant Storage ---
export function getAllPlants(): Plant[] {
  try {
    const rawCustom = localStorage.getItem(STORAGE_KEYS.PLANTS);
    if (!rawCustom) {
      return initialPlants;
    }
    const customList: Plant[] = JSON.parse(rawCustom);
    // Combine custom with initial, making sure IDs don't collide
    const customMap = new Map(customList.map(p => [p.id, p]));

    // Custom overrides or appends
    const merged = [...customList];
    for (const initPlant of initialPlants) {
      if (!customMap.has(initPlant.id)) {
        merged.push(initPlant);
      }
    }
    return merged;
  } catch (e) {
    console.error('Failed to load plants from storage:', e);
    return initialPlants;
  }
}

export function savePlant(plant: Plant): void {
  try {
    const current = getAllPlants();
    const existingIndex = current.findIndex(p => p.id === plant.id);
    let updated: Plant[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = plant;
    } else {
      updated = [plant, ...current];
    }
    localStorage.setItem(STORAGE_KEYS.PLANTS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save plant:', e);
  }
}

export function deletePlant(id: string): void {
  try {
    const current = getAllPlants();
    const updated = current.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PLANTS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete plant:', e);
  }
}

export function resetPlantsToDefault(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.PLANTS);
  } catch (e) {
    console.error('Failed to reset plants:', e);
  }
}

// --- Bookmarks Storage ---
export function getBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return raw ? JSON.parse(raw) : ['kunyit', 'lidah-buaya', 'daun-kelor'];
  } catch (e) {
    return [];
  }
}

export function toggleBookmark(plantId: string): string[] {
  const current = getBookmarks();
  let updated: string[];
  if (current.includes(plantId)) {
    updated = current.filter(id => id !== plantId);
  } else {
    updated = [...current, plantId];
  }
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
  return updated;
}

// --- Care Reminders Storage ---
export function getCareReminders(): CareReminder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    if (!raw) {
      // Default initial reminders
      return [
        {
          id: 'rem-1',
          plantId: 'lidah-buaya',
          plantName: 'Lidah Buaya',
          plantImage: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=400&q=80',
          action: 'Siram Air',
          frequencyDays: 7,
          lastDoneDate: new Date(Date.now() - 6 * 86400000).toISOString(),
          notes: 'Siram saat tanah kering, jangan sampai tergenang di pelepah.'
        },
        {
          id: 'rem-2',
          plantId: 'jahe-merah',
          plantName: 'Jahe Merah',
          plantImage: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=400&q=80',
          action: 'Siram Air',
          frequencyDays: 2,
          lastDoneDate: new Date(Date.now() - 1 * 86400000).toISOString(),
          notes: 'Siram pagi hari agar tanah tetap gembur lembab.'
        },
        {
          id: 'rem-3',
          plantId: 'kunyit',
          plantName: 'Kunyit',
          plantImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
          action: 'Beri Pupuk',
          frequencyDays: 21,
          lastDoneDate: new Date(Date.now() - 20 * 86400000).toISOString(),
          notes: 'Beri pupuk organik cair di sekitar perakaran.'
        }
      ];
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveCareReminder(reminder: CareReminder): void {
  const current = getCareReminders();
  const existingIndex = current.findIndex(r => r.id === reminder.id);
  let updated: CareReminder[];
  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = reminder;
  } else {
    updated = [reminder, ...current];
  }
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(updated));
}

export function markReminderDone(reminderId: string): CareReminder[] {
  const current = getCareReminders();
  const updated = current.map(r => {
    if (r.id === reminderId) {
      return { ...r, lastDoneDate: new Date().toISOString() };
    }
    return r;
  });
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(updated));
  return updated;
}

export function deleteCareReminder(reminderId: string): CareReminder[] {
  const current = getCareReminders();
  const updated = current.filter(r => r.id !== reminderId);
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(updated));
  return updated;
}

// --- API Key Storage ---
export function getGeminiApiKey(): string {
  try {
    return localStorage.getItem(STORAGE_KEYS.GEMINI_API_KEY) || '';
  } catch (e) {
    return '';
  }
}

export function setGeminiApiKey(key: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.GEMINI_API_KEY, key.trim());
  } catch (e) {
    console.error('Failed to set Gemini API key:', e);
  }
}
