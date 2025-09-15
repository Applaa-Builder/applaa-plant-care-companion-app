export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  description: string;
  waterFrequency: number; // days between watering
  lightRequirement: LightRequirement;
  humidity: HumidityLevel;
  temperature: {
    min: number; // in Celsius
    max: number; // in Celsius
  };
  fertilizeFrequency: number; // days between fertilizing
  difficulty: 'easy' | 'moderate' | 'hard';
  toxicity: Toxicity;
  propagation: string[];
  commonIssues: Issue[];
  tips: string[];
}

export type LightRequirement = 'low' | 'medium' | 'bright-indirect' | 'direct';
export type HumidityLevel = 'low' | 'medium' | 'high';
export type Toxicity = 'non-toxic' | 'mildly-toxic' | 'toxic' | 'very-toxic';

export interface Issue {
  name: string;
  symptoms: string[];
  solutions: string[];
}

export interface UserPlant extends Plant {
  nickname?: string;
  addedDate: string;
  lastWatered?: string;
  lastFertilized?: string;
  notes?: string;
  healthStatus?: 'healthy' | 'needs-attention' | 'unhealthy';
}

export interface PlantCareSchedule {
  plantId: string;
  wateringDates: string[];
  fertilizingDates: string[];
  repottingDates: string[];
}