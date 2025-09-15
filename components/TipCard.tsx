import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { PlantTip } from '@/mocks/tips';
import Colors from '@/constants/colors';

interface TipCardProps {
  tip: PlantTip;
}

export default function TipCard({ tip }: TipCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/tip/${tip.id}`);
  };

  return (
    <Pressable 
      style={styles.container} 
      onPress={handlePress}
    >
      {tip.image && (
        <Image 
          source={{ uri: tip.image }} 
          style={styles.image}
          contentFit="cover"
        />
      )}
      <View style={styles.content}>
        <View style={[styles.categoryBadge, getCategoryStyle(tip.category)]}>
          <Text style={styles.categoryText}>{formatCategory(tip.category)}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{tip.title}</Text>
        <Text style={styles.preview} numberOfLines={2}>
          {tip.content.substring(0, 80)}...
        </Text>
      </View>
    </Pressable>
  );
}

function formatCategory(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function getCategoryStyle(category: string): object {
  switch (category) {
    case 'watering':
      return { backgroundColor: Colors.secondary };
    case 'light':
      return { backgroundColor: Colors.warning };
    case 'soil':
      return { backgroundColor: Colors.primaryDark };
    case 'fertilizing':
      return { backgroundColor: Colors.primary };
    case 'propagation':
      return { backgroundColor: Colors.secondaryDark };
    case 'pests':
      return { backgroundColor: Colors.error };
    default:
      return { backgroundColor: Colors.textLight };
  }
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
    height: 140,
    width: '100%',
  },
  content: {
    padding: 16,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  preview: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
});