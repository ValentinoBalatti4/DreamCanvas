import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import HomeScreen from './screens/HomeScreen';
import WallpaperGrid from './screens/WallpaperGrid';
import WallpaperScreen from './screens/WallpaperScreen';

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator   screenOptions={{headerShown: false}}>
        <Stack.Screen name='home' component={HomeScreen}/>
        <Stack.Screen name='wallpaperGrid' component={WallpaperGrid}/>
        <Stack.Screen name='wallpaperVisualizer' component={WallpaperScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

