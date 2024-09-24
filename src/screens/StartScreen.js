// src/screens/StartScreen.js
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

const StartScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../assets/home.gif')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('TamagotchiList')}
        >
          <Text style={styles.buttonText}>Iniciar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  startButton: {
    backgroundColor: '#3a5949', 
    padding: 15, 
    borderRadius: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 9, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 20, 
    fontWeight: 'bold', 
  },
});

export default StartScreen;
