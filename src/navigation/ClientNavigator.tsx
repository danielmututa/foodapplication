import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/client/HomeScreen';
import SearchScreen from '../screens/client/SearchScreen';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import type { RootState } from '../store';

const Tab = createBottomTabNavigator();

// Temporary mock screens
const OrdersScreen = () => <View className="flex-1 items-center justify-center bg-white"><Text className="text-xl font-bold">Orders Screen</Text></View>;
const ProfileScreen = () => <View className="flex-1 items-center justify-center bg-white"><Text className="text-xl font-bold">Profile Screen</Text></View>;

export default function ClientNavigator() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation<any>();

  // Require Auth for specific tabs
  const requireAuth = (e: any) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigation.navigate('AuthModal');
    }
  };

  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'home';
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Orders') iconName = focused ? 'receipt' : 'receipt-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen 
        name="Orders" 
        component={OrdersScreen} 
        listeners={{ tabPress: requireAuth }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        listeners={{ tabPress: requireAuth }}
      />
    </Tab.Navigator>
  );
}
