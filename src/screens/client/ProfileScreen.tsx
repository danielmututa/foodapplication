import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootState } from '../../store';

export default function ProfileScreen() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const menuItems = [
    { icon: 'shopping-bag' as const, label: 'Order History', screen: 'Orders' },
    { icon: 'heart' as const, label: 'Saved Restaurants', screen: 'Favorites' },
    { icon: 'map-pin' as const, label: 'My Addresses', screen: 'Addresses' },
    { icon: 'credit-card' as const, label: 'Payment Methods', screen: 'Payments' },
    { icon: 'settings' as const, label: 'Account Settings', screen: 'Settings' },
    { icon: 'help-circle' as const, label: 'Help & Support', screen: 'Support' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: Math.max(insets.top, 10) }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-8 items-center border-b border-gray-50">
          <View className="relative">
            <View className="w-24 h-24 rounded-[32px] bg-orange-100 overflow-hidden border-4 border-white shadow-sm">
              <Image 
                source={{ uri: user?.avatar || 'https://i.pravatar.cc/150' }} 
                className="w-full h-full"
              />
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-2xl border-2 border-white">
              <Feather name="camera" size={14} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-black text-gray-900 mt-4">{user?.name || 'User'}</Text>
          <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider">{user?.email || 'user@example.com'}</Text>
          
          <TouchableOpacity 
            className="mt-5 bg-gray-900 px-8 py-3 rounded-2xl shadow-sm"
            onPress={() => Alert.alert('Edit Profile', 'Profile editing is coming soon!')}
          >
            <Text className="text-white font-black text-xs uppercase tracking-wider">Edit Profile</Text>
          </TouchableOpacity>
        </View>
 
        {/* Menu Items */}
        <View className="px-6 py-6">
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              className="flex-row items-center py-4.5 border-b border-gray-50"
              onPress={() => navigation.navigate(item.screen)}
            >
              <View className="w-11 h-11 bg-gray-50 rounded-2xl items-center justify-center mr-4">
                <Feather name={item.icon} size={20} color="#1f2937" />
              </View>
              <Text className="flex-1 text-base font-bold text-gray-800">{item.label}</Text>
              <Feather name="chevron-right" size={18} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
 
        {/* Logout */}
        <View className="px-6 pt-4 pb-12" style={{ marginBottom: insets.bottom + 100 }}>
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
            className="flex-row items-center justify-center bg-red-50 py-4.5 rounded-2xl border border-red-100"
          >
            <Feather name="log-out" size={18} color="#ef4444" />
            <Text className="text-red-600 font-black ml-3 uppercase text-xs tracking-wider">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
