import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice';
import type { RootState } from '../../store';

export default function CartScreen({ navigation }: any) {
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

  const deliveryFee = items.length > 0 ? 2.50 : 0;
  const grandTotal = totalAmount + deliveryFee;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center border-b border-gray-50">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">My Cart</Text>
      </View>

      {items.length > 0 ? (
        <>
          <ScrollView className="flex-1 px-6">
            <View className="py-6">
              {items.map((item) => (
                <View key={item.id} className="flex-row items-center mb-6 bg-gray-50 p-4 rounded-3xl border border-gray-100">
                  <Image source={{ uri: item.image }} className="w-20 h-20 rounded-2xl mr-4" />
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-900 mb-1">{item.name}</Text>
                    <Text className="text-orange-500 font-bold mb-2">${item.price.toFixed(2)}</Text>
                    <View className="flex-row items-center">
                      <TouchableOpacity 
                        onPress={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                        className="bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm"
                      >
                        <Ionicons name="remove" size={18} color="#4b5563" />
                      </TouchableOpacity>
                      <Text className="mx-4 font-bold text-gray-900">{item.quantity}</Text>
                      <TouchableOpacity 
                        onPress={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                        className="bg-orange-500 p-1.5 rounded-lg border border-orange-600 shadow-sm"
                      >
                        <Ionicons name="add" size={18} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity 
                    onPress={() => dispatch(removeFromCart(item.id))}
                    className="ml-4"
                  >
                    <Ionicons name="trash-outline" size={24} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Payment Method Selection */}
            <View className="mb-10">
              <Text className="text-lg font-bold text-gray-900 mb-4">Payment Method</Text>
              <TouchableOpacity className="flex-row items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-3">
                <Ionicons name="card-outline" size={24} color="#f97316" className="mr-3" />
                <Text className="flex-1 text-gray-700 font-medium ml-3">Credit/Debit Card</Text>
                <Ionicons name="checkmark-circle" size={24} color="#f97316" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-row items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <Ionicons name="cash-outline" size={24} color="#4b5563" className="mr-3" />
                <Text className="flex-1 text-gray-700 font-medium ml-3">Cash on Delivery</Text>
                <Ionicons name="ellipse-outline" size={24} color="#d1d5db" />
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Footer Summary */}
          <View className="px-6 py-8 bg-neutral-50 rounded-t-4xl border-t border-gray-100">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500">Subtotal</Text>
              <Text className="text-gray-900 font-medium">${totalAmount.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-gray-500">Delivery Fee</Text>
              <Text className="text-gray-900 font-medium">${deliveryFee.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between mb-8">
              <Text className="text-xl font-bold text-gray-900">Total</Text>
              <Text className="text-2xl font-black text-orange-500">${grandTotal.toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity 
              onPress={() => {
                alert('Order Placed Successfully!');
                dispatch(clearCart());
                navigation.navigate('Orders');
              }}
              className="bg-orange-500 py-5 rounded-2xl items-center shadow-lg shadow-orange-200"
            >
              <Text className="text-white text-lg font-bold">Place Order</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="flex-1 items-center justify-center p-6 bg-neutral-50">
          <Ionicons name="cart-outline" size={100} color="#e5e7eb" />
          <Text className="text-2xl font-bold text-gray-900 mt-6">Your cart is empty</Text>
          <Text className="text-gray-500 text-center mt-3 text-lg leading-relaxed">
            Looks like you haven't added anything to your cart yet. Go ahead and explore top restaurants.
          </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Home')}
            className="mt-10 bg-orange-500 px-10 py-4 rounded-2xl shadow-md"
          >
            <Text className="text-white font-bold text-lg">Browse Restaurants</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
