import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserPlant } from '@/types/plant';

interface PlantState {
  userPlants: UserPlant[];
  addPlant: (plant: UserPlant) => void;
  removePlant: (plantId: string) => void;
  updatePlant: (plantId: string, updates: Partial<UserPlant>) => void;
  waterPlant: (plantId: string) => void;
  fertilizePlant: (plantId: string) => void;
}

export const usePlantStore = create<PlantState>()(
  persist(
    (set) => ({
      userPlants: [],
      
      addPlant: (plant) => 
        set((state) => ({
          userPlants: [...state.userPlants, plant]
        })),
      
      removePlant: (plantId) => 
        set((state) => ({
          userPlants: state.userPlants.filter(p => p.id !== plantId)
        })),
      
      updatePlant: (plantId, updates) => 
        set((state) => ({
          userPlants: state.userPlants.map(plant => 
            plant.id === plantId ? { ...plant, ...updates } : plant
          )
        })),
      
      waterPlant: (plantId) => 
        set((state) => ({
          userPlants: state.userPlants.map(plant => 
            plant.id === plantId 
              ? { ...plant, lastWatered: new Date().toISOString() } 
              : plant
          )
        })),
      
      fertilizePlant: (plantId) => 
        set((state) => ({
          userPlants: state.userPlants.map(plant => 
            plant.id === plantId 
              ? { ...plant, lastFertilized: new Date().toISOString() } 
              : plant
          )
        })),
    }),
    {
      name: 'plant-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);