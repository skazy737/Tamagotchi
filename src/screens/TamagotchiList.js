import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const TamagotchiList = ({ route, navigation }) => {
  const [tamagotchis, setTamagotchis] = useState([]);

  useEffect(() => {
    if (route.params?.newTamagotchi) {
      setTamagotchis((prevList) => [...prevList, route.params.newTamagotchi]);
    }
  }, [route.params?.newTamagotchi]);

  useEffect(() => {
    if (route.params?.removedTamagotchiId) {
      setTamagotchis((prevList) =>
        prevList.filter((t) => t.id !== route.params.removedTamagotchiId)
      );
    }
  }, [route.params?.removedTamagotchiId]);

  const handleSelectTamagotchi = (selectedTamagotchi) => {
    navigation.navigate('TamagotchiDetails', {
      ...selectedTamagotchi,
      updateAttributes: (updatedTamagotchi) => {
        setTamagotchis((prevList) =>
          prevList.map((t) => (t.id === updatedTamagotchi.id ? updatedTamagotchi : t))
        );
      },
    });
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

  const renderItem = ({ item }) => {
    const status = item.hunger !== undefined && item.sleep !== undefined && item.fun !== undefined
      ? getStatus(item.hunger, item.sleep, item.fun)
      : '?';

    return (
      <TouchableOpacity onPress={() => handleSelectTamagotchi(item)} style={styles.item}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemAttribute}>Fome: {item.hunger !== undefined ? item.hunger : '?'}</Text>
          <Text style={styles.itemAttribute}>Sono: {item.sleep !== undefined ? item.sleep : '?'}</Text>
          <Text style={styles.itemAttribute}>Diversão: {item.fun !== undefined ? item.fun : '?'}</Text>
          <Text style={styles.itemStatus}>Status: {status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tamagotchis</Text>
      {tamagotchis.length === 0 ? (
        <View style={styles.emptyContainer}>
          <TouchableOpacity
            style={[styles.createButton, styles.createButtonHighlight]}
            onPress={() => navigation.navigate('TamagotchiCreation')}
          >
            <Text style={styles.createButtonText}>Criar Novo Tamagotchi</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={tamagotchis}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('TamagotchiCreation')}
          >
            <Text style={styles.createButtonText}>Criar Novo Tamagotchi</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7fff5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ACC5B9',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#3a5949',
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
  },
  itemAttribute: {
    fontSize: 16,
    color: '#000',
  },
  itemStatus: {
    fontSize: 16,
    color: '#000', 
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#3a5949',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createButtonHighlight: {
    backgroundColor: '#3a5949',
    marginTop: 20,
    width: '80%',
  },
});

export default TamagotchiList;
