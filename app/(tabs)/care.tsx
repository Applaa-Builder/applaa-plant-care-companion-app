import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';
import { plantTips, PlantTip } from '@/mocks/tips';
import TipCard from '@/components/TipCard';
import { Droplets, Sun, Shovel, Leaf, Sprout, Bug, Info } from 'lucide-react-native';

export default function CareScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    { id: 'all', label: 'All', icon: (color: string) => <Info size={16} color={color} /> },
    { id: 'watering', label: 'Watering', icon: (color: string) => <Droplets size={16} color={color} /> },
    { id: 'light', label: 'Light', icon: (color: string) => <Sun size={16} color={color} /> },
    { id: 'soil', label: 'Soil', icon: (color: string) => <Shovel size={16} color={color} /> },
    { id: 'fertilizing', label: 'Fertilizing', icon: (color: string) => <Leaf size={16} color={color} /> },
    { id: 'propagation', label: 'Propagation', icon: (color: string) => <Sprout size={16} color={color} /> },
    { id: 'pests', label: 'Pests', icon: (color: string) => <Bug size={16} color={color} /> },
    { id: 'general', label: 'General', icon: (color: string) => <Info size={16} color={color} /> },
  ];
  
  const filteredTips = selectedCategory && selectedCategory !== 'all'
    ? plantTips.filter(tip => tip.category === selectedCategory)
    : plantTips;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {selectedCategory && selectedCategory !== 'all' 
            ? `${categories.find(c => c.id === selectedCategory)?.label} Tips` 
            : 'Plant Care Tips'}
        </Text>
        <Text style={styles.subtitle}>
          Expert advice to help your plants thrive
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
        style={styles.categoriesScrollView}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            {category.icon(selectedCategory === category.id ? '#FFFFFF' : Colors.text)}
            <Text 
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <ScrollView 
        style={styles.tipsContainer}
        contentContainerStyle={styles.tipsContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredTips.map(tip => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </ScrollView>
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
    paddingBottom: 12,
    backgroundColor: Colors.background,
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
  categoriesScrollView: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    maxHeight: 50,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: Colors.surface,
    height: 34,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginLeft: 6,
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  tipsContainer: {
    flex: 1,
  },
  tipsContent: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 32,
  },
});