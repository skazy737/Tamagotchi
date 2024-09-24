import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const GameMenu = ({ route, navigation }) => {
  const { id, name, updateFun } = route.params || {};

  if (!updateFun) {
    return (
      <View style={styles.container}>
        <Text>Função de atualização não disponível.</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/gamemenu.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Escolha um Jogo</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('GameOne', { id, updateFun })}
          >
            <Text style={styles.buttonText}>Pedra, Papel e Tesoura</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('GameTwo', { id, updateFun })}
          >
            <Text style={styles.buttonText}>Zigue-zague</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff', 
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#43514A',
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    width: '80%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center', 
    fontWeight: '500',
  },
});

export default GameMenu;
