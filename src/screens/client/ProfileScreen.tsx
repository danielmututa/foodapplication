import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootState } from '../../store';

export default function ProfileScreen() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const menuItems = [
    { icon: 'receipt-outline' as const, label: 'Order History', screen: 'Orders' },
    { icon: 'heart-outline' as const, label: 'Saved Restaurants', screen: 'Favorites' },
    { icon: 'location-outline' as const, label: 'My Addresses', screen: 'Addresses' },
    { icon: 'card-outline' as const, label: 'Payment Methods', screen: 'Payments' },
    { icon: 'settings-outline' as const, label: 'Account Settings', screen: 'Settings' },
    { icon: 'help-circle-outline' as const, label: 'Help & Support', screen: 'Support' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-8 items-center border-b border-gray-50">
          <View className="relative">
            <View className="w-24 h-24 rounded-full bg-orange-100 overflow-hidden border-4 border-white shadow-sm">
              <Image 
                source={{ uri: user?.avatar || 'https://i.pravatar.cc/150' }} 
                className="w-full h-full"
              />
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full border-2 border-white">
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-bold text-gray-900 mt-4">{user?.name || 'User'}</Text>
          <Text className="text-gray-500">{user?.email || 'user@example.com'}</Text>
          
          <TouchableOpacity 
            className="mt-4 bg-orange-50 px-6 py-2 rounded-full border border-orange-100"
            onPress={() => Alert.alert('Edit Profile', 'Profile editing is coming soon!')}
          >
            <Text className="text-orange-600 font-semibold">Edit Profile</Text>
          </TouchableOpacity>
        </View>
 
        {/* Menu Items */}
        <View className="px-6 py-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              className="flex-row items-center py-4 border-b border-gray-50"
              onPress={() => navigation.navigate(item.screen)}
            >
              <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-4">
                <Ionicons name={item.icon} size={22} color="#4b5563" />
              </View>
              <Text className="flex-1 text-base font-medium text-gray-700">{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
 
        {/* Logout */}
        <View className="px-6 pt-8 pb-12" style={{ marginBottom: insets.bottom + 100 }}>
          <TouchableOpacity 
            onPress={() => {
              Alert.alert(
                'Sign Out',
                'Are you sure you want to sign out?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Sign Out', style: 'destructive', onPress: () => dispatch(logout()) }
                ]
              );
            }}
            className="flex-row items-center justify-center bg-red-50 py-4 rounded-2xl border border-red-100"
          >
            <Ionicons name="log-out-outline" size={22} color="#ef4444" className="mr-2" />
            <Text className="text-red-600 font-bold ml-2">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
