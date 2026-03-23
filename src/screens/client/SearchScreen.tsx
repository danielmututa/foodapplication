import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ALL_RESTAURANTS = [
  { id: '1', name: 'Pizza Palace', rating: 4.8, distance: '1.2 km', cuisine: 'Pizza', price: '$$' },
  { id: '2', name: 'Burger Bistro', rating: 4.5, distance: '2.5 km', cuisine: 'Burger', price: '$' },
  { id: '3', name: 'Sushi Spot', rating: 4.9, distance: '3.1 km', cuisine: 'Sushi', price: '$$$' },
  { id: '4', name: 'Vegan Valley', rating: 4.7, distance: '4.0 km', cuisine: 'Healthy', price: '$$' }
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const navigation = useNavigation<any>();

  const filteredRestaurants = ALL_RESTAURANTS.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || r.price === activeFilter || r.rating > parseFloat(activeFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 pt-10">
      <View className="px-4 pb-4">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Search</Text>

        <View className="flex-row items-center bg-white border border-gray-100 p-3 rounded-2xl shadow-sm mb-4">
          <Ionicons name="search" size={20} color="#9ca3af" className="mr-2" />
          <TextInput 
            className="flex-1 text-base text-gray-800 ml-2"
            placeholder="Restaurants, cuisines, or dishes..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
          {['All', 'Highest Rated', '$', '$$', '$$$'].map((filter) => {
            const isHighestRated = filter === 'Highest Rated';
            const filterValue = isHighestRated ? '4.7' : filter;
            const isActive = activeFilter === filterValue || (filter === 'All' && activeFilter === 'All');

            return (
              <TouchableOpacity
                key={filter}
                onPress={() => setActiveFilter(isActive ? 'All' : filterValue)}
                className={`mr-3 px-4 py-2 rounded-full border ${isActive ? 'bg-orange-500 border-orange-500' : 'bg-white border-gray-200'}`}
              >
                <Text className={`font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}>{filter}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-4">
        <Text className="text-sm font-semibold text-gray-500 mb-4 uppercase">{filteredRestaurants.length} Results</Text>
        
        {filteredRestaurants.map((restaurant) => (
          <TouchableOpacity 
            key={restaurant.id} 
            className="flex-row bg-white p-3 rounded-2xl shadow-sm mb-4 border border-gray-100 items-center"
            onPress={() => navigation.navigate('RestaurantProfile', { restaurantId: restaurant.id })}
          >
            <View className="h-20 w-20 bg-gray-200 rounded-xl mr-4 items-center justify-center">
               <Ionicons name="restaurant-outline" size={32} color="#9ca3af" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900 mb-1">{restaurant.name}</Text>
              <Text className="text-gray-500 text-sm mb-2">{restaurant.cuisine} • {restaurant.price}</Text>
              <View className="flex-row items-center">
                <Ionicons name="star" size={14} color="#eab308" className="mr-1" />
                <Text className="text-gray-700 font-bold text-sm mr-3">{restaurant.rating}</Text>
                <Ionicons name="location-outline" size={14} color="#9ca3af" className="mr-1" />
                <Text className="text-gray-500 text-sm">{restaurant.distance}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
