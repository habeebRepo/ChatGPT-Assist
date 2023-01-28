import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/SearchProducts';
import SearchResults from './components/SearchResults';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SearchProducts" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchResults} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
