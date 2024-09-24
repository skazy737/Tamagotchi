//src/screens/FeedSleepScreen
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const FeedSleepScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Alimentar ou Dormir</Text>
      <Button title="Alimentar" onPress={() => {}} />
      <Button title="Dormir" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeedSleepScreen;
