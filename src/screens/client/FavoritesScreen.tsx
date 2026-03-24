import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const MOCK_FAVORITES = [
  { id: '1', name: 'Pizza Palace', rating: 4.8, distance: '1.2 km', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80', tags: ['Pizza', 'Italian'] },
  { id: '3', name: 'Sushi Spot', rating: 4.9, distance: '3.1 km', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80', tags: ['Sushi', 'Japanese'] },
];

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      className="bg-white mx-5 mb-4 rounded-3xl overflow-hidden shadow-sm border border-gray-100"
      onPress={() => navigation.navigate('RestaurantProfile', { restaurantId: item.id })}
    >
      <Image source={{ uri: item.image }} className="w-full h-40" />
      <TouchableOpacity className="absolute top-3 right-3 bg-white/90 p-2 rounded-full">
        <Ionicons name="heart" size={20} color="#ef4444" />
      </TouchableOpacity>
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-xl font-bold text-gray-900">{item.name}</Text>
          <View className="flex-row items-center">
            <Ionicons name="star" size={14} color="#fbbf24" />
            <Text className="ml-1 font-bold text-gray-700">{item.rating}</Text>
          </View>
        </View>
        <Text className="text-gray-500 text-sm mb-2">{item.tags.join(' • ')}</Text>
        <View className="flex-row items-center">
          <Ionicons name="navigate-outline" size={14} color="#9ca3af" />
          <Text className="ml-1 text-gray-500 text-xs">{item.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb', paddingTop: insets.top }}>
      <View className="px-6 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">Saved Restaurants</Text>
      </View>
      
      {MOCK_FAVORITES.length > 0 ? (
        <FlatList
          data={MOCK_FAVORITES}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingVertical: 10, paddingBottom: insets.bottom + 20 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center p-6">
          <Ionicons name="heart-outline" size={80} color="#e5e7eb" />
          <Text className="text-xl font-bold text-gray-900 mt-4">No favorites yet</Text>
          <Text className="text-gray-500 text-center mt-2">Tap the heart icon on any restaurant to save it here!</Text>
        </View>
      )}
    </View>
  );
}
