import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const MOCK_ADDRESSES = [
  { id: '1', type: 'Home', address: '123 New York St, Apt 4B, New York, NY 10001', icon: 'home-outline' },
  { id: '2', type: 'Work', address: '456 Broadway Ave, Suite 200, New York, NY 10012', icon: 'briefcase-outline' },
];

export default function AddressesScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb', paddingTop: insets.top }}>
      <View className="px-6 py-4 flex-row items-center border-b border-gray-100 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">My Addresses</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        {MOCK_ADDRESSES.map(addr => (
          <TouchableOpacity key={addr.id} className="bg-white p-5 rounded-3xl mb-4 border border-gray-100 flex-row items-center shadow-sm">
            <View className="w-12 h-12 bg-orange-50 rounded-2xl items-center justify-center mr-4">
              <Ionicons name={addr.icon as any} size={24} color="#f97316" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900">{addr.type}</Text>
              <Text className="text-gray-500 text-sm mt-1">{addr.address}</Text>
            </View>
            <TouchableOpacity className="p-2">
              <Ionicons name="ellipsis-vertical" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        <TouchableOpacity className="border-2 border-dashed border-gray-200 p-5 rounded-3xl items-center justify-center mt-2 flex-row">
          <Ionicons name="add-circle" size={24} color="#f97316" className="mr-2" />
          <Text className="text-orange-600 font-bold ml-2">Add New Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
