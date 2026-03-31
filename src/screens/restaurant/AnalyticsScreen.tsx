import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function AnalyticsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-12">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Business Analytics</Text>

        <View className="bg-orange-500 p-6 rounded-3xl mb-8 shadow-lg shadow-orange-200">
          <Text className="text-orange-100 font-medium mb-1">Total Revenue</Text>
          <Text className="text-4xl font-bold text-white mb-4">$12,450.00</Text>
          <View className="flex-row items-center">
            <Ionicons name="trending-up" size={20} color="#fff" />
            <Text className="text-white font-bold ml-1">+12.5% this month</Text>
          </View>
        </View>

        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">Top Selling Items</Text>
          {[
            { name: 'Truffle Pizza', sales: '240 orders', growth: '+15%' },
            { name: 'Classic Burger', sales: '180 orders', growth: '+8%' },
            { name: 'Veggie Wrap', sales: '95 orders', growth: '-2%' },
          ].map((item, index) => (
            <View key={index} className="flex-row justify-between items-center bg-gray-50 p-4 rounded-2xl mb-3">
              <View>
                <Text className="text-gray-900 font-bold">{item.name}</Text>
                <Text className="text-gray-500 text-xs">{item.sales}</Text>
              </View>
              <Text className={`font-bold ${item.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {item.growth}
              </Text>
            </View>
          ))}
        </View>

        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">Customer Engagement</Text>
          <View className="bg-gray-50 p-6 rounded-3xl items-center">
            <View className="flex-row justify-around w-full mb-6">
              <View className="items-center">
                <Text className="text-2xl font-bold text-gray-900">4.8</Text>
                <Text className="text-gray-500 text-xs text-center">Avg Rating</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-gray-900">85%</Text>
                <Text className="text-gray-500 text-xs text-center">Return Guests</Text>
              </View>
            </View>
            <View className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <View className="bg-orange-500 h-full w-[85%]" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
