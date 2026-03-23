import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

// Temporary mock screens
const DashboardScreen = () => <View className="flex-1 items-center justify-center bg-white"><Text className="text-xl font-bold">Dashboard Screen</Text></View>;
const MenuScreen = () => <View className="flex-1 items-center justify-center bg-white"><Text className="text-xl font-bold">Menu Screen</Text></View>;
const OrdersScreen = () => <View className="flex-1 items-center justify-center bg-white"><Text className="text-xl font-bold">Orders Screen</Text></View>;
const ProfileScreen = () => <View className="flex-1 items-center justify-center bg-white"><Text className="text-xl font-bold">Profile Screen</Text></View>;

export default function RestaurantNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#f97316' }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
