import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function MenuManagementScreen() {
  const [activeCategory, setActiveCategory] = useState('All');

  const menuItems = [
    { id: '1', name: 'Truffle Pizza', category: 'Main', price: '$18.50', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591' },
    { id: '2', name: 'Classic Burger', category: 'Main', price: '$12.90', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd' },
    { id: '3', name: 'Ceasar Salad', category: 'Appetizer', price: '$9.00', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-12 pb-4 border-b border-gray-100 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-gray-900">Menu Management</Text>
        <TouchableOpacity className="bg-orange-500 p-2 rounded-full shadow-lg shadow-orange-200">
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 py-6 max-h-24">
        {['All', 'Appetizers', 'Main Courses', 'Desserts', 'Drinks'].map((cat) => (
          <TouchableOpacity 
            key={cat} 
            onPress={() => setActiveCategory(cat)}
            className={`mr-4 px-6 py-2.5 rounded-2xl border ${activeCategory === cat ? 'bg-orange-500 border-orange-500 shadow-md shadow-orange-200' : 'bg-white border-gray-100 shadow-sm'}`}
          >
            <Text className={`font-black text-xs uppercase tracking-tighter ${activeCategory === cat ? 'text-white' : 'text-gray-400'}`}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView className="flex-1 px-6">
        <View className="mt-4">
          {menuItems.map((item) => (
            <View key={item.id} className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100 overflow-hidden flex-row">
              <Image source={{ uri: item.image }} className="w-24 h-24" />
              <View className="flex-1 p-3 justify-between">
                <View>
                  <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
                  <Text className="text-gray-500 text-xs">{item.category}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-orange-500 font-bold">{item.price}</Text>
                  <View className="flex-row">
                    <TouchableOpacity className="bg-gray-100 p-2 rounded-lg mr-2">
                      <Ionicons name="create-outline" size={18} color="#374151" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-red-50 p-2 rounded-lg">
                      <Ionicons name="trash-outline" size={18} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
