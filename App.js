// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TamagotchiCreation from './src/screens/TamagotchiCreation';
import TamagotchiList from './src/screens/TamagotchiList';
import TamagotchiDetails from './src/screens/TamagotchiDetails';
import GameMenu from './src/screens/GameMenu';
import GameOne from './src/screens/GameOne';
import GameTwo from './src/screens/GameTwo/GameScreen';
import StartScreen from './src/screens/StartScreen'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen 
          name="StartScreen" 
          component={StartScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="TamagotchiCreation" 
          component={TamagotchiCreation}
          options={{
            title: 'My Tamagotchi',
            headerStyle: { backgroundColor: '#3a5949' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          }}
        />
        <Stack.Screen 
  name="TamagotchiList" 
  component={TamagotchiList}
  options={{
    title: 'Tamagotchi',
    headerStyle: { backgroundColor: '#3a5949' },
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
    headerLeft: null, 
  }}
/>

        <Stack.Screen 
          name="TamagotchiDetails" 
          component={TamagotchiDetails}
          options={{
            title: 'Tamagotchi',
            headerStyle: { backgroundColor: '#3a5949' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          }}
        />
        <Stack.Screen 
          name="GameMenu" 
          component={GameMenu}
          options={{
            title: 'Tamagotchi',
            headerStyle: { backgroundColor: '#3a5949' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          }}
        />
        <Stack.Screen 
          name="GameOne" 
          component={GameOne}
          options={{
            title: 'Tamagotchi',
            headerStyle: { backgroundColor: '#3a5949' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          }}
        />
        <Stack.Screen 
          name="GameTwo" 
          component={GameTwo}
          options={{
            title: 'Tamagotchi',
            headerStyle: { backgroundColor: '#3a5949' },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
