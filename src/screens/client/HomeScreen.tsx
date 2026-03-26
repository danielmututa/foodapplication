import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootState } from '../../store';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { name: 'All', icon: 'grid-outline', provider: Ionicons },
  { name: 'Pizza', icon: 'pizza-outline', provider: Ionicons },
  { name: 'Burger', icon: 'fast-food', provider: Ionicons },
  { name: 'Sushi', icon: 'water-outline', provider: Ionicons },
  { name: 'Dessert', icon: 'ice-cream-outline', provider: Ionicons },
  { name: 'Healthy', icon: 'leaf-outline', provider: Ionicons },
  { name: 'Vegan', icon: 'nutrition-outline', provider: Ionicons }
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
  const insets = useSafeAreaInsets();
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
    <View style={{ flex: 1, backgroundColor: '#f9fafb', paddingTop: Math.max(insets.top, 10) }}>
      <View className="px-5 pt-2 pb-2">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-[2px] mb-1">Pick up at</Text>
            <TouchableOpacity className="flex-row items-center">
               <Text className="text-lg font-extrabold text-gray-900 mr-1">New York, NY</Text>
               <Feather name="chevron-down" size={14} color="#f97316" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity 
              className="mr-3 bg-white p-2.5 rounded-2xl shadow-sm border border-gray-100 relative"
              onPress={() => navigation.navigate('Cart')}
            >
              <Feather name="shopping-bag" size={20} color="#1f2937" />
              {items.length > 0 && (
                <View className="absolute -top-1 -right-1 bg-orange-500 w-5 h-5 rounded-full items-center justify-center border-2 border-white">
                  <Text className="text-white text-[10px] font-bold">{items.length}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              className="w-11 h-11 bg-gray-200 rounded-2xl items-center justify-center overflow-hidden shadow-sm border-2 border-white"
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
          <Feather name="search" size={18} color="#9ca3af" />
          <Text className="flex-1 text-sm text-gray-400 ml-3">Search for food or restaurants...</Text>
          <View className="bg-orange-500 p-1.5 rounded-lg">
             <Feather name="sliders" size={16} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Categories */}
        <View className="mb-8 mt-2">
          <View className="flex-row justify-between items-center px-5 mb-4">
            <Text className="text-lg font-black text-gray-900">Categories</Text>
            <TouchableOpacity><Text className="text-orange-500 font-bold text-xs">See all</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5">
            {CATEGORIES.map((cat, index) => {
              const IconProvider = cat.provider as any;
              return (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveCategory(cat.name)}
                className={`mr-5 items-center`}
              >
                <View className={`w-14 h-14 rounded-2xl items-center justify-center mb-2 shadow-sm border ${
                  activeCategory === cat.name ? 'bg-orange-500 border-orange-600' : 'bg-white border-gray-100'
                }`}>
                   <IconProvider 
                    name={cat.icon as any} 
                    size={24} 
                    color={activeCategory === cat.name ? 'white' : '#4b5563'} 
                  />
                </View>
                <Text className={`text-[10px] font-extrabold ${activeCategory === cat.name ? 'text-orange-600' : 'text-gray-400'} uppercase tracking-wider`}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            )})}
            <View className="w-10" />
          </ScrollView>
        </View>

        {/* New Products Carousel */}
        <View className="mb-8">
          <Text className="text-lg font-black text-gray-900 px-5 mb-4">New Arrivals 🔥</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5">
            {NEW_PRODUCTS.map((product) => (
              <TouchableOpacity
                key={product.id}
                className="bg-white mr-4 p-3 rounded-[32px] shadow-sm border border-gray-100 w-60"
              >
                <View className="relative">
                   <Image source={{ uri: product.image }} className="w-full h-32 rounded-[24px]" resizeMode="cover" />
                   <View className="absolute top-2 right-2 bg-black/60 px-2.5 py-1 rounded-full">
                      <Text className="text-white text-[9px] font-bold">{product.time}</Text>
                   </View>
                </View>
                <View className="mt-3 px-1">
                   <Text className="font-extrabold text-gray-900 text-sm">{product.name}</Text>
                   <Text className="text-gray-400 text-[10px] mb-2 font-medium">{product.restaurant}</Text>
                   <View className="flex-row justify-between items-center">
                      <Text className="text-gray-900 font-black text-base">${product.price.toFixed(2)}</Text>
                      <TouchableOpacity className="bg-orange-500 p-2 rounded-xl">
                         <Feather name="plus" size={16} color="white" />
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
            <Text className="text-lg font-black text-gray-900">Popular Near You</Text>
            <TouchableOpacity><Text className="text-orange-500 font-bold text-xs">View map</Text></TouchableOpacity>
          </View>

          {filteredRestaurants.length > 0 ? filteredRestaurants.map((restaurant) => (
            <TouchableOpacity 
              key={restaurant.id} 
              className="bg-white rounded-[32px] shadow-sm mb-6 overflow-hidden border border-gray-50"
              onPress={() => navigation.navigate('RestaurantProfile', { restaurantId: restaurant.id })}
            >
              <View className="h-44 w-full bg-gray-200">
                <Image source={{ uri: restaurant.image }} className="w-full h-full" resizeMode="cover" />
                <View className="absolute top-4 right-4 flex-row gap-2">
                   <TouchableOpacity 
                     className="bg-white/90 p-2 rounded-2xl items-center justify-center shadow-sm"
                     onPress={() => toggleFavorite(restaurant.id)}
                   >
                     <Ionicons 
                       name={favorites.includes(restaurant.id) ? "heart" : "heart-outline"} 
                       size={18} 
                       color={favorites.includes(restaurant.id) ? "#ef4444" : "#1f2937"} 
                     />
                   </TouchableOpacity>
                   <View className="bg-white/90 px-3 py-1.5 rounded-2xl flex-row items-center shadow-sm">
                     <Ionicons name="star" size={12} color="#f59e0b" />
                     <Text className="font-black text-gray-900 text-xs ml-1">{restaurant.rating}</Text>
                   </View>
                </View>
              </View>
              <View className="p-5">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-xl font-black text-gray-900">{restaurant.name}</Text>
                </View>
                <View className="flex-row items-center mb-4">
                   <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider">{restaurant.tags.join(' • ')}</Text>
                </View>
                <View className="flex-row items-center border-t border-gray-50 pt-4">
                  <View className="flex-row items-center mr-5">
                    <Feather name="map-pin" size={12} color="#f97316" />
                    <Text className="text-gray-900 font-extrabold text-[10px] ml-1.5">{restaurant.distance}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Feather name="clock" size={12} color="#f97316" />
                    <Text className="text-gray-900 font-extrabold text-[10px] ml-1.5">{restaurant.time}</Text>
                  </View>
                  <View className="flex-1 items-end">
                    <View className="bg-orange-50 px-2.5 py-1 rounded-lg">
                      <Text className="text-orange-600 font-black text-[9px] uppercase">Free Delivery</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )) : (
            <View className="items-center py-20">
               <Feather name="info" size={40} color="#e5e7eb" />
               <Text className="text-gray-400 mt-4 font-bold">No restaurants in this category</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
