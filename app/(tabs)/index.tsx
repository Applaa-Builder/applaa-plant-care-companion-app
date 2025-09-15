import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { usePlantStore } from '@/store/plant-store';
import PlantCard from '@/components/PlantCard';
import Button from '@/components/Button';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Plus, Droplets } from 'lucide-react-native';
import { plants } from '@/mocks/plants';

export default function HomeScreen() {
  const router = useRouter();
  const userPlants = usePlantStore((state) => state.userPlants);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const getPlantsNeedingWater = () => {
    return userPlants.filter(plant => {
      if (!plant.lastWatered) return false;
      
      const lastWatered = new Date(plant.lastWatered);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - lastWatered.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays >= plant.waterFrequency;
    });
  };

  const plantsNeedingWater = getPlantsNeedingWater();
  
  const getRandomSuggestions = () => {
    // Filter out plants that the user already has
    const userPlantIds = userPlants.map(p => p.id);
    const availablePlants = plants.filter(p => !userPlantIds.includes(p.id));
    
    // If user has all plants, return empty array
    if (availablePlants.length === 0) return [];
    
    // Get up to 3 random plants
    const shuffled = [...availablePlants].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {userPlants.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Welcome to PlantCare</Text>
          <Text style={styles.emptyText}>
            Start by adding plants to your collection or identify a new plant.
          </Text>
          <Button
            title="Identify a Plant"
            onPress={() => router.push('/identify')}
            style={styles.identifyButton}
            icon={<Search size={20} color="#FFFFFF" />}
          />
          <Button
            title="Browse Plants"
            onPress={() => router.push('/guide')}
            variant="outline"
            style={styles.browseButton}
          />
        </View>
      ) : (
        <>
          {plantsNeedingWater.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Plants Needing Water</Text>
                <Droplets size={20} color={Colors.primary} />
              </View>
              {plantsNeedingWater.map(plant => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Plant Collection</Text>
            <FlatList
              data={userPlants}
              renderItem={({ item }) => <PlantCard plant={item} />}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
            <Button
              title="Add New Plant"
              onPress={() => router.push('/identify')}
              style={styles.addButton}
              icon={<Plus size={20} color="#FFFFFF" />}
            />
          </View>

          {showSuggestions && getRandomSuggestions().length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Suggested Plants</Text>
              <Text style={styles.sectionSubtitle}>
                Plants that might work well in your collection
              </Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.suggestionsContainer}
              >
                {getRandomSuggestions().map(plant => (
                  <View key={plant.id} style={styles.suggestionCard}>
                    <Image 
                      source={{ uri: plant.image }} 
                      style={styles.suggestionImage}
                      contentFit="cover"
                    />
                    <View style={styles.suggestionContent}>
                      <Text style={styles.suggestionName}>{plant.name}</Text>
                      <Text style={styles.suggestionScientific} numberOfLines={1}>
                        {plant.scientificName}
                      </Text>
                      <Button
                        title="Add"
                        onPress={() => {
                          const userPlant = {
                            ...plant,
                            addedDate: new Date().toISOString(),
                          };
                          usePlantStore.getState().addPlant(userPlant);
                          setShowSuggestions(false);
                        }}
                        size="small"
                        style={styles.suggestionButton}
                      />
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

import { Image } from 'expo-image';
import { Search } from 'lucide-react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  identifyButton: {
    width: '100%',
    marginBottom: 12,
  },
  browseButton: {
    width: '100%',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
    marginRight: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: -12,
    marginBottom: 16,
  },
  addButton: {
    marginTop: 8,
  },
  suggestionsContainer: {
    paddingBottom: 8,
  },
  suggestionCard: {
    width: 160,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    overflow: 'hidden',
    marginRight: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  suggestionImage: {
    width: '100%',
    height: 120,
  },
  suggestionContent: {
    padding: 12,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  suggestionScientific: {
    fontSize: 12,
    fontStyle: 'italic',
    color: Colors.textLight,
    marginBottom: 12,
  },
  suggestionButton: {
    paddingVertical: 6,
  },
});