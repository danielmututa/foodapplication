import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ReviewsScreen() {
  const reviews = [
    { id: '1', user: 'Alex Johnson', rating: 5, comment: 'The best pizza in NY! Highly recommend the Truffle one.', date: '2 hours ago' },
    { id: '2', user: 'Sam Lee', rating: 4, comment: 'Great service, but the wait time was a bit long.', date: 'Yesterday' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-12">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-gray-900">Customer Reviews</Text>
          <View className="flex-row items-center bg-orange-50 px-3 py-1 rounded-full">
            <Ionicons name="star" size={16} color="#f97316" />
            <Text className="text-orange-600 font-bold ml-1">4.8</Text>
          </View>
        </View>

        {reviews.map((review) => (
          <View key={review.id} className="bg-gray-50 p-5 rounded-3xl mb-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-900 font-bold text-base">{review.user}</Text>
              <Text className="text-gray-400 text-xs">{review.date}</Text>
            </View>
            <View className="flex-row mb-3">
              {[...Array(5)].map((_, i) => (
                <Ionicons key={i} name={i < review.rating ? "star" : "star-outline"} size={14} color="#f97316" />
              ))}
            </View>
            <Text className="text-gray-600 mb-4 italic">"{review.comment}"</Text>
            
            <TouchableOpacity className="bg-white border border-gray-100 py-2 rounded-xl items-center">
              <Text className="text-orange-500 font-bold text-sm">Respond to Feedback</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
