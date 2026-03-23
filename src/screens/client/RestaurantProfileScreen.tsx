import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const RESTAURANT_DATA: any = {
  '1': { name: 'Pizza Palace', rating: 4.8, distance: '1.2 km', waitTime: '15-20 min', address: '123 New York St.', phone: '+1 234 567 890' },
  '2': { name: 'Burger Bistro', rating: 4.5, distance: '2.5 km', waitTime: '25-30 min', address: '456 Brooklyn Ave.', phone: '+1 987 654 321' },
  '3': { name: 'Sushi Spot', rating: 4.9, distance: '3.1 km', waitTime: '30-40 min', address: '789 Queens Blvd.', phone: '+1 555 123 456' },
  '4': { name: 'Vegan Valley', rating: 4.7, distance: '4.0 km', waitTime: '10-15 min', address: '321 Health Rd.', phone: '+1 555 987 654' }
};

const MENU = [
  { id: '1', name: 'Margherita Pizza', price: '$12.99', desc: 'Classic cheese and tomato' },
  { id: '2', name: 'Cheeseburger', price: '$9.99', desc: 'Beef patty with cheddar' },
  { id: '3', name: 'Spicy Tuna Roll', price: '$14.99', desc: 'Fresh tuna with spicy mayo' }
];

export default function RestaurantProfileScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const restaurantId = route.params?.restaurantId || '1';
  const restaurant = RESTAURANT_DATA[restaurantId];
  
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleRestrictedAction = (actionName: string) => {
    if (!isAuthenticated) {
      navigation.navigate('AuthModal');
    } else {
      console.log(`Executing ${actionName}...`);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header Image */}
      <View className="h-64 bg-gray-200 relative">
        <TouchableOpacity 
          className="absolute top-12 left-4 z-10 w-10 h-10 bg-black/30 rounded-full items-center justify-center p-2"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={{uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80'}} className="w-full h-full" resizeMode="cover" />
      </View>

      <ScrollView className="flex-1 -mt-6 bg-white rounded-t-3xl pt-6 px-4">
        <View className="flex-row justify-between items-start mb-2">
          <Text className="text-3xl font-bold text-gray-900">{restaurant.name}</Text>
          <View className="bg-orange-100 px-3 py-1 rounded-full flex-row items-center">
            <Ionicons name="star" size={16} color="#f97316" />
            <Text className="text-orange-600 font-bold ml-1">{restaurant.rating}</Text>
          </View>
        </View>

        <Text className="text-gray-500 mb-4">{restaurant.address} • {restaurant.phone}</Text>

        <View className="flex-row justify-between border-y border-gray-100 py-4 mb-6">
          <View className="items-center flex-1">
            <Ionicons name="time-outline" size={24} color="#f97316" />
            <Text className="text-sm text-gray-500 mt-1">Wait Time</Text>
            <Text className="font-bold text-gray-900">{restaurant.waitTime}</Text>
          </View>
          <View className="items-center flex-1 border-x border-gray-100">
            <Ionicons name="location-outline" size={24} color="#f97316" />
            <Text className="text-sm text-gray-500 mt-1">Distance</Text>
            <Text className="font-bold text-gray-900">{restaurant.distance}</Text>
          </View>
          <TouchableOpacity className="items-center flex-1" onPress={() => handleRestrictedAction('Review')}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="#f97316" />
            <Text className="text-sm text-gray-500 mt-1">Reviews</Text>
            <Text className="font-bold text-orange-500">Read &gt;</Text>
          </TouchableOpacity>
        </View>

        {/* Actions requiring auth */}
        <View className="flex-row gap-3 mb-6">
           <TouchableOpacity 
             className="flex-1 bg-orange-500 py-3 rounded-xl items-center"
             onPress={() => handleRestrictedAction('Book Table')}
           >
             <Text className="text-white font-bold text-base">Book a Table</Text>
           </TouchableOpacity>
           <TouchableOpacity 
             className="w-14 items-center justify-center bg-gray-100 rounded-xl"
             onPress={() => handleRestrictedAction('Get Directions')}
           >
             <Ionicons name="navigate" size={24} color="#4b5563" />
           </TouchableOpacity>
        </View>

        <Text className="text-xl font-bold text-gray-900 mb-4">Menu</Text>
        {MENU.map(item => (
          <View key={item.id} className="flex-row justify-between items-center mb-4 pb-4 border-b border-gray-100">
            <View className="flex-1 pr-4">
              <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
              <Text className="text-gray-500 text-sm mt-1">{item.desc}</Text>
              <Text className="text-orange-600 font-bold mt-2">{item.price}</Text>
            </View>
            <TouchableOpacity 
              className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center"
              onPress={() => handleRestrictedAction('Add to Cart')}
            >
               <Ionicons name="add" size={24} color="#f97316" />
            </TouchableOpacity>
          </View>
        ))}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
