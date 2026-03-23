import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CATEGORIES = ['All', 'Pizza', 'Burger', 'Sushi', 'Dessert', 'Healthy', 'Vegan'];
const RESTAURANTS = [
  { id: '1', name: 'Pizza Palace', rating: 4.8, distance: '1.2 km', time: '15-20 min', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80', tags: ['Pizza', 'Italian'] },
  { id: '2', name: 'Burger Bistro', rating: 4.5, distance: '2.5 km', time: '25-30 min', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80', tags: ['Burger', 'Fast Food'] },
  { id: '3', name: 'Sushi Spot', rating: 4.9, distance: '3.1 km', time: '30-40 min', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80', tags: ['Sushi', 'Japanese'] },
];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('All');

  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 pt-10">
      <View className="px-4 pt-4 pb-2">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-gray-500 text-sm">Location</Text>
            <Text className="text-xl font-bold text-gray-900">New York, NY 📍</Text>
          </View>
          <View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center overflow-hidden shadow-sm">
             <Image source={{uri: 'https://i.pravatar.cc/100'}} className="w-full h-full" />
          </View>
        </View>

        {/* Search Bar */}
        <TouchableOpacity 
          className="flex-row items-center bg-white border border-gray-100 p-3 rounded-2xl shadow-sm mb-6"
          onPress={() => navigation.navigate('Search')}
        >
          <Text className="text-gray-400 mr-2 text-lg">🔍</Text>
          <Text className="flex-1 text-base text-gray-400">Search for food or restaurants...</Text>
          <View className="bg-orange-500 p-2 rounded-xl ml-2">
            <Text className="text-white text-xs font-semibold">Filter</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Categories */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 px-4 mb-3">Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
            {CATEGORIES.map((cat, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveCategory(cat)}
                className={`mr-3 px-5 py-2.5 rounded-full ${activeCategory === cat ? 'bg-orange-500' : 'bg-white border border-gray-200 shadow-sm'}`}
              >
                <Text className={`font-medium ${activeCategory === cat ? 'text-white' : 'text-gray-600'}`}>{cat}</Text>
              </TouchableOpacity>
            ))}
            <View className="w-8" />
          </ScrollView>
        </View>

        {/* Popular Restaurants */}
        <View className="px-4 pb-10">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-900">Popular Near You</Text>
            <TouchableOpacity><Text className="text-orange-500 font-medium">See all</Text></TouchableOpacity>
          </View>

          {RESTAURANTS.map((restaurant) => (
            <TouchableOpacity 
              key={restaurant.id} 
              className="bg-white rounded-3xl shadow-sm mb-5 overflow-hidden border border-gray-100"
              onPress={() => navigation.navigate('RestaurantProfile', { restaurantId: restaurant.id })}
            >
              <View className="h-48 w-full bg-gray-200">
                <Image source={{ uri: restaurant.image }} className="w-full h-full" resizeMode="cover" />
                <View className="absolute top-4 right-4 bg-white px-2.5 py-1 rounded-full flex-row items-center shadow-sm">
                  <Text className="text-yellow-500 text-xs mr-1">⭐</Text>
                  <Text className="font-bold text-gray-800 text-xs">{restaurant.rating}</Text>
                </View>
              </View>
              <View className="p-5">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-xl font-bold text-gray-900">{restaurant.name}</Text>
                </View>
                <View className="flex-row items-center mb-3">
                   <Text className="text-gray-500 text-sm mr-2">{restaurant.tags.join(' • ')}</Text>
                </View>
                <View className="flex-row items-center mt-2 border-t border-gray-100 pt-4">
                  <View className="flex-row items-center mr-5">
                    <Text className="text-gray-400 text-xs mr-1">🚲</Text>
                    <Text className="text-gray-600 font-medium text-xs">{restaurant.distance}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-gray-400 text-xs mr-1">⏱</Text>
                    <Text className="text-gray-600 font-medium text-xs">{restaurant.time}</Text>
                  </View>
                  <View className="flex-1 items-end">
                    <Text className="text-orange-500 font-bold bg-orange-50 px-2 py-1 rounded">Free delivery</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
