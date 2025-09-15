import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { Camera, Upload } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';
import { plants } from '@/mocks/plants';
import { useRouter } from 'expo-router';
import { usePlantStore } from '@/store/plant-store';
import { Plant } from '@/types/plant';

export default function PlantIdentifier() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [identifiedPlant, setIdentifiedPlant] = useState<Plant | null>(null);
  const router = useRouter();
  const addPlant = usePlantStore((state) => state.addPlant);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIdentifiedPlant(null);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }
    
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIdentifiedPlant(null);
    }
  };

  const identifyPlant = async () => {
    if (!image) return;
    
    setAnalyzing(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Randomly select a plant from our mock data
      const randomPlant = plants[Math.floor(Math.random() * plants.length)];
      setIdentifiedPlant(randomPlant);
      setAnalyzing(false);
    }, 2000);
  };

  const addToCollection = () => {
    if (!identifiedPlant) return;
    
    const userPlant = {
      ...identifiedPlant,
      addedDate: new Date().toISOString(),
    };
    
    addPlant(userPlant);
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
            contentFit="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Camera size={48} color={Colors.textLight} />
            <Text style={styles.placeholderText}>
              Take or upload a photo of your plant
            </Text>
          </View>
        )}
      </View>

      {!identifiedPlant ? (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={takePhoto}>
              <Camera size={24} color={Colors.primary} />
              <Text style={styles.optionText}>Take Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
              <Upload size={24} color={Colors.primary} />
              <Text style={styles.optionText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
          
          {image && (
            <Button 
              title="Identify Plant" 
              onPress={identifyPlant} 
              loading={analyzing}
              style={styles.identifyButton}
            />
          )}
        </>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Plant Identified!</Text>
          <Text style={styles.plantName}>{identifiedPlant.name}</Text>
          <Text style={styles.scientificName}>{identifiedPlant.scientificName}</Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Water</Text>
              <Text style={styles.infoValue}>Every {identifiedPlant.waterFrequency} days</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Light</Text>
              <Text style={styles.infoValue}>{formatLightRequirement(identifiedPlant.lightRequirement)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Difficulty</Text>
              <Text style={styles.infoValue}>{identifiedPlant.difficulty}</Text>
            </View>
          </View>
          
          <Button 
            title="Add to My Plants" 
            onPress={addToCollection} 
            style={styles.addButton}
          />
          
          <Button 
            title="Try Another Photo" 
            onPress={() => {
              setImage(null);
              setIdentifiedPlant(null);
            }} 
            variant="outline"
            style={styles.tryAgainButton}
          />
        </View>
      )}
    </View>
  );
}

function formatLightRequirement(light: string): string {
  switch (light) {
    case 'low':
      return 'Low Light';
    case 'medium':
      return 'Medium Light';
    case 'bright-indirect':
      return 'Bright Indirect';
    case 'direct':
      return 'Direct Sunlight';
    default:
      return light;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.divider,
    borderStyle: 'dashed',
    borderRadius: 12,
  },
  placeholderText: {
    marginTop: 16,
    color: Colors.textLight,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  optionButton: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionText: {
    marginTop: 8,
    color: Colors.text,
    fontWeight: '500',
  },
  identifyButton: {
    width: '100%',
  },
  resultContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.success,
    marginBottom: 8,
    textAlign: 'center',
  },
  plantName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  scientificName: {
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 16,
  },
  infoContainer: {
    marginVertical: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  infoLabel: {
    fontSize: 16,
    color: Colors.textLight,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: Colors.text,
  },
  addButton: {
    marginBottom: 12,
  },
  tryAgainButton: {
  },
});