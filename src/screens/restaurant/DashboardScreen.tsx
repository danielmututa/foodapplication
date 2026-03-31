import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const stats = [
    { label: 'Total Sales', value: '$1,250', icon: 'cash-outline', color: 'bg-green-100', iconColor: '#10b981' },
    { label: 'New Orders', value: '12', icon: 'receipt-outline', color: 'bg-blue-100', iconColor: '#3b82f6' },
    { label: 'Pending', value: '3', icon: 'time-outline', color: 'bg-orange-100', iconColor: '#f97316' },
    { label: 'Rating', value: '4.8', icon: 'star-outline', color: 'bg-yellow-100', iconColor: '#eab308' },
  ];

  const recentOrders = [
    { id: '101', customer: 'John Doe', items: '2x Truffle Pizza', price: '$37.00', status: 'In Prep' },
    { id: '102', customer: 'Jane Smith', items: '1x Burger Combo', price: '$15.50', status: 'New' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6 pt-12">
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-gray-500 font-medium">Welcome back,</Text>
            <Text className="text-2xl font-bold text-gray-900">Pizza Palace 🍕</Text>
          </View>
          <TouchableOpacity className="bg-white p-2 rounded-full shadow-sm">
            <Ionicons name="notifications-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap justify-between mb-8">
          {stats.map((stat, index) => (
            <View key={index} className="w-[48%] bg-white p-4 rounded-2xl mb-4 shadow-sm border border-gray-100">
              <View className={`${stat.color} p-2 rounded-xl self-start mb-3`}>
                <Ionicons name={stat.icon as any} size={20} color={stat.iconColor} />
              </View>
              <Text className="text-gray-500 text-sm font-medium">{stat.label}</Text>
              <Text className="text-xl font-bold text-gray-900">{stat.value}</Text>
            </View>
          ))}
        </View>

        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">Recent Orders</Text>
            <TouchableOpacity>
              <Text className="text-orange-500 font-bold">View All</Text>
            </TouchableOpacity>
          </View>

          {recentOrders.map((order) => (
            <TouchableOpacity key={order.id} className="bg-white p-4 rounded-2xl mb-3 shadow-sm border border-gray-100 flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-gray-900 font-bold text-base">Order #{order.id}</Text>
                <Text className="text-gray-500 text-sm mb-1">{order.items}</Text>
                <Text className="text-gray-400 text-xs">Customer: {order.customer}</Text>
              </View>
              <View className="items-end">
                <Text className="text-orange-500 font-bold mb-1">{order.price}</Text>
                <View className="bg-orange-50 px-2 py-1 rounded-lg">
                  <Text className="text-orange-600 text-xs font-bold">{order.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
