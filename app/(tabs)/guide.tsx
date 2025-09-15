import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Image } from 'expo-image';
import Colors from '@/constants/colors';
import { plants } from '@/mocks/plants';
import { useRouter } from 'expo-router';
import { usePlantStore } from '@/store/plant-store';
import { Droplets, Sun, Leaf, Search, Grid, List } from 'lucide-react-native';
import { Plant, LightRequirement } from '@/types/plant';

export default function GuideScreen() {
  const router = useRouter();
  const addPlant = usePlantStore((state) => state.addPlant);
  const userPlants = usePlantStore((state) => state.userPlants);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  
  const handleAddPlant = (plant: Plant) => {
    const userPlant = {
      ...plant,
      addedDate: new Date().toISOString(),
    };
    addPlant(userPlant);
    router.push('/');
  };

  const getDifficultyColor = (difficulty: 'easy' | 'moderate' | 'hard') => {
    switch (difficulty) {
      case 'easy':
        return Colors.primary;
      case 'moderate':
        return Colors.warning;
      case 'hard':
        return Colors.error;
      default:
        return Colors.textLight;
    }
  };

  const isPlantInCollection = (plantId: string) => {
    return userPlants.some(p => p.id === plantId);
  };

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !selectedDifficulty || plant.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const renderGridItem = ({ item: plant }: { item: Plant }) => (
    <TouchableOpacity 
      style={styles.gridCard}
      onPress={() => router.push(`/plant/${plant.id}`)}
    >
      <Image 
        source={{ uri: plant.image }} 
        style={styles.gridImage}
        contentFit="cover"
      />
      <View style={styles.gridContent}>
        <Text style={styles.gridName} numberOfLines={1}>{plant.name}</Text>
        <Text style={styles.gridScientific} numberOfLines={1}>{plant.scientificName}</Text>
        
        <View style={styles.gridStats}>
          <View style={styles.gridStat}>
            <Droplets size={12} color={Colors.primary} />
            <Text style={styles.gridStatText}>{plant.waterFrequency}d</Text>
          </View>
          <View style={styles.gridStat}>
            <Sun size={12} color={Colors.warning} />
            <Text style={styles.gridStatText}>{plant.lightRequirement.split('-')[0]}</Text>
          </View>
          <View style={styles.gridStat}>
            <Leaf size={12} color={getDifficultyColor(plant.difficulty)} />
            <Text style={styles.gridStatText}>{plant.difficulty}</Text>
          </View>
        </View>

        {isPlantInCollection(plant.id) ? (
          <View style={styles.inCollectionBadge}>
            <Text style={styles.inCollectionText}>In Collection</Text>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.addToCollectionButton}
            onPress={(e) => {
              e.stopPropagation();
              handleAddPlant(plant);
            }}
          >
            <Text style={styles.addToCollectionText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderListItem = ({ item: plant }: { item: Plant }) => (
    <TouchableOpacity 
      style={styles.listCard}
      onPress={() => router.push(`/plant/${plant.id}`)}
    >
      <Image 
        source={{ uri: plant.image }} 
        style={styles.listImage}
        contentFit="cover"
      />
      <View style={styles.listContent}>
        <Text style={styles.listName}>{plant.name}</Text>
        <Text style={styles.listScientific}>{plant.scientificName}</Text>
        <Text style={styles.listDescription} numberOfLines={2}>
          {plant.description}
        </Text>
        
        <View style={styles.listStats}>
          <View style={styles.listStat}>
            <Droplets size={14} color={Colors.primary} />
            <Text style={styles.listStatText}>Every {plant.waterFrequency} days</Text>
          </View>
          <View style={styles.listStat}>
            <Sun size={14} color={Colors.warning} />
            <Text style={styles.listStatText}>{plant.lightRequirement.replace('-', ' ')}</Text>
          </View>
          <View style={styles.listStat}>
            <Leaf size={14} color={getDifficultyColor(plant.difficulty)} />
            <Text style={styles.listStatText}>{plant.difficulty}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.listActions}>
        {isPlantInCollection(plant.id) ? (
          <View style={styles.inCollectionBadge}>
            <Text style={styles.inCollectionText}>✓</Text>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.addToCollectionButton}
            onPress={(e) => {
              e.stopPropagation();
              handleAddPlant(plant);
            }}
          >
            <Text style={styles.addToCollectionText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Plant Directory</Text>
        <Text style={styles.subtitle}>
          Browse {plants.length} popular houseplants
        </Text>
      </View>

      <View style={styles.controls}>
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            <TouchableOpacity
              style={[styles.filterButton, !selectedDifficulty && styles.filterButtonActive]}
              onPress={() => setSelectedDifficulty(null)}
            >
              <Text style={[styles.filterText, !selectedDifficulty && styles.filterTextActive]}>
                All
              </Text>
            </TouchableOpacity>
            
            {['easy', 'moderate', 'hard'].map(difficulty => (
              <TouchableOpacity
                key={difficulty}
                style={[styles.filterButton, selectedDifficulty === difficulty && styles.filterButtonActive]}
                onPress={() => setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty)}
              >
                <Text style={[styles.filterText, selectedDifficulty === difficulty && styles.filterTextActive]}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[styles.viewButton, viewMode === 'grid' && styles.viewButtonActive]}
            onPress={() => setViewMode('grid')}
          >
            <Grid size={18} color={viewMode === 'grid' ? '#FFFFFF' : Colors.textLight} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewButton, viewMode === 'list' && styles.viewButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <List size={18} color={viewMode === 'list' ? '#FFFFFF' : Colors.textLight} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredPlants}
        renderItem={viewMode === 'grid' ? renderGridItem : renderListItem}
        keyExtractor={item => item.id}
        numColumns={viewMode === 'grid' ? 2 : 1}
        key={viewMode} // Force re-render when view mode changes
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textLight,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  filterContainer: {
    flex: 1,
  },
  filterScrollContent: {
    paddingRight: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 2,
  },
  viewButton: {
    padding: 8,
    borderRadius: 6,
  },
  viewButtonActive: {
    backgroundColor: Colors.primary,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  // Grid styles
  gridCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    margin: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  gridImage: {
    height: 120,
    width: '100%',
  },
  gridContent: {
    padding: 12,
  },
  gridName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  gridScientific: {
    fontSize: 11,
    fontStyle: 'italic',
    color: Colors.textLight,
    marginBottom: 8,
  },
  gridStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  gridStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridStatText: {
    fontSize: 10,
    color: Colors.textLight,
    marginLeft: 2,
  },
  // List styles
  listCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  listImage: {
    width: 80,
    height: 80,
  },
  listContent: {
    flex: 1,
    padding: 12,
  },
  listName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  listScientific: {
    fontSize: 12,
    fontStyle: 'italic',
    color: Colors.textLight,
    marginBottom: 4,
  },
  listDescription: {
    fontSize: 12,
    color: Colors.text,
    lineHeight: 16,
    marginBottom: 8,
  },
  listStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 2,
  },
  listStatText: {
    fontSize: 11,
    color: Colors.textLight,
    marginLeft: 4,
  },
  listActions: {
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  // Shared styles
  inCollectionBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  inCollectionText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  addToCollectionButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  addToCollectionText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
});