import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TamagotchiDetails = ({ route, navigation }) => {
  const { id, name, image, hunger: initialHunger, sleep: initialSleep, fun: initialFun, updateAttributes } = route.params || {};

  if (id === undefined || name === undefined || image === undefined) {
    return (
      <View style={styles.container}>
        <Text>Detalhes do Tamagotchi não disponíveis.</Text>
      </View>
    );
  }

  const [hunger, setHunger] = useState(initialHunger || 50);
  const [sleep, setSleep] = useState(initialSleep || 50);
  const [fun, setFun] = useState(initialFun || 50);
  const [actionMessage, setActionMessage] = useState('');
  const [countdown, setCountdown] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isStatusFullModalVisible, setIsStatusFullModalVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHunger((prevHunger) => Math.max(prevHunger - 1, 0));
      setSleep((prevSleep) => Math.max(prevSleep - 1, 0));
      setFun((prevFun) => Math.max(prevFun - 1, 0));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hunger === 0 && sleep === 0 && fun === 0) {
      alert('Seu Tamagotchi morreu.');
      navigation.navigate('TamagotchiList', { removedTamagotchiId: id });
    } else {
      updateAttributes({ id, name, image, hunger, sleep, fun });
    }
  }, [hunger, sleep, fun, navigation, updateAttributes]);

  const startAction = (actionType) => {
    if (actionType === 'feed' && hunger === 100) {
      setActionMessage('Fome já está cheia!');
      setIsStatusFullModalVisible(true);
      return;
    }

    if (actionType === 'sleep' && sleep === 100) {
      setActionMessage('Sono já está cheio!');
      setIsStatusFullModalVisible(true);
      return;
    }

    setIsModalVisible(true);
    setCountdown(5);
    setActionMessage(`${name} está ${actionType === 'feed' ? 'comendo' : 'dormindo'}, 5 segundos restantes...`); // Fixed template literal

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setIsModalVisible(false);
          if (actionType === 'feed') {
            setHunger((prevHunger) => Math.min(prevHunger + 10, 100));
          } else {
            setSleep((prevSleep) => Math.min(prevSleep + 10, 100));
          }
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const getStatus = (hunger, sleep, fun) => {
    const total = hunger + sleep + fun;
    if (total === 0) return 'morto';
    if (total <= 50) return 'crítico';
    if (total <= 100) return 'muito triste';
    if (total <= 150) return 'triste';
    if (total <= 200) return 'ok';
    if (total <= 250) return 'bem';
    return 'muito bem';
  };

  const status = getStatus(hunger, sleep, fun);
  const statusColor =
    status === 'morto' ? '#FF0000' :
    status === 'crítico' ? '#FF8C00' :
    status === 'muito triste' ? '#FFD700' :
    status === 'triste' ? '#FFA500' :
    status === 'ok' ? '#90EE90' :
    status === 'bem' ? '#32CD32' :
    '#008000';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes de {name}</Text>
      <Image source={image} style={styles.image} />
      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text style={styles.statsLabel}>Fome:</Text>
          <Text style={styles.statsValue}>{hunger}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsLabel}>Sono:</Text>
          <Text style={styles.statsValue}>{sleep}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsLabel}>Diversão:</Text>
          <Text style={styles.statsValue}>{fun}</Text>
        </View>
      </View>
      <Text style={[styles.status, { color: statusColor }]}>Status: {status}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => startAction('feed')}>
          <Icon name="cutlery" size={24} color="#fff" />
          <Text style={styles.buttonText}>Alimentar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => startAction('sleep')}>
          <Icon name="bed" size={24} color="#fff" />
          <Text style={styles.buttonText}>Dormir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('GameMenu', { id, name, updateFun: setFun })}
        >
          <Icon name="gamepad" size={24} color="#fff" />
          <Text style={styles.buttonText}>Brincar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{actionMessage.replace('5', countdown.toString())}</Text>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isStatusFullModalVisible}
        onRequestClose={() => setIsStatusFullModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{actionMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsStatusFullModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e7fff5', 
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70, 
    marginBottom: 20,
    borderWidth: 2, 
    borderColor: '#3a5949', 
  },
  statsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  statsLabel: {
    fontSize: 18,
    borderLeftWidth: 5,
    borderLeftColor: '#A9CCBB',
    paddingLeft: 10,
    width: 120, 
    fontWeight: 'bold',
  },
  statsValue: {
    fontSize: 18,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonsContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a5949',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '80%', 
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#3a5949',
    borderRadius: 5,
    padding: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TamagotchiDetails;
