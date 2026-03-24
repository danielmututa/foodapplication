import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  date: string;
  total: number;
  status: 'Delivered' | 'In Progress' | 'Cancelled';
  items: number;
  image: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-1234',
    restaurantId: '1',
    restaurantName: 'Pizza Palace',
    date: '24 Mar 2024, 12:30 PM',
    total: 25.50,
    status: 'Delivered',
    items: 2,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=80',
  },
  {
    id: 'ORD-5678',
    restaurantId: '2',
    restaurantName: 'Burger Bistro',
    date: '22 Mar 2024, 07:15 PM',
    total: 18.90,
    status: 'Delivered',
    items: 3,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80',
  },
];

export default function OrdersScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity 
      className="bg-white mx-4 my-3 p-4 rounded-3xl shadow-sm border border-gray-100"
      onPress={() => navigation.navigate('RestaurantProfile', { restaurantId: item.restaurantId })}
    >
      <View className="flex-row items-center">
        <Image source={{ uri: item.image }} className="w-16 h-16 rounded-2xl mr-4" />
        <View className="flex-1">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-lg font-bold text-gray-900">{item.restaurantName}</Text>
            <Text className="text-orange-500 font-bold">${item.total.toFixed(2)}</Text>
          </View>
          <Text className="text-gray-500 text-sm mb-2">{item.date}</Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-400 text-xs">{item.items} items</Text>
            <View className={`px-2.5 py-1 rounded-full ${
              item.status === 'Delivered' ? 'bg-green-100' : 
              item.status === 'Cancelled' ? 'bg-red-100' : 'bg-blue-100'
            }`}>
              <Text className={`text-xs font-bold ${
                item.status === 'Delivered' ? 'text-green-700' : 
                item.status === 'Cancelled' ? 'text-red-700' : 'text-blue-700'
              }`}>{item.status}</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex-row mt-4 pt-4 border-t border-gray-50">
        <TouchableOpacity 
          className="bg-orange-500 flex-1 py-2.5 rounded-xl items-center mr-2"
          onPress={() => navigation.navigate('RestaurantProfile', { restaurantId: item.restaurantId })}
        >
          <Text className="text-white font-bold">Reorder</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="bg-gray-50 flex-1 py-2.5 rounded-xl items-center"
          onPress={() => navigation.navigate('TrackOrder', { orderId: item.id })}
        >
          <Text className="text-gray-600 font-bold">Track Order</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb', paddingTop: insets.top }}>
      <View className="px-6 py-4 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-gray-900">Your Orders</Text>
        <TouchableOpacity className="bg-white p-2 rounded-full shadow-sm">
          <Ionicons name="filter-outline" size={20} color="#f97316" />
        </TouchableOpacity>
      </View>
      
      {MOCK_ORDERS.length > 0 ? (
        <FlatList
          data={MOCK_ORDERS}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center p-6">
          <Ionicons name="receipt-outline" size={80} color="#e5e7eb" />
          <Text className="text-xl font-bold text-gray-900 mt-4">No orders yet</Text>
          <Text className="text-gray-500 text-center mt-2">Hungry? Explore restaurants and place your first order!</Text>
        </View>
      )}
    </View>
  );
}
