import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function OrderManagementScreen() {
  const [activeTab, setActiveTab] = useState('New');

  const orders = [
    { id: '101', customer: 'John Doe', items: ['2x Truffle Pizza', '1x Coke'], total: '$42.00', time: '12:45 PM', status: 'In Prep', prepTime: '15 min' },
    { id: '102', customer: 'Jane Smith', items: ['1x Burger Combo'], total: '$15.50', time: '12:50 PM', status: 'New', prepTime: '20 min' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-6 pt-12 pb-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Order Management</Text>
        <View className="flex-row bg-gray-100 p-1 rounded-xl">
          {['New', 'In Prep', 'Ready', 'Completed'].map((tab) => (
            <TouchableOpacity 
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-lg items-center ${activeTab === tab ? 'bg-white shadow-sm' : ''}`}
            >
              <Text className={`font-bold text-xs ${activeTab === tab ? 'text-orange-500' : 'text-gray-500'}`}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-4">
        {orders.map((order) => (
          <View key={order.id} className="bg-white p-5 rounded-2xl mb-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center mb-3">
              <View>
                <Text className="text-lg font-bold text-gray-900">Order #{order.id}</Text>
                <Text className="text-gray-400 text-sm">{order.time}</Text>
              </View>
              <View className="bg-orange-500 px-4 py-1.5 rounded-full shadow-sm shadow-orange-100">
                <Text className="text-white text-[10px] font-black uppercase tracking-widest">Est. {order.prepTime} Prep</Text>
              </View>
            </View>

            <View className="border-t border-b border-gray-50 py-3 mb-4">
              {order.items.map((item, idx) => (
                <Text key={idx} className="text-gray-700 font-medium mb-1">• {item}</Text>
              ))}
            </View>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-gray-400 text-xs">Customer</Text>
                <Text className="text-gray-900 font-bold">{order.customer}</Text>
              </View>
              <View className="flex-row">
                <TouchableOpacity className="bg-gray-100 px-4 py-3 rounded-xl mr-2">
                  <Text className="text-gray-600 font-bold">Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-orange-500 px-6 py-3 rounded-xl">
                  <Text className="text-white font-bold">Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
