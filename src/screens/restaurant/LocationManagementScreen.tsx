import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function LocationManagementScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-12">
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-2xl font-bold text-gray-900">Location & Branches</Text>
          <TouchableOpacity className="bg-orange-500 p-2 rounded-full">
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="bg-gray-50 p-6 rounded-3xl mb-8">
            <View className="flex-row justify-between items-start mb-4">
                <View>
                    <Text className="text-lg font-bold text-gray-900">Main Branch</Text>
                    <Text className="text-gray-500 text-sm">123 Main St, New York, NY</Text>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                    <Text className="text-green-600 text-xs font-bold">Open</Text>
                </View>
            </View>

            <View className="mb-4">
                <Text className="text-gray-400 text-xs font-bold uppercase mb-2">Business Hours</Text>
                <Text className="text-gray-700 font-medium">Mon - Sun: 08:00 AM - 10:00 PM</Text>
            </View>

            <View className="flex-row">
                <TouchableOpacity className="flex-1 bg-white border border-gray-100 py-3 rounded-xl items-center mr-2">
                    <Text className="text-gray-600 font-bold">Edit Details</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-white border border-gray-100 py-3 rounded-xl items-center">
                    <Text className="text-gray-600 font-bold">Manage Staff</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View className="mb-8">
            <Text className="text-lg font-bold text-gray-900 mb-4">Location Coordinates</Text>
            <View className="bg-orange-50 p-6 rounded-3xl border border-orange-100 flex-row justify-between items-center">
                <View className="flex-1 mr-4">
                    <Text className="text-orange-900 font-bold mb-1">Lat: 40.7128, Long: -74.0060</Text>
                    <Text className="text-orange-600 text-xs">Accurate to 5 meters</Text>
                </View>
                <TouchableOpacity 
                    className="bg-orange-500 p-3 rounded-2xl shadow-sm"
                    onPress={() => alert('GPS Coordinates Updated!')}
                >
                    <Ionicons name="location" size={20} color="white" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity className="mt-3 self-center">
                <Text className="text-orange-500 font-bold text-xs underline">Verify on Map</Text>
            </TouchableOpacity>
        </View>

        <View className="mb-8">
            <Text className="text-lg font-bold text-gray-900 mb-4">Contact Information</Text>
            <View className="bg-gray-50 p-6 rounded-3xl">
                <View className="mb-4">
                    <Text className="text-gray-400 text-xs font-bold uppercase mb-1">Phone Number</Text>
                    <Text className="text-gray-900 font-bold">+1 (212) 555-0198</Text>
                </View>
                <View>
                    <Text className="text-gray-400 text-xs font-bold uppercase mb-1">Support Email</Text>
                    <Text className="text-gray-900 font-bold">support@pizzapalace.com</Text>
                </View>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
