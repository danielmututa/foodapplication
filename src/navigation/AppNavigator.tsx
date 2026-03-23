import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import ClientNavigator from './ClientNavigator';
import RestaurantNavigator from './RestaurantNavigator';
import RestaurantProfileScreen from '../screens/client/RestaurantProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated, userRole } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated && userRole === 'restaurant') {
    return (
      <NavigationContainer>
        <RestaurantNavigator />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ClientRoot" component={ClientNavigator} />
        <Stack.Screen name="RestaurantProfile" component={RestaurantProfileScreen} />
        {!isAuthenticated && (
          <Stack.Screen 
            name="AuthModal" 
            component={AuthNavigator} 
            options={{ presentation: 'modal' }} 
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
