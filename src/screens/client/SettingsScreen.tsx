import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from "nativewind";
import NotificationService from '../../services/NotificationService';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleNotificationToggle = (value: boolean) => {
    setIsNotificationsEnabled(value);
    NotificationService.setEnabled(value);
  };

  const SettingItem = ({ icon, label, children, value, onToggle }: any) => (
    <View className="flex-row items-center py-4.5 border-b border-gray-50">
      <View className="w-11 h-11 bg-gray-50 rounded-2xl items-center justify-center mr-4">
        <Feather name={icon} size={20} color="#1f2937" />
      </View>
      <Text className="flex-1 text-base font-bold text-gray-800">{label}</Text>
      {children ? children : (
        <Switch 
          value={value} 
          onValueChange={onToggle}
          trackColor={{ false: '#e5e7eb', true: '#fed7aa' }}
          thumbColor={value ? '#f97316' : '#f3f4f6'}
        />
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: Math.max(insets.top, 10) }}>
      <View className="px-6 py-2 flex-row items-center justify-between border-b border-gray-50">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-11 h-11 bg-gray-50 rounded-2xl items-center justify-center">
          <Feather name="chevron-left" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-black text-gray-900">Settings</Text>
        <View className="w-11" />
      </View>

      <ScrollView className="flex-1 px-6">
        <View className="mt-8">
          <Text className="text-gray-400 font-bold uppercase text-[10px] mb-4 tracking-widest px-1">Preferences</Text>
          <SettingItem icon="bell" label="Push Notifications" value={isNotificationsEnabled} onToggle={handleNotificationToggle} />
          <SettingItem icon="moon" label="Dark Mode" value={isDarkMode} onToggle={toggleColorScheme} />
          <SettingItem icon="globe" label="Language">
            <Text className="text-orange-600 font-bold text-xs uppercase">English (US)</Text>
          </SettingItem>
        </View>

        <View className="mt-10">
          <Text className="text-gray-400 font-bold uppercase text-[10px] mb-4 tracking-widest px-1">Security</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('ChangePassword')}
            className="flex-row items-center py-4.5 border-b border-gray-50"
          >
            <View className="w-11 h-11 bg-gray-50 rounded-2xl items-center justify-center mr-4">
              <Feather name="lock" size={20} color="#1f2937" />
            </View>
            <Text className="flex-1 text-base font-bold text-gray-800">Change Password</Text>
            <Feather name="chevron-right" size={18} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate('TwoFactorAuth')}
            className="flex-row items-center py-4.5 border-b border-gray-50"
          >
            <View className="w-11 h-11 bg-gray-50 rounded-2xl items-center justify-center mr-4">
              <Feather name="shield" size={20} color="#1f2937" />
            </View>
            <Text className="flex-1 text-base font-bold text-gray-800">Two-Factor Authentication</Text>
            <Feather name="chevron-right" size={18} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <View className="mt-10 mb-20">
          <Text className="text-gray-400 font-bold uppercase text-[10px] mb-4 tracking-widest px-1">Danger Zone</Text>
          <TouchableOpacity 
            onPress={() => Alert.alert('Delete Account', 'Are you sure you want to delete your account? This action cannot be undone.', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Delete', style: 'destructive' }
            ])}
            className="flex-row items-center py-4.5"
          >
            <View className="w-11 h-11 bg-red-50 rounded-2xl items-center justify-center mr-4">
              <Feather name="trash-2" size={20} color="#ef4444" />
            </View>
            <Text className="flex-1 text-base font-bold text-red-600">Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
