import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchMerchantOrders } from '../../store/orderSlice';
import { fetchMyRestaurant } from '../../store/restaurantSlice';

export default function DashboardScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { merchantOrders: orders, loading: ordersLoading } = useSelector((state: RootState) => state.orders);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { myRestaurant, loading: restaurantLoading } = useSelector((state: RootState) => state.restaurants);

  const loading = ordersLoading || restaurantLoading;

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'restaurant') {
      Alert.alert('Access Denied', 'You must be logged in as a restaurant owner to access this dashboard.');
      navigation.navigate('AuthModal'); // Assuming AuthModal exists or go back
      return;
    }

    const loadData = async () => {
      const result = await dispatch(fetchMyRestaurant());
      if (fetchMyRestaurant.fulfilled.match(result)) {
        dispatch(fetchMerchantOrders(result.payload.id));
      }
    };
    loadData();
  }, [dispatch, isAuthenticated, user, navigation]);


  const totalSales = orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const newOrdersToday = orders.filter(o => {
    const today = new Date().toDateString();
    return new Date(o.created_at).toDateString() === today;
  }).length;

  const stats = [
    { label: 'Total Sales', value: `$${totalSales.toFixed(2)}`, icon: 'cash-outline', color: 'bg-green-100', iconColor: '#10b981' },
    { label: 'New Orders', value: newOrdersToday.toString(), icon: 'receipt-outline', color: 'bg-blue-100', iconColor: '#3b82f6' },
    { label: 'Pending', value: pendingOrders.toString(), icon: 'time-outline', color: 'bg-orange-100', iconColor: '#f97316' },
    { label: 'Rating', value: '4.8', icon: 'star-outline', color: 'bg-yellow-100', iconColor: '#eab308' },
  ];

  const recentOrders = orders.slice(0, 3);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6 pt-12">
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-gray-500 font-medium">Welcome back,</Text>
            <Text className="text-2xl font-bold text-gray-900">{myRestaurant?.name || user?.name || 'Your Restaurant'} 🍕</Text>
          </View>

          <TouchableOpacity className="bg-white p-2 rounded-full shadow-sm">
            <Ionicons name="notifications-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#f97316" className="mt-10" />
        ) : (
          <>
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

              {recentOrders.length > 0 ? recentOrders.map((order) => (
                <TouchableOpacity key={order.id} className="bg-white p-4 rounded-2xl mb-3 shadow-sm border border-gray-100 flex-row justify-between items-center">
                  <View className="flex-1">
                    <Text className="text-gray-900 font-bold text-base">Order #{order.id}</Text>
                    <Text className="text-gray-550 text-sm mb-1">{order.items?.[0]?.item?.name || 'Various Items'}...</Text>
                    <Text className="text-gray-400 text-xs">Customer: {order.user?.name}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-orange-500 font-bold mb-1">${order.total_amount}</Text>
                    <View className="bg-orange-50 px-2 py-1 rounded-lg">
                      <Text className="text-orange-600 text-xs font-bold">{order.status}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )) : (
                <View className="items-center py-10">
                   <Text className="text-gray-400 font-bold">No orders yet</Text>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

