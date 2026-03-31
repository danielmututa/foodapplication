import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchMerchantOrders } from '../../store/orderSlice';
import { fetchMyRestaurant } from '../../store/restaurantSlice';

export default function OrderManagementScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState('New');
  
  const { merchantOrders: orders, loading: ordersLoading } = useSelector((state: RootState) => state.orders);
  const { user } = useSelector((state: RootState) => state.auth);
  const { myRestaurant, loading: restaurantLoading } = useSelector((state: RootState) => state.restaurants);

  const loading = ordersLoading || restaurantLoading;

  useEffect(() => {
    const loadData = async () => {
      const result = await dispatch(fetchMyRestaurant());
      if (fetchMyRestaurant.fulfilled.match(result)) {
        dispatch(fetchMerchantOrders(result.payload.id));
      }
    };
    loadData();
  }, [dispatch]);


  const filteredOrders = orders.filter(order => {
    if (activeTab === 'New') return order.status === 'pending';
    if (activeTab === 'In Prep') return order.status === 'preparing';
    if (activeTab === 'Ready') return order.status === 'ready';
    if (activeTab === 'Completed') return order.status === 'completed';
    return true;
  });

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
        {loading ? (
          <ActivityIndicator size="large" color="#f97316" className="mt-10" />
        ) : filteredOrders.length > 0 ? filteredOrders.map((order) => (
          <View key={order.id} className="bg-white p-5 rounded-2xl mb-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center mb-3">
              <View>
                <Text className="text-lg font-bold text-gray-900">Order #{order.id}</Text>
                <Text className="text-gray-400 text-sm">{new Date(order.created_at).toLocaleTimeString()}</Text>
              </View>
              <View className="bg-orange-500 px-4 py-1.5 rounded-full shadow-sm shadow-orange-100">
                <Text className="text-white text-[10px] font-black uppercase tracking-widest">{order.status}</Text>
              </View>
            </View>

            <View className="border-t border-b border-gray-50 py-3 mb-4">
              {order.items && order.items.map((item: any, idx: number) => (
                <Text key={idx} className="text-gray-700 font-medium mb-1">• {item.quantity}x {item.item?.name}</Text>
              ))}
            </View>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-gray-400 text-xs">Customer</Text>
                <Text className="text-gray-900 font-bold">{order.user?.name}</Text>
                <Text className="text-gray-900 font-bold text-base mt-2">${order.total_amount}</Text>
              </View>
              <View className="flex-row">
                <TouchableOpacity className="bg-gray-100 px-4 py-3 rounded-xl mr-2">
                  <Text className="text-gray-600 font-bold">Details</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-orange-500 px-6 py-3 rounded-xl">
                  <Text className="text-white font-bold">Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )) : (
          <View className="items-center py-20">
            <Ionicons name="receipt-outline" size={60} color="#e5e7eb" />
            <Text className="text-gray-400 mt-4 font-bold">No {activeTab.toLowerCase()} orders</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

