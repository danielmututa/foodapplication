import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../screens/restaurant/DashboardScreen';
import MenuManagementScreen from '../screens/restaurant/MenuManagementScreen';
import OrderManagementScreen from '../screens/restaurant/OrderManagementScreen';
import AnalyticsScreen from '../screens/restaurant/AnalyticsScreen';
import ProfileScreen from '../screens/restaurant/ProfileScreen';

import LocationManagementScreen from '../screens/restaurant/LocationManagementScreen';
import ReviewsScreen from '../screens/restaurant/ReviewsScreen';

const Tab = createBottomTabNavigator();

export default function RestaurantNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarShowLabel: true,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: '#fff',
          height: 120,
          paddingBottom: 0,
          paddingTop:10 ,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginBottom: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'grid';
          if (route.name === 'Dashboard') iconName = focused ? 'grid' : 'grid-outline';
          else if (route.name === 'Orders') iconName = focused ? 'receipt' : 'receipt-outline';
          else if (route.name === 'Menu') iconName = focused ? 'restaurant' : 'restaurant-outline';
          else if (route.name === 'Analytics') iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Orders" component={OrderManagementScreen} />
      <Tab.Screen name="Menu" component={MenuManagementScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      
      {/* Hidden screens accessible via navigation */}
      <Tab.Screen 
        name="Location" 
        component={LocationManagementScreen} 
        options={{ tabBarButton: () => null }} 
      />
      <Tab.Screen 
        name="Reviews" 
        component={ReviewsScreen} 
        options={{ tabBarButton: () => null }} 
      />
    </Tab.Navigator>
  );
}
