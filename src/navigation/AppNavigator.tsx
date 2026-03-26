import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import ClientNavigator from './ClientNavigator';
import RestaurantNavigator from './RestaurantNavigator';
import RestaurantProfileScreen from '../screens/client/RestaurantProfileScreen';
import CartScreen from '../screens/client/CartScreen';
import BookingScreen from '../screens/client/BookingScreen';
import FavoritesScreen from '../screens/client/FavoritesScreen';
import AddressesScreen from '../screens/client/AddressesScreen';
import PaymentsScreen from '../screens/client/PaymentsScreen';
import SettingsScreen from '../screens/client/SettingsScreen';
import SupportScreen from '../screens/client/SupportScreen';
import TrackOrderScreen from '../screens/client/TrackOrderScreen';

import ChangePasswordScreen from '../screens/client/ChangePasswordScreen';
import TwoFactorAuthScreen from '../screens/client/TwoFactorAuthScreen';

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
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Addresses" component={AddressesScreen} />
        <Stack.Screen name="Payments" component={PaymentsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="TwoFactorAuth" component={TwoFactorAuthScreen} />
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
