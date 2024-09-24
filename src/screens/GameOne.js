//scr/screens/GameOne.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

const choices = [
  { name: 'Pedra', image: require('../../assets/pedra.png') },
  { name: 'Papel', image: require('../../assets/papel.png') },
  { name: 'Tesoura', image: require('../../assets/tesoura.png') },
];

const GameOne = ({ route, navigation }) => {
  const { id, name, updateFun } = route.params || {}; 

  if (typeof updateFun !== 'function') {
    console.error('updateFun não é uma função ou não foi passado corretamente');
    return (
      <View style={styles.container}>
        <Text>Informações do jogo não disponíveis.</Text>
      </View>
    );
  }

  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');

  const [wins, setWins] = useState(0); 
  const [losses, setLosses] = useState(0); 
  const [ties, setTies] = useState(0); 

  const getRandomChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const determineWinner = (user, computer) => {
    if (user.name === computer.name) {
      setTies(ties + 1); 
      return 'Empate!';
    }
    if (
      (user.name === 'Pedra' && computer.name === 'Tesoura') ||
      (user.name === 'Papel' && computer.name === 'Pedra') ||
      (user.name === 'Tesoura' && computer.name === 'Papel')
    ) {
      setWins(wins + 1); 
      return 'Você ganhou! +1 Diversão';
    }
    setLosses(losses + 1); 
    return 'Computador ganhou!';
  };

  const handleChoice = (choice) => {
    const computer = getRandomChoice();
    setUserChoice(choice);
    setComputerChoice(computer);
    const gameResult = determineWinner(choice, computer);
    setResult(gameResult);

    if (gameResult === 'Você ganhou! +1 Diversão') {
      updateFun((prevFun) => Math.min(prevFun + 1, 100));
    }
  };

  const resultTextStyle = result === 'Você ganhou! +1 Diversão' ? styles.winText : result === 'Computador ganhou!' ? styles.loseText : styles.resultText;

  return (
    <ImageBackground source={require('../../assets/gameone.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Faça sua escolha:</Text>
        <View style={styles.choicesContainer}>
          {choices.map((choice) => (
            <TouchableOpacity
              key={choice.name}
              style={styles.choiceButton}
              onPress={() => handleChoice(choice)}
            >
              <Image source={choice.image} style={styles.choiceImage} />
              <Text style={styles.choiceText}>{choice.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {computerChoice && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Escolha do computador: {computerChoice.name}</Text>
            <Text style={resultTextStyle}>Resultado: {result}</Text>
          </View>
        )}

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Vitórias: {wins}</Text>
          <Text style={styles.scoreText}>Derrotas: {losses}</Text>
          <Text style={styles.scoreText}>Empates: {ties}</Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 17,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 100, 
    color: '#333',
  },
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  choiceButton: {
    backgroundColor: '#768E82',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: 100,
    height: 110,
  },
  choiceImage: {
    width: 60,
    height: 60,
  },
  choiceText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#000',
  },
  winText: {
    fontSize: 18,
    marginVertical: 5,
    color: 'green',
  },
  loseText: {
    fontSize: 18,
    marginVertical: 5,
    color: 'red',
  },
  scoreContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#43514A',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default GameOne;
