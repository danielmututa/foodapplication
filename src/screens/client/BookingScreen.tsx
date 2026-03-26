import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NotificationService from '../../services/NotificationService';

export default function BookingScreen({ navigation, route }: any) {
  const insets = useSafeAreaInsets();
  const { restaurantName } = route.params || { restaurantName: 'Restaurant' };
  
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('24 Mar');
  const [time, setTime] = useState('07:30 PM');

  const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];
  const TIME_SLOTS = ['06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM'];

  const handleBooking = () => {
    NotificationService.notifyBookingSuccess(restaurantName);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: Math.max(insets.top, 10) }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        {/* Header */}
        <View className="px-6 py-2 flex-row items-center justify-between border-b border-gray-50">
          <TouchableOpacity onPress={() => navigation.goBack()} className="w-11 h-11 bg-gray-50 rounded-2xl items-center justify-center">
            <Feather name="chevron-left" size={24} color="#1f2937" />
          </TouchableOpacity>
          <View className="items-center">
            <Text className="text-xl font-black text-gray-900">Book a Table</Text>
            <Text className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">{restaurantName}</Text>
          </View>
          <View className="w-11" />
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          <View className="py-8">
            <Text className="text-gray-400 font-bold uppercase text-[10px] mb-4 tracking-widest px-1">Number of Guests</Text>
            <View className="flex-row flex-wrap">
              {GUEST_OPTIONS.map((num) => (
                <TouchableOpacity 
                  key={num}
                  onPress={() => setGuests(num)}
                  className={`w-12 h-12 rounded-2xl items-center justify-center mr-3 mb-3 border ${
                    guests === num ? 'bg-orange-500 border-orange-600 shadow-sm' : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <Text className={`font-black ${guests === num ? 'text-white' : 'text-gray-700'}`}>{num}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity className="w-12 h-12 rounded-2xl items-center justify-center mr-3 mb-3 bg-gray-50 border border-gray-100">
                <Feather name="plus" size={16} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <Text className="text-gray-400 font-bold uppercase text-[10px] mt-8 mb-4 tracking-widest px-1">Select Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
              {['24 Mar', '25 Mar', '26 Mar', '27 Mar'].map((d) => (
                <TouchableOpacity 
                  key={d}
                  onPress={() => setDate(d)}
                  className={`px-8 py-4 rounded-[24px] mr-3 border ${
                    date === d ? 'bg-orange-500 border-orange-600 shadow-sm' : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <Text className={`font-black ${date === d ? 'text-white' : 'text-gray-700'}`}>{d}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text className="text-gray-400 font-bold uppercase text-[10px] mt-8 mb-4 tracking-widest px-1">Select Time</Text>
            <View className="flex-row flex-wrap">
              {TIME_SLOTS.map((t) => (
                <TouchableOpacity 
                  key={t}
                  onPress={() => setTime(t)}
                  className={`px-6 py-3.5 rounded-2xl mr-3 mb-3 border ${
                    time === t ? 'bg-orange-500 border-orange-600 shadow-sm' : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <Text className={`font-black text-xs ${time === t ? 'text-white' : 'text-gray-700'}`}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-gray-400 font-bold uppercase text-[10px] mt-8 mb-4 tracking-widest px-1">Special Requests</Text>
            <TextInput 
              className="bg-gray-50 p-5 rounded-[24px] border border-gray-100 text-gray-800 font-medium h-32"
              placeholder="e.g. Birthday celebration, window seat..."
              placeholderTextColor="#9ca3af"
              multiline
              textAlignVertical="top"
            />
            <View className="h-20" />
          </View>
        </ScrollView>

        <View className="px-6 py-8 border-t border-gray-50 bg-white" style={{ paddingBottom: Math.max(insets.bottom, 20) }}>
          <TouchableOpacity 
            onPress={handleBooking}
            className="bg-orange-500 py-5 rounded-[24px] items-center shadow-lg shadow-orange-200"
          >
            <Text className="text-white text-base font-black uppercase tracking-widest">Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
