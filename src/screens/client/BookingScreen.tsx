import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BookingScreen({ navigation, route }: any) {
  const insets = useSafeAreaInsets();
  const { restaurantName } = route.params || { restaurantName: 'Restaurant' };
  
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('24 Mar');
  const [time, setTime] = useState('07:30 PM');

  const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];
  const TIME_SLOTS = ['06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM'];

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: insets.top }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        {/* Header */}
        <View className="px-6 py-4 flex-row items-center border-b border-gray-50">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>
          <View>
            <Text className="text-xl font-bold text-gray-900">Book a Table</Text>
            <Text className="text-gray-500 text-xs">{restaurantName}</Text>
          </View>
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          <View className="py-8">
            <Text className="text-lg font-bold text-gray-900 mb-4">Number of Guests</Text>
            <View className="flex-row flex-wrap">
              {GUEST_OPTIONS.map((num) => (
                <TouchableOpacity 
                  key={num}
                  onPress={() => setGuests(num)}
                  className={`w-12 h-12 rounded-2xl items-center justify-center mr-3 mb-3 border ${
                    guests === num ? 'bg-orange-500 border-orange-600 shadow-sm' : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <Text className={`font-bold ${guests === num ? 'text-white' : 'text-gray-700'}`}>{num}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity className="w-12 h-12 rounded-2xl items-center justify-center mr-3 mb-3 bg-gray-50 border border-gray-100">
                <Text className="text-gray-400 font-bold">+</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-lg font-bold text-gray-900 mt-8 mb-4">Select Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
              {['24 Mar', '25 Mar', '26 Mar', '27 Mar'].map((d) => (
                <TouchableOpacity 
                  key={d}
                  onPress={() => setDate(d)}
                  className={`px-6 py-4 rounded-3xl mr-3 border ${
                    date === d ? 'bg-orange-500 border-orange-600 shadow-sm' : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <Text className={`font-bold ${date === d ? 'text-white' : 'text-gray-700'}`}>{d}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text className="text-lg font-bold text-gray-900 mt-8 mb-4">Select Time</Text>
            <View className="flex-row flex-wrap">
              {TIME_SLOTS.map((t) => (
                <TouchableOpacity 
                  key={t}
                  onPress={() => setTime(t)}
                  className={`px-5 py-3 rounded-2xl mr-3 mb-3 border ${
                    time === t ? 'bg-orange-500 border-orange-600 shadow-sm' : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <Text className={`font-bold ${time === t ? 'text-white' : 'text-gray-700'}`}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-lg font-bold text-gray-900 mt-8 mb-4">Special Requests (Optional)</Text>
            <TextInput 
              className="bg-gray-50 p-4 rounded-3xl border border-gray-100 text-gray-800 text-base h-32"
              placeholder="e.g. Birthday celebration, window seat, allergies..."
              placeholderTextColor="#9ca3af"
              multiline
              textAlignVertical="top"
            />
            <View className="h-20" />
          </View>
        </ScrollView>

        <View className="px-6 py-8 border-t border-gray-50 bg-white" style={{ paddingBottom: insets.bottom + 20 }}>
          <TouchableOpacity 
            onPress={() => {
              Alert.alert('Booking Confirmed', `Table Booked for ${guests} people on ${date} at ${time}`);
              navigation.goBack();
            }}
            className="bg-orange-500 py-5 rounded-2xl items-center shadow-lg shadow-orange-200"
          >
            <Text className="text-white text-lg font-bold">Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
