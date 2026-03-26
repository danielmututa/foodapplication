import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather, Ionicons } from '@expo/vector-icons';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NotificationService from '../../services/NotificationService';
import type { RootState } from '../../store';

export default function CartScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (id: string, current: number, delta: number) => {
    const newQuantity = current + delta;
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handlePlaceOrder = () => {
    const orderId = Math.floor(100000 + Math.random() * 900000).toString();
    NotificationService.notifyOrderSuccess(orderId);
    dispatch(clearCart());
    navigation.navigate('Orders');
  };

  const deliveryFee = items.length > 0 ? 2.50 : 0;
  const grandTotal = totalAmount + deliveryFee;

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: Math.max(insets.top, 10) }}>
      {/* Header */}
      <View className="px-6 py-2 flex-row items-center justify-between border-b border-gray-50">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-11 h-11 bg-gray-50 rounded-2xl items-center justify-center">
          <Feather name="chevron-left" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-black text-gray-900">My Cart</Text>
        <View className="w-11" />
      </View>

      {items.length > 0 ? (
        <>
          <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
            <View className="py-6">
              {items.map((item) => (
                <View key={item.id} className="flex-row items-center mb-6 bg-gray-50 p-4 rounded-[32px] border border-gray-100">
                  <Image source={{ uri: item.image }} className="w-20 h-20 rounded-2xl mr-4" />
                  <View className="flex-1">
                    <Text className="text-lg font-black text-gray-900 mb-1">{item.name}</Text>
                    <Text className="text-gray-400 font-bold text-xs uppercase mb-3 tracking-wider">${item.price.toFixed(2)}</Text>
                    <View className="flex-row items-center">
                      <TouchableOpacity 
                        onPress={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                        className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm"
                      >
                        <Feather name="minus" size={14} color="#1f2937" />
                      </TouchableOpacity>
                      <Text className="mx-4 font-black text-gray-900 text-base">{item.quantity}</Text>
                      <TouchableOpacity 
                        onPress={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                        className="bg-orange-500 p-2 rounded-xl border border-orange-600 shadow-sm"
                      >
                        <Feather name="plus" size={14} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity 
                    onPress={() => dispatch(removeFromCart(item.id))}
                    className="ml-4 p-2"
                  >
                    <Feather name="trash-2" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Payment Method Selection */}
            <View className="mb-10">
              <Text className="text-gray-400 font-bold uppercase text-[10px] mb-4 tracking-widest px-1">Payment Method</Text>
              <TouchableOpacity className="flex-row items-center bg-gray-50 p-5 rounded-[24px] border border-orange-200 mb-3">
                <View className="w-10 h-10 bg-white rounded-xl items-center justify-center mr-4 shadow-sm">
                   <Feather name="credit-card" size={20} color="#f97316" />
                </View>
                <Text className="flex-1 text-gray-900 font-bold text-sm">Credit/Debit Card</Text>
                <Feather name="check-circle" size={20} color="#f97316" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center bg-gray-50 p-5 rounded-[24px] border border-gray-100">
                <View className="w-10 h-10 bg-white rounded-xl items-center justify-center mr-4 shadow-sm">
                   <Feather name="dollar-sign" size={20} color="#4b5563" />
                </View>
                <Text className="flex-1 text-gray-400 font-bold text-sm">Cash on Delivery</Text>
                <Feather name="circle" size={20} color="#d1d5db" />
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Footer Summary */}
          <View className="px-6 py-8 bg-white rounded-t-[40px] border-t border-gray-50 shadow-2xl shadow-gray-200">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider">Subtotal</Text>
              <Text className="text-gray-900 font-black text-sm">${totalAmount.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider">Delivery Fee</Text>
              <Text className="text-gray-900 font-black text-sm">${deliveryFee.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between mb-8">
              <Text className="text-lg font-black text-gray-900">Total Bill</Text>
              <Text className="text-2xl font-black text-orange-500">${grandTotal.toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity 
              onPress={handlePlaceOrder}
              className="bg-gray-900 py-5 rounded-[24px] items-center shadow-lg shadow-gray-200"
            >
              <Text className="text-white text-base font-black uppercase tracking-widest">Place Order</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="flex-1 items-center justify-center p-8 bg-white">
          <View className="w-32 h-32 bg-gray-50 rounded-[40px] items-center justify-center mb-8">
             <Feather name="shopping-bag" size={60} color="#e5e7eb" />
          </View>
          <Text className="text-2xl font-black text-gray-900">Your cart is empty</Text>
          <Text className="text-gray-400 text-center mt-3 text-sm font-medium leading-relaxed px-5">
            Looks like you haven't added any delicacies yet. Go back and explore!
          </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Home')}
            className="mt-10 bg-orange-500 px-12 py-4.5 rounded-[24px] shadow-lg shadow-orange-200"
          >
            <Text className="text-white font-black text-xs uppercase tracking-widest">Browse Menu</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
