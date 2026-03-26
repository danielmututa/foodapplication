import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NotificationService from '../../services/NotificationService';

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

  const handleReorder = (restaurantName: string) => {
    NotificationService.notifyReorderSuccess(restaurantName);
  };

  const renderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity 
      className="bg-white mx-4 my-3 p-5 rounded-[32px] shadow-sm border border-gray-50"
      onPress={() => navigation.navigate('RestaurantProfile', { restaurantId: item.restaurantId })}
    >
      <View className="flex-row items-center">
        <Image source={{ uri: item.image }} className="w-16 h-16 rounded-[20px] mr-4" />
        <View className="flex-1">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-lg font-black text-gray-900">{item.restaurantName}</Text>
            <Text className="text-gray-900 font-black text-sm">${item.total.toFixed(2)}</Text>
          </View>
          <Text className="text-gray-400 font-bold text-[10px] uppercase tracking-wider mb-3">{item.date}</Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">{item.items} items</Text>
            <View className={`px-3 py-1 rounded-lg ${
              item.status === 'Delivered' ? 'bg-green-50' : 
              item.status === 'Cancelled' ? 'bg-red-50' : 'bg-blue-50'
            }`}>
              <Text className={`text-[10px] font-black uppercase tracking-wider ${
                item.status === 'Delivered' ? 'text-green-600' : 
                item.status === 'Cancelled' ? 'text-red-600' : 'text-blue-600'
              }`}>{item.status}</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex-row mt-5 pt-5 border-t border-gray-50">
        <TouchableOpacity 
          className="bg-orange-500 flex-1 py-3.5 rounded-2xl items-center mr-2 shadow-sm"
          onPress={() => handleReorder(item.restaurantName)}
        >
          <Text className="text-white font-black text-xs uppercase tracking-widest">Reorder</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="bg-gray-900 flex-1 py-3.5 rounded-2xl items-center shadow-sm"
          onPress={() => navigation.navigate('TrackOrder', { orderId: item.id })}
        >
          <Text className="text-white font-black text-xs uppercase tracking-widest">Track Order</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: Math.max(insets.top, 10) }}>
      <View className="px-6 py-4 flex-row justify-between items-center">
        <Text className="text-2xl font-black text-gray-900">Your Orders</Text>
        <TouchableOpacity className="bg-gray-50 p-2.5 rounded-2xl shadow-sm border border-gray-100">
          <Feather name="sliders" size={18} color="#1f2937" />
        </TouchableOpacity>
      </View>
      
      {MOCK_ORDERS.length > 0 ? (
        <FlatList
          data={MOCK_ORDERS}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: insets.bottom + 120, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center p-8">
          <View className="w-24 h-24 bg-gray-50 rounded-[32px] items-center justify-center mb-6">
             <Feather name="file-text" size={40} color="#e5e7eb" />
          </View>
          <Text className="text-2xl font-black text-gray-900">No orders yet</Text>
          <Text className="text-gray-400 text-center mt-2 text-sm font-medium leading-relaxed px-5">Hungry? Explore restaurants and place your first order!</Text>
        </View>
      )}
    </View>
  );
}
