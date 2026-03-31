import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

export default function ProfileScreen({ navigation }: any) {
  const dispatch = useDispatch();

  const menuItems = [
    { label: 'Business Analytics', icon: 'bar-chart-outline', screen: 'Analytics' },
    { label: 'Location & Branches', icon: 'business-outline', screen: 'Location' },
    { label: 'Customer Reviews', icon: 'star-outline', screen: 'Reviews' },
    { label: 'Push Notifications', icon: 'notifications-outline', action: () => alert('Notifications Settings Open') },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-6 pt-16 pb-8 rounded-b-[40px] shadow-sm items-center">
        <View className="relative mb-4">
            <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591' }} 
                className="w-24 h-24 rounded-full border-4 border-orange-50"
            />
            <TouchableOpacity className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full border-2 border-white">
                <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
        </View>
        <Text className="text-2xl font-bold text-gray-900">Pizza Palace</Text>
        <Text className="text-gray-500 mb-6">Italian Fine Dining • Since 2018</Text>
        
        <TouchableOpacity className="bg-orange-50 px-8 py-3 rounded-full">
            <Text className="text-orange-600 font-bold">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6 pt-8">
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => item.screen ? navigation.navigate(item.screen) : item.action?.()}
            className="bg-white p-4 rounded-2xl mb-3 flex-row items-center justify-between shadow-sm border border-gray-50"
          >
            <View className="flex-row items-center">
              <View className="bg-gray-100 p-2 rounded-xl mr-4">
                <Ionicons name={item.icon as any} size={20} color="#4b5563" />
              </View>
              <Text className="text-gray-900 font-semibold">{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          onPress={() => dispatch(logout())}
          className="bg-red-50 p-4 rounded-2xl mt-8 flex-row items-center justify-center border border-red-100"
        >
          <Ionicons name="log-out-outline" size={20} color="#ef4444" className="mr-2" />
          <Text className="text-red-500 font-bold">Sign Out</Text>
        </TouchableOpacity>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
