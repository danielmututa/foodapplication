import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const MOCK_CARDS = [
  { id: '1', type: 'Visa', last4: '4242', expiry: '12/25', brand: 'visa' },
  { id: '2', type: 'Mastercard', last4: '8888', expiry: '06/24', brand: 'card' },
];

export default function PaymentsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb', paddingTop: insets.top }}>
      <View className="px-6 py-4 flex-row items-center border-b border-gray-100 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">Payment Methods</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="text-gray-400 font-bold uppercase text-xs mb-4 ml-2 tracking-widest">Your Saved Cards</Text>
        
        {MOCK_CARDS.map(card => (
          <TouchableOpacity key={card.id} className="bg-white p-5 rounded-3xl mb-4 border border-gray-100 flex-row items-center shadow-sm">
            <View className="w-14 h-10 bg-gray-900 rounded-lg items-center justify-center mr-4">
              <Text className="text-white font-black italic">{card.type === 'Visa' ? 'VISA' : 'MC'}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900">•••• •••• •••• {card.last4}</Text>
              <Text className="text-gray-500 text-xs mt-1">Expires {card.expiry}</Text>
            </View>
            <View className="w-6 h-6 bg-green-100 rounded-full items-center justify-center">
              <Ionicons name="checkmark" size={14} color="#16a34a" />
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity className="bg-white p-5 rounded-3xl mb-8 border border-gray-100 flex-row items-center shadow-sm">
          <View className="w-12 h-12 bg-blue-50 rounded-2xl items-center justify-center mr-4">
            <Ionicons name="logo-paypal" size={24} color="#003087" />
          </View>
          <Text className="flex-1 text-lg font-bold text-gray-900">PayPal</Text>
          <Text className="text-gray-400 text-sm">j***@example.com</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-2 border-dashed border-gray-200 p-5 rounded-3xl items-center justify-center flex-row">
          <Ionicons name="add-circle" size={24} color="#f97316" className="mr-2" />
          <Text className="text-orange-600 font-bold ml-2">Add Payment Method</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
