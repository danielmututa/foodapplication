import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { updateRestaurantLocation, fetchMyRestaurant } from '../../store/restaurantSlice';

export default function LocationManagementScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { myRestaurant, loading } = useSelector((state: RootState) => state.restaurants);
  
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    if (myRestaurant) {
      setLatitude(myRestaurant.latitude?.toString() || '');
      setLongitude(myRestaurant.longitude?.toString() || '');
    } else {
      dispatch(fetchMyRestaurant());
    }
  }, [myRestaurant]);

  const handleGetCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude.toString());
      setLongitude(location.coords.longitude.toString());
      Alert.alert('Success', 'Coordinates captured from GPS!');
    } catch (error) {
      Alert.alert('Error', 'Failed to get current location');
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleSaveLocation = async () => {
    if (!myRestaurant?.id) return;
    if (!latitude || !longitude) {
      Alert.alert('Error', 'Latitude and Longitude are required');
      return;
    }

    try {
      const result = await dispatch(updateRestaurantLocation({
        id: myRestaurant.id.toString(),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      }));

      if (updateRestaurantLocation.fulfilled.match(result)) {
        Alert.alert('Success', 'Location coordinates updated successfully!');
      } else {
        Alert.alert('Error', (result.payload as string) || 'Failed to update location');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-12">
        <View className="flex-row justify-between items-center mb-8">
          <Text className="text-2xl font-bold text-gray-900">Location Details</Text>
        </View>

        <View className="bg-gray-50 p-6 rounded-3xl mb-8">
            <View className="mb-4">
                <Text className="text-gray-400 text-xs font-bold uppercase mb-2">Current Address</Text>
                <Text className="text-lg font-bold text-gray-900">{myRestaurant?.address || 'Loading...'}</Text>
                <Text className="text-gray-500 text-sm">{myRestaurant?.city}</Text>
            </View>
        </View>

        <View className="mb-8">
            <Text className="text-lg font-bold text-gray-900 mb-4">Location Coordinates</Text>
            <View className="bg-orange-50 p-6 rounded-3xl border border-orange-100 mb-4">
                <View className="mb-4">
                    <Text className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Latitude</Text>
                    <TextInput
                      className="bg-white p-4 rounded-2xl text-gray-900 font-bold border border-orange-100"
                      value={latitude}
                      onChangeText={setLatitude}
                      placeholder="e.g. 40.7128"
                      keyboardType="numeric"
                    />
                </View>

                <View className="mb-4">
                    <Text className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Longitude</Text>
                    <TextInput
                      className="bg-white p-4 rounded-2xl text-gray-900 font-bold border border-orange-100"
                      value={longitude}
                      onChangeText={setLongitude}
                      placeholder="e.g. -74.0060"
                      keyboardType="numeric"
                    />
                </View>

                <TouchableOpacity 
                    className="bg-orange-500 py-4 rounded-2xl flex-row justify-center items-center shadow-sm"
                    onPress={handleGetCurrentLocation}
                    disabled={isGettingLocation}
                >
                    {isGettingLocation ? (
                        <ActivityIndicator color="white" size="small" />
                    ) : (
                        <>
                            <Ionicons name="location" size={20} color="white" />
                            <Text className="text-white font-bold ml-2">Generate from GPS</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
                className="bg-gray-900 py-5 rounded-[24px] items-center shadow-xl"
                onPress={handleSaveLocation}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text className="text-white font-black uppercase tracking-widest">Update Coordinates</Text>
                )}
            </TouchableOpacity>
        </View>

        <View className="mb-8">
            <Text className="text-lg font-bold text-gray-900 mb-4">Contact Information</Text>
            <View className="bg-gray-50 p-6 rounded-3xl">
                <View className="mb-4">
                    <Text className="text-gray-400 text-xs font-bold uppercase mb-1">Business Phone</Text>
                    <Text className="text-gray-900 font-bold">{myRestaurant?.owner?.phone || 'Not set'}</Text>
                </View>
                <View>
                    <Text className="text-gray-400 text-xs font-bold uppercase mb-1">Business Email</Text>
                    <Text className="text-gray-900 font-bold">{myRestaurant?.owner?.email || 'Not set'}</Text>
                </View>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
