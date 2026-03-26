import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { notificationService } from '../../services/NotificationService';

const STEPS = [
  { id: 1, label: 'Order Placed', time: '12:30 PM', completed: true, active: false },
  { id: 2, label: 'Preparing', time: '12:35 PM', completed: true, active: false },
  { id: 3, label: 'On the Way', time: '12:45 PM', completed: false, active: true },
  { id: 4, label: 'Delivered', time: 'Estimated 1:05 PM', completed: false, active: false },
];


export default function TrackOrderScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const orderId = route.params?.orderId || 'ORD-1234';

  useEffect(() => {
    // Simulate an order status update notification when entering the screen
    notificationService.notifyOrderStatus(orderId, 'On the Way');
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: insets.top }}>
      <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">Track Order</Text>
      </View>

      <ScrollView className="flex-1 px-6">
        <View className="mt-8 mb-10 items-center">
            <View className="bg-orange-50 w-24 h-24 rounded-full items-center justify-center mb-6">
                <Ionicons name="bicycle" size={48} color="#f97316" />
            </View>
            <Text className="text-2xl font-black text-gray-900">Pizza Palace</Text>
            <Text className="text-gray-500 mt-1">Order {orderId} • $25.50</Text>
            <View className="bg-green-100 px-4 py-1.5 rounded-full mt-4">
                <Text className="text-green-700 font-bold text-xs">Arriving in 15 mins</Text>
            </View>
        </View>

        <View className="bg-gray-50 p-8 rounded-[40px] border border-gray-100">
            {STEPS.map((step, index) => (
                <View key={step.id} className="relative flex-row mb-10 last:mb-0">
                    {index !== STEPS.length - 1 && (
                        <View 
                            className={`absolute left-[11px] top-6 w-[2px] h-[40px] ${
                                step.completed ? 'bg-orange-500' : 'bg-gray-200'
                            }`}
                        />
                    )}
                    <View className={`w-6 h-6 rounded-full items-center justify-center z-10 ${
                        step.completed ? 'bg-orange-500' : 
                        step.active ? 'bg-white border-2 border-orange-500' : 'bg-gray-200'
                    }`}>
                        {step.completed && <Ionicons name="checkmark" size={14} color="white" />}
                        {step.active && <View className="w-2 h-2 rounded-full bg-orange-500" />}
                    </View>
                    <View className="ml-6 flex-1">
                        <View className="flex-row justify-between items-center">
                            <Text className={`font-bold text-base ${
                                step.completed || step.active ? 'text-gray-900' : 'text-gray-400'
                            }`}>{step.label}</Text>
                            <Text className="text-gray-400 text-xs">{step.time}</Text>
                        </View>
                        {step.active && (
                            <View className="mt-2 flex-row items-center">
                                <Image 
                                    source={{ uri: 'https://i.pravatar.cc/100?u=driver' }} 
                                    className="w-8 h-8 rounded-full mr-3" 
                                />
                                <View>
                                    <Text className="text-gray-800 text-xs font-bold">John (Your Courier)</Text>
                                    <Text className="text-gray-500 text-[10px]">On a bicycle</Text>
                                </View>
                                <TouchableOpacity 
                                  onPress={() => Linking.openURL('tel:+263775306263')}
                                  className="ml-auto bg-white p-2 rounded-xl shadow-sm border border-gray-100"
                                >
                                    <Ionicons name="call" size={16} color="#f97316" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            ))}
        </View>

        <TouchableOpacity 
          onPress={() => Linking.openURL('https://wa.me/263783012260')}
          className="bg-orange-500 py-5 rounded-2xl items-center mt-10 mb-20 shadow-lg shadow-orange-200"
        >
            <Text className="text-white text-lg font-bold">Need Help?</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
