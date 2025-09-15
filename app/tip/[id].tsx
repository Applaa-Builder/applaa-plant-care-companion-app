import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Image } from 'expo-image';
import Colors from '@/constants/colors';
import { plantTips } from '@/mocks/tips';

export default function TipDetailScreen() {
  const { id } = useLocalSearchParams();
  const tip = plantTips.find(t => t.id === id);
  
  if (!tip) {
    return (
      <View style={styles.container}>
        <Text>Tip not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: tip.title }} />
      
      <ScrollView style={styles.container}>
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
          
          <Text style={styles.title}>{tip.title}</Text>
          
          <Text style={styles.tipContent}>
            {tip.content.split('. ').join('.\n\n')}
          </Text>
        </View>
      </ScrollView>
    </>
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
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    height: 250,
    width: '100%',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 16,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 24,
    lineHeight: 32,
  },
  tipContent: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 26,
  },
});