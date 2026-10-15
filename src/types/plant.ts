export type PlantCategory = 
  | 'herbal' 
  | 'hias' 
  | 'sayur_buah' 
  | 'rempah' 
  | 'liar_berkhasiat';

export interface HealthBenefit {
  title: string;
  description: string;
  targetCategory: string; // e.g. 'Pencernaan', 'Imunitas', 'Anti-inflamasi', 'Jantung', 'Kulit'
}

export interface HerbalRecipe {
  title: string;
  purpose: string;
  ingredients: string[];
  steps: string[];
  dosage: string;
}

export interface CareGuide {
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan';
  sunlight: string;
  watering: string;
  soil: string;
  fertilizer: string;
  temperature: string;
  propagation: string;
  commonPests: string[];
  harvestingTips: string;
}

export interface Cautions {
  warnings: string[];
  contraindications: string[];
  maxDailyIntake?: string;
}

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  family: string;
  localNames: string[];
  category: PlantCategory;
  image: string;
  description: string;
  origin: string;
  activeCompounds: string[];
  healthBenefits: HealthBenefit[];
  usageAndRecipes: HerbalRecipe[];
  careGuide: CareGuide;
  cautions: Cautions;
  wikiSlug?: string;
  tags: string[];
  isCustom?: boolean;
  createdAt?: string;
}

export interface CareReminder {
  id: string;
  plantId: string;
  plantName: string;
  plantImage: string;
  action: 'Siram Air' | 'Beri Pupuk' | 'Jemur Matahari' | 'Pangkas Daun';
  frequencyDays: number;
  lastDoneDate: string; // ISO date string
  notes?: string;
}

export interface WikipediaSummary {
  title: string;
  extract: string;
  description?: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  originalimage?: {
    source: string;
    width: number;
    height: number;
  };
  content_urls?: {
    desktop?: {
      page: string;
    };
  };
}
