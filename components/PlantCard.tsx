import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { UserPlant } from '@/types/plant';
import Colors from '@/constants/colors';
import { Droplets, AlertCircle } from 'lucide-react-native';

interface PlantCardProps {
  plant: UserPlant;
  compact?: boolean;
}

export default function PlantCard({ plant, compact = false }: PlantCardProps) {
  const router = useRouter();
  
  const getDaysSinceLastWatered = () => {
    if (!plant.lastWatered) return null;
    
    const lastWatered = new Date(plant.lastWatered);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastWatered.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const needsWatering = () => {
    const daysSinceLastWatered = getDaysSinceLastWatered();
    return daysSinceLastWatered !== null && daysSinceLastWatered >= plant.waterFrequency;
  };

  const handlePress = () => {
    router.push(`/plant/${plant.id}`);
  };

  if (compact) {
    return (
      <Pressable 
        style={styles.compactContainer} 
        onPress={handlePress}
      >
        <Image 
          source={{ uri: plant.image }} 
          style={styles.compactImage}
          contentFit="cover"
        />
        <View style={styles.compactContent}>
          <Text style={styles.compactName} numberOfLines={1}>
            {plant.nickname || plant.name}
          </Text>
          {needsWatering() && (
            <View style={styles.waterIndicator}>
              <Droplets size={14} color={Colors.primary} />
            </View>
          )}
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable 
      style={styles.container} 
      onPress={handlePress}
    >
      <Image 
        source={{ uri: plant.image }} 
        style={styles.image}
        contentFit="cover"
      />
      <View style={styles.content}>
        <Text style={styles.name}>{plant.nickname || plant.name}</Text>
        <Text style={styles.scientificName}>{plant.scientificName}</Text>
        
        <View style={styles.statusContainer}>
          {plant.lastWatered ? (
            <View style={styles.statusItem}>
              <Droplets size={16} color={needsWatering() ? Colors.error : Colors.primary} />
              <Text style={styles.statusText}>
                {needsWatering() 
                  ? `Needs water (${getDaysSinceLastWatered()} days)` 
                  : `Watered ${getDaysSinceLastWatered()} days ago`}
              </Text>
            </View>
          ) : (
            <View style={styles.statusItem}>
              <AlertCircle size={16} color={Colors.warning} />
              <Text style={styles.statusText}>Set watering schedule</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    height: 160,
    width: '100%',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  scientificName: {
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.textLight,
    marginBottom: 12,
  },
  statusContainer: {
    marginTop: 8,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    color: Colors.textLight,
    marginLeft: 8,
  },
  compactContainer: {
    width: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: Colors.surface,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  compactImage: {
    height: 120,
    width: '100%',
  },
  compactContent: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  compactName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    flex: 1,
  },
  waterIndicator: {
    marginLeft: 4,
  },
});