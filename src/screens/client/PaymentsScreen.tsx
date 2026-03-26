import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
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
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: Math.max(insets.top, 10) }}>
      <View className="px-6 py-2 flex-row items-center justify-between border-b border-gray-50">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-11 h-11 bg-gray-50 rounded-2xl items-center justify-center">
          <Feather name="chevron-left" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-black text-gray-900">Payments</Text>
        <View className="w-11" />
      </View>

      <ScrollView className="flex-1 px-6 pt-8">
        <Text className="text-gray-400 font-bold uppercase text-[10px] mb-4 tracking-widest px-1">Your Saved Cards</Text>
        
        {MOCK_CARDS.map(card => (
          <TouchableOpacity key={card.id} className="bg-gray-50 p-5 rounded-[32px] mb-4 border border-gray-100 flex-row items-center shadow-sm">
            <View className="w-14 h-10 bg-gray-900 rounded-xl items-center justify-center mr-4">
              <Text className="text-white font-black italic text-[10px]">{card.type === 'Visa' ? 'VISA' : 'MC'}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-black text-gray-900">•••• {card.last4}</Text>
              <Text className="text-gray-400 font-bold text-[10px] uppercase tracking-wider mt-0.5">Expires {card.expiry}</Text>
            </View>
            <View className="w-6 h-6 bg-green-50 rounded-full items-center justify-center">
              <Feather name="check" size={14} color="#16a34a" />
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity className="bg-gray-50 p-5 rounded-[32px] mb-8 border border-gray-100 flex-row items-center">
          <View className="w-14 h-10 bg-blue-50 rounded-xl items-center justify-center mr-4">
             <Feather name="at-sign" size={20} color="#003087" />
          </View>
          <Text className="flex-1 text-base font-black text-gray-900">PayPal</Text>
          <Text className="text-gray-400 font-bold text-[10px]">j***@example.com</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border-2 border-dashed border-gray-100 p-6 rounded-[32px] items-center justify-center flex-row">
          <Feather name="plus-circle" size={20} color="#f97316" />
          <Text className="text-orange-500 font-black ml-3 uppercase text-xs tracking-widest">Add Payment Method</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
