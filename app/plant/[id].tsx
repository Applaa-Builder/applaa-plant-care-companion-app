import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Colors from '@/constants/colors';
import { plants } from '@/mocks/plants';
import { usePlantStore } from '@/store/plant-store';
import { Droplets, Sun, Thermometer, Leaf, AlertTriangle, Calendar, Edit2, Trash2 } from 'lucide-react-native';
import Button from '@/components/Button';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Plant, UserPlant } from '@/types/plant';

export default function PlantDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const userPlants = usePlantStore((state) => state.userPlants);
  const waterPlant = usePlantStore((state) => state.waterPlant);
  const fertilizePlant = usePlantStore((state) => state.fertilizePlant);
  const removePlant = usePlantStore((state) => state.removePlant);
  
  // Find plant in user's collection first, then in general plants
  const userPlant = userPlants.find(p => p.id === id);
  const generalPlant = plants.find(p => p.id === id);
  const plant = userPlant || generalPlant;
  
  const [activeTab, setActiveTab] = useState('care');
  
  if (!plant) {
    return (
      <View style={styles.container}>
        <Text>Plant not found</Text>
      </View>
    );
  }

  const handleWaterPlant = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    waterPlant(plant.id);
  };

  const handleFertilizePlant = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    fertilizePlant(plant.id);
  };

  const handleDeletePlant = () => {
    Alert.alert(
      "Remove Plant",
      `Are you sure you want to remove ${(userPlant as UserPlant)?.nickname || plant.name} from your collection?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Remove", 
          onPress: () => {
            removePlant(plant.id);
            router.back();
          },
          style: "destructive"
        }
      ]
    );
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getDaysSinceLastWatered = () => {
    if (!userPlant?.lastWatered) return null;
    
    const lastWatered = new Date(userPlant.lastWatered);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastWatered.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const getDaysSinceLastFertilized = () => {
    if (!userPlant?.lastFertilized) return null;
    
    const lastFertilized = new Date(userPlant.lastFertilized);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastFertilized.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const needsWatering = () => {
    const daysSinceLastWatered = getDaysSinceLastWatered();
    return daysSinceLastWatered !== null && daysSinceLastWatered >= plant.waterFrequency;
  };

  const needsFertilizing = () => {
    const daysSinceLastFertilized = getDaysSinceLastFertilized();
    return daysSinceLastFertilized !== null && daysSinceLastFertilized >= plant.fertilizeFrequency;
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen 
        options={{ 
          title: (userPlant as UserPlant)?.nickname || plant.name,
          headerRight: () => (
            userPlant ? (
              <TouchableOpacity onPress={handleDeletePlant} style={{ marginRight: 16 }}>
                <Trash2 size={20} color={Colors.error} />
              </TouchableOpacity>
            ) : null
          )
        }} 
      />
      
      <ScrollView style={styles.container}>
        <Image 
          source={{ uri: plant.image }} 
          style={styles.image}
          contentFit="cover"
        />
        
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{(userPlant as UserPlant)?.nickname || plant.name}</Text>
            <Text style={styles.scientificName}>{plant.scientificName}</Text>
          </View>
          
          {userPlant && (
            <TouchableOpacity style={styles.editButton}>
              <Edit2 size={18} color={Colors.primary} />
            </TouchableOpacity>
          )}
        </View>
        
        {userPlant && (
          <View style={styles.careActions}>
            <TouchableOpacity 
              style={[
                styles.careButton, 
                needsWatering() && styles.careButtonHighlighted
              ]}
              onPress={handleWaterPlant}
            >
              <Droplets 
                size={24} 
                color={needsWatering() ? '#FFFFFF' : Colors.primary} 
              />
              <Text 
                style={[
                  styles.careButtonText,
                  needsWatering() && styles.careButtonTextHighlighted
                ]}
              >
                Water
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.careButton,
                needsFertilizing() && styles.careButtonHighlighted
              ]}
              onPress={handleFertilizePlant}
            >
              <Leaf 
                size={24} 
                color={needsFertilizing() ? '#FFFFFF' : Colors.primary} 
              />
              <Text 
                style={[
                  styles.careButtonText,
                  needsFertilizing() && styles.careButtonTextHighlighted
                ]}
              >
                Fertilize
              </Text>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.tabs}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'care' && styles.activeTab]}
            onPress={() => setActiveTab('care')}
          >
            <Text 
              style={[styles.tabText, activeTab === 'care' && styles.activeTabText]}
            >
              Care Guide
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'info' && styles.activeTab]}
            onPress={() => setActiveTab('info')}
          >
            <Text 
              style={[styles.tabText, activeTab === 'info' && styles.activeTabText]}
            >
              Plant Info
            </Text>
          </TouchableOpacity>
          
          {userPlant && (
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'history' && styles.activeTab]}
              onPress={() => setActiveTab('history')}
            >
              <Text 
                style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}
              >
                History
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.content}>
          {activeTab === 'care' && (
            <>
              <View style={styles.careItem}>
                <View style={styles.careIconContainer}>
                  <Droplets size={24} color={Colors.primary} />
                </View>
                <View style={styles.careInfo}>
                  <Text style={styles.careTitle}>Watering</Text>
                  <Text style={styles.careText}>
                    Water every {plant.waterFrequency} days. Allow soil to dry slightly between waterings.
                  </Text>
                </View>
              </View>
              
              <View style={styles.careItem}>
                <View style={styles.careIconContainer}>
                  <Sun size={24} color={Colors.warning} />
                </View>
                <View style={styles.careInfo}>
                  <Text style={styles.careTitle}>Light</Text>
                  <Text style={styles.careText}>
                    {plant.lightRequirement === 'low' && 'Thrives in low light conditions. Keep away from direct sunlight.'}
                    {plant.lightRequirement === 'medium' && 'Prefers medium light. Place in a bright room but not in direct sunlight.'}
                    {plant.lightRequirement === 'bright-indirect' && 'Needs bright, indirect light. Place near a window with filtered light.'}
                    {plant.lightRequirement === 'direct' && 'Requires direct sunlight for several hours a day.'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.careItem}>
                <View style={styles.careIconContainer}>
                  <Thermometer size={24} color={Colors.secondary} />
                </View>
                <View style={styles.careInfo}>
                  <Text style={styles.careTitle}>Temperature</Text>
                  <Text style={styles.careText}>
                    Keep between {plant.temperature.min}°C and {plant.temperature.max}°C. 
                    {plant.temperature.min > 15 ? ' Avoid cold drafts.' : ''}
                  </Text>
                </View>
              </View>
              
              <View style={styles.careItem}>
                <View style={styles.careIconContainer}>
                  <Leaf size={24} color={Colors.primary} />
                </View>
                <View style={styles.careInfo}>
                  <Text style={styles.careTitle}>Fertilizing</Text>
                  <Text style={styles.careText}>
                    Fertilize every {plant.fertilizeFrequency} days during growing season (spring and summer). 
                    Reduce or stop during winter.
                  </Text>
                </View>
              </View>
              
              {plant.toxicity !== 'non-toxic' && (
                <View style={styles.careItem}>
                  <View style={styles.careIconContainer}>
                    <AlertTriangle size={24} color={Colors.error} />
                  </View>
                  <View style={styles.careInfo}>
                    <Text style={styles.careTitle}>Toxicity</Text>
                    <Text style={styles.careText}>
                      {plant.toxicity === 'mildly-toxic' && 'Mildly toxic if ingested. Keep away from pets and children.'}
                      {plant.toxicity === 'toxic' && 'Toxic if ingested. Keep away from pets and children.'}
                      {plant.toxicity === 'very-toxic' && 'Very toxic if ingested. Keep away from pets and children.'}
                    </Text>
                  </View>
                </View>
              )}
            </>
          )}
          
          {activeTab === 'info' && (
            <>
              <Text style={styles.description}>{plant.description}</Text>
              
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Difficulty Level</Text>
                <Text style={styles.infoText}>
                  {plant.difficulty === 'easy' && 'Easy - Perfect for beginners, very forgiving.'}
                  {plant.difficulty === 'moderate' && 'Moderate - Requires some attention to thrive.'}
                  {plant.difficulty === 'hard' && 'Hard - Needs specific conditions and regular care.'}
                </Text>
              </View>
              
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Propagation Methods</Text>
                <View style={styles.tagContainer}>
                  {plant.propagation.map((method, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{method}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Common Issues</Text>
                {plant.commonIssues.map((issue, index) => (
                  <View key={index} style={styles.issueItem}>
                    <Text style={styles.issueName}>{issue.name}</Text>
                    <Text style={styles.issueLabel}>Symptoms:</Text>
                    <View style={styles.bulletList}>
                      {issue.symptoms.map((symptom, i) => (
                        <View key={i} style={styles.bulletItem}>
                          <Text style={styles.bulletPoint}>•</Text>
                          <Text style={styles.bulletText}>{symptom}</Text>
                        </View>
                      ))}
                    </View>
                    <Text style={styles.issueLabel}>Solutions:</Text>
                    <View style={styles.bulletList}>
                      {issue.solutions.map((solution, i) => (
                        <View key={i} style={styles.bulletItem}>
                          <Text style={styles.bulletPoint}>•</Text>
                          <Text style={styles.bulletText}>{solution}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
              
              <View style={styles.infoSection}>
                <Text style={styles.infoTitle}>Care Tips</Text>
                <View style={styles.bulletList}>
                  {plant.tips.map((tip, index) => (
                    <View key={index} style={styles.bulletItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.bulletText}>{tip}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}
          
          {activeTab === 'history' && userPlant && (
            <>
              <View style={styles.historyItem}>
                <Calendar size={20} color={Colors.textLight} />
                <Text style={styles.historyLabel}>Added to collection:</Text>
                <Text style={styles.historyValue}>
                  {formatDate(userPlant.addedDate)}
                </Text>
              </View>
              
              <View style={styles.historyItem}>
                <Droplets size={20} color={Colors.primary} />
                <Text style={styles.historyLabel}>Last watered:</Text>
                <Text style={styles.historyValue}>
                  {userPlant.lastWatered 
                    ? `${formatDate(userPlant.lastWatered)} (${getDaysSinceLastWatered()} days ago)` 
                    : 'Never'}
                </Text>
              </View>
              
              <View style={styles.historyItem}>
                <Leaf size={20} color={Colors.primary} />
                <Text style={styles.historyLabel}>Last fertilized:</Text>
                <Text style={styles.historyValue}>
                  {userPlant.lastFertilized 
                    ? `${formatDate(userPlant.lastFertilized)} (${getDaysSinceLastFertilized()} days ago)` 
                    : 'Never'}
                </Text>
              </View>
              
              {userPlant.notes && (
                <View style={styles.notesContainer}>
                  <Text style={styles.notesTitle}>Notes</Text>
                  <Text style={styles.notesText}>{userPlant.notes}</Text>
                </View>
              )}
              
              {!userPlant.notes && (
                <Button
                  title="Add Notes"
                  variant="outline"
                  onPress={() => {}}
                  style={styles.addNotesButton}
                />
              )}
            </>
          )}
        </View>
        
        {!userPlant && (
          <Button
            title="Add to My Collection"
            onPress={() => {
              const newUserPlant = {
                ...plant,
                addedDate: new Date().toISOString(),
              };
              usePlantStore.getState().addPlant(newUserPlant);
              router.replace(`/plant/${plant.id}`);
            }}
            style={styles.addButton}
          />
        )}
      </ScrollView>
    </View>
  );
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    paddingBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  scientificName: {
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.textLight,
  },
  editButton: {
    padding: 8,
  },
  careActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  careButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  careButtonHighlighted: {
    backgroundColor: Colors.primary,
  },
  careButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  careButtonTextHighlighted: {
    color: '#FFFFFF',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textLight,
  },
  activeTabText: {
    color: Colors.primary,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  careItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  careIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  careInfo: {
    flex: 1,
  },
  careTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  careText: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: Colors.text,
  },
  issueItem: {
    marginBottom: 16,
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 8,
  },
  issueName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  issueLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textLight,
    marginBottom: 4,
    marginTop: 8,
  },
  bulletList: {
    marginLeft: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletPoint: {
    width: 16,
    fontSize: 14,
    color: Colors.primary,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: Colors.surface,
    padding: 12,
    borderRadius: 8,
  },
  historyLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginLeft: 12,
    flex: 1,
  },
  historyValue: {
    fontSize: 14,
    color: Colors.text,
  },
  notesContainer: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
  },
  addNotesButton: {
    marginTop: 16,
  },
  addButton: {
    margin: 16,
    marginTop: 0,
  },
});