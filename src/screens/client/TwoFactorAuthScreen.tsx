import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function TwoFactorAuthScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggle2FA = (value: boolean) => {
    setIsEnabled(value);
    if (value) {
      Alert.alert(
        '2FA Enabled',
        'Secure your account with two-factor authentication. You will be prompted for a code on login.',
        [{ text: 'Setup Now', onPress: () => {} }, { text: 'Later', style: 'cancel' }]
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: Math.max(insets.top, 10) }}>
      <View className="px-6 py-2 flex-row items-center justify-between border-b border-gray-50">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-11 h-11 bg-gray-50 rounded-2xl items-center justify-center">
          <Feather name="chevron-left" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-black text-gray-900">Security</Text>
        <View className="w-11" />
      </View>

      <ScrollView className="flex-1 px-6 pt-8">
        <View className="bg-orange-50 p-6 rounded-[32px] mb-8 border border-orange-100 flex-row items-center">
          <View className="w-14 h-14 bg-white rounded-2xl items-center justify-center mr-4 shadow-sm border border-orange-100">
             <Feather name="shield" size={28} color="#f97316" />
          </View>
          <View className="flex-1">
             <Text className="text-gray-900 font-black text-base">Two-Factor Auth</Text>
             <Text className="text-gray-500 text-xs mt-1">Add an extra layer of security to your account.</Text>
          </View>
        </View>

        <Text className="text-gray-400 font-bold uppercase text-[10px] mb-4 tracking-widest px-1">Settings</Text>

        <View className="flex-row items-center justify-between bg-gray-50 p-6 rounded-[24px] border border-gray-100 mb-6">
          <View className="flex-1 mr-4">
             <Text className="text-gray-900 font-bold text-sm">Two-Factor Authentication</Text>
             <Text className="text-gray-400 text-[10px] mt-1">Protect your account with a secondary verification code.</Text>
          </View>
          <Switch 
            value={isEnabled} 
            onValueChange={toggle2FA}
            trackColor={{ false: '#e5e7eb', true: '#fed7aa' }}
            thumbColor={isEnabled ? '#f97316' : '#f3f4f6'}
          />
        </View>

        <View className="mt-4">
           <Text className="text-gray-400 font-bold uppercase text-[10px] mb-4 tracking-widest px-1">Methods</Text>
           
           <TouchableOpacity className="flex-row items-center p-5 bg-white border border-gray-100 rounded-[24px] mb-4 opacity-50">
              <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-4">
                 <Feather name="smartphone" size={18} color="#9ca3af" />
              </View>
              <View className="flex-1">
                 <Text className="text-gray-900 font-bold text-sm">SMS Verification</Text>
                 <Text className="text-gray-400 text-[10px] mt-0.5">Available soon</Text>
              </View>
              <Feather name="chevron-right" size={16} color="#e5e7eb" />
           </TouchableOpacity>

           <TouchableOpacity className="flex-row items-center p-5 bg-white border border-gray-100 rounded-[24px] opacity-50">
              <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-4">
                 <Feather name="mail" size={18} color="#9ca3af" />
              </View>
              <View className="flex-1">
                 <Text className="text-gray-900 font-bold text-sm">Email Verification</Text>
                 <Text className="text-gray-400 text-[10px] mt-0.5">Available soon</Text>
              </View>
              <Feather name="chevron-right" size={16} color="#e5e7eb" />
           </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
