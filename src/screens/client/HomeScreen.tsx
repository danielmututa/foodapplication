import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { name: 'All', icon: 'fast-food-outline' },
  { name: 'Pizza', icon: 'pizza-outline' },
  { name: 'Burger', icon: 'hamburger-outline' },
  { name: 'Sushi', icon: 'water-outline' },
  { name: 'Dessert', icon: 'ice-cream-outline' },
  { name: 'Healthy', icon: 'leaf-outline' },
  { name: 'Vegan', icon: 'nutrition-outline' }
];

const NEW_PRODUCTS = [
  { id: 'n1', name: 'Truffle Pizza', price: 18.50, restaurant: 'Pizza Palace', image: 'https://images.unsplash.com/photo-1574129624519-0112702787e9?w=400&q=80', time: '5m ago' },
  { id: 'n2', name: 'Double Smash', price: 12.90, restaurant: 'Burger Bistro', image: 'https://images.unsplash.com/photo-1550317144-b38c2960a8a1?w=400&q=80', time: '8m ago' },
  { id: 'n3', name: 'Rainbow Roll', price: 15.00, restaurant: 'Sushi Spot', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80', time: '2m ago' },
];

const RESTAURANTS = [
  { id: '1', name: 'Pizza Palace', rating: 4.8, distance: '1.2 km', time: '15-20 min', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80', tags: ['Pizza', 'Italian'] },
  { id: '2', name: 'Burger Bistro', rating: 4.5, distance: '2.5 km', time: '25-30 min', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80', tags: ['Burger', 'Fast Food'] },
  { id: '3', name: 'Sushi Spot', rating: 4.9, distance: '3.1 km', time: '30-40 min', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80', tags: ['Sushi', 'Japanese'] },
];

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigation = useNavigation<any>();
  const { items } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  const filteredRestaurants = RESTAURANTS.filter(r => 
    activeCategory === 'All' || r.tags.includes(activeCategory)
  );

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-50 pt-10">
      <View className="px-5 pt-4 pb-2">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-gray-500 text-xs font-medium uppercase tracking-wider">Location</Text>
            <View className="flex-row items-center">
               <Text className="text-xl font-bold text-gray-900 mr-1">New York, NY</Text>
               <Ionicons name="location" size={18} color="#f97316" />
            </View>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity 
              className="mr-3 bg-white p-2.5 rounded-full shadow-sm border border-gray-100 relative"
              onPress={() => navigation.navigate('Cart')}
            >
              <Ionicons name="cart-outline" size={24} color="#1f2937" />
              {items.length > 0 && (
                <View className="absolute -top-1 -right-1 bg-orange-500 w-5 h-5 rounded-full items-center justify-center border-2 border-white">
                  <Text className="text-white text-[10px] font-bold">{items.length}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center overflow-hidden shadow-sm border-2 border-white"
              onPress={() => navigation.navigate('Profile')}
            >
               <Image source={{uri: user?.avatar || 'https://i.pravatar.cc/100'}} className="w-full h-full" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <TouchableOpacity 
          className="flex-row items-center bg-white border border-gray-100 p-4 rounded-2xl shadow-sm mb-6"
          onPress={() => navigation.navigate('Search')}
        >
          <Ionicons name="search-outline" size={20} color="#9ca3af" className="mr-3" />
          <Text className="flex-1 text-base text-gray-400 ml-2">Search for food or restaurants...</Text>
          <View className="bg-orange-500 p-2 rounded-xl">
             <Ionicons name="options-outline" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Categories */}
        <View className="mb-8 mt-4">
          <Text className="text-lg font-bold text-gray-900 px-5 mb-4">Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5">
            {CATEGORIES.map((cat, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveCategory(cat.name)}
                className={`mr-4 items-center`}
              >
                <View className={`w-16 h-16 rounded-2xl items-center justify-center mb-2 shadow-sm border ${
                  activeCategory === cat.name ? 'bg-orange-500 border-orange-600' : 'bg-white border-gray-100'
                }`}>
                   <Ionicons 
                    name={cat.icon as any} 
                    size={28} 
                    color={activeCategory === cat.name ? 'white' : '#4b5563'} 
                  />
                </View>
                <Text className={`text-xs font-bold ${activeCategory === cat.name ? 'text-orange-600' : 'text-gray-500'}`}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
            <View className="w-10" />
          </ScrollView>
        </View>

        {/* New Products Carousel */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-gray-900 px-5 mb-4">New Arrivals 🔥</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5">
            {NEW_PRODUCTS.map((product) => (
              <TouchableOpacity
                key={product.id}
                className="bg-white mr-4 p-3 rounded-3xl shadow-sm border border-gray-100 w-64"
              >
                <View className="relative">
                   <Image source={{ uri: product.image }} className="w-full h-32 rounded-2xl" resizeMode="cover" />
                   <View className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded-full">
                      <Text className="text-white text-[10px] font-bold">{product.time}</Text>
                   </View>
                </View>
                <View className="mt-3">
                   <Text className="font-bold text-gray-900 text-base">{product.name}</Text>
                   <Text className="text-gray-500 text-xs mb-2">{product.restaurant}</Text>
                   <View className="flex-row justify-between items-center">
                      <Text className="text-orange-500 font-extrabold text-lg">${product.price.toFixed(2)}</Text>
                      <TouchableOpacity className="bg-orange-500 p-2 rounded-full">
                         <Ionicons name="add" size={20} color="white" />
                      </TouchableOpacity>
                   </View>
                </View>
              </TouchableOpacity>
            ))}
            <View className="w-10" />
          </ScrollView>
        </View>

        {/* Popular Restaurants */}
        <View className="px-5 pb-32">
          <View className="flex-row justify-between items-center mb-5">
            <Text className="text-xl font-bold text-gray-900">Popular Near You</Text>
            <TouchableOpacity><Text className="text-orange-500 font-bold">See all</Text></TouchableOpacity>
          </View>

          {filteredRestaurants.length > 0 ? filteredRestaurants.map((restaurant) => (
            <TouchableOpacity 
              key={restaurant.id} 
              className="bg-white rounded-4xl shadow-sm mb-6 overflow-hidden border border-gray-100"
              onPress={() => navigation.navigate('RestaurantProfile', { restaurantId: restaurant.id })}
            >
              <View className="h-48 w-full bg-gray-200">
                <Image source={{ uri: restaurant.image }} className="w-full h-full" resizeMode="cover" />
                <View className="absolute top-4 right-4 flex-row gap-2">
                   <TouchableOpacity 
                     className="bg-white/90 p-2 rounded-full items-center justify-center shadow-sm"
                     onPress={() => toggleFavorite(restaurant.id)}
                   >
                     <Ionicons 
                       name={favorites.includes(restaurant.id) ? "heart" : "heart-outline"} 
                       size={20} 
                       color={favorites.includes(restaurant.id) ? "#ef4444" : "#4b5563"} 
                     />
                   </TouchableOpacity>
                   <View className="bg-white/90 px-3 py-1.5 rounded-full flex-row items-center shadow-sm">
                     <Ionicons name="star" size={14} color="#fbbf24" className="mr-1" />
                     <Text className="font-bold text-gray-800 text-sm ml-1">{restaurant.rating}</Text>
                   </View>
                </View>
              </View>
              <View className="p-6">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-2xl font-black text-gray-900">{restaurant.name}</Text>
                </View>
                <View className="flex-row items-center mb-4">
                   <Text className="text-gray-500 text-sm font-medium">{restaurant.tags.join(' • ')}</Text>
                </View>
                <View className="flex-row items-center border-t border-gray-50 pt-5">
                  <View className="flex-row items-center mr-6">
                    <Ionicons name="navigate-outline" size={16} color="#9ca3af" className="mr-1" />
                    <Text className="text-gray-600 font-bold text-xs ml-1">{restaurant.distance}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={16} color="#9ca3af" className="mr-1" />
                    <Text className="text-gray-600 font-bold text-xs ml-1">{restaurant.time}</Text>
                  </View>
                  <View className="flex-1 items-end">
                    <View className="bg-green-50 px-3 py-1.5 rounded-xl">
                      <Text className="text-green-600 font-extrabold text-[10px] uppercase">Free delivery</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )) : (
            <View className="items-center py-20">
               <Ionicons name="restaurant-outline" size={60} color="#e5e7eb" />
               <Text className="text-gray-400 mt-4 font-bold">No restaurants in this category</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
