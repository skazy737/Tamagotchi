import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const tamagotchiImages = {
  1: require('../../assets/tama1.png'),
  2: require('../../assets/tama2.png'),
  3: require('../../assets/tama3.png'),
  4: require('../../assets/tama4.png'),
};

const TamagotchiCreation = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (selectedImage && name) {
      const newTamagotchi = {
        id: Date.now(),
        name,
        image: selectedImage,
      };
      navigation.navigate('TamagotchiList', { newTamagotchi });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Escolha seu Tamagotchi</Text>
      <View style={styles.imageContainer}>
        {Object.keys(tamagotchiImages).map((key) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.imageWrapper,
              selectedImage === tamagotchiImages[key] && styles.selectedImageWrapper,
            ]}
            onPress={() => setSelectedImage(tamagotchiImages[key])}
          >
            <Image source={tamagotchiImages[key]} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
      {selectedImage && <Image source={selectedImage} style={styles.selectedImage} />}
      <TextInput
        style={styles.input}
        placeholder="Nome do Tamagotchi"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity
        style={[styles.createButton, (!selectedImage || !name) && styles.disabledButton]}
        onPress={handleCreate}
        disabled={!selectedImage || !name}
      >
        <Text style={styles.buttonText}>Criar Tamagotchi</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e7fff5',
    padding: 16,
  },
  title: {
    fontSize: 26,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  imageWrapper: {
    width: '48%',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedImageWrapper: {
    borderColor: '#99FF99',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  selectedImage: {
    width: 140,
    height: 140,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#99FF99',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#3a5949',
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  createButton: {
    backgroundColor: '#43514A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  disabledButton: {
    backgroundColor: '#d3d3d3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TamagotchiCreation;
