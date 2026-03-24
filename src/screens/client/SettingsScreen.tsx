import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const SettingItem = ({ icon, label, children, value, onToggle }: any) => (
    <View className="flex-row items-center py-4 border-b border-gray-50">
      <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-4">
        <Ionicons name={icon} size={20} color="#4b5563" />
      </View>
      <Text className="flex-1 text-base font-medium text-gray-700">{label}</Text>
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
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: insets.top }}>
      <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">Account Settings</Text>
      </View>

      <ScrollView className="flex-1 px-6">
        <View className="mt-8">
          <Text className="text-gray-400 font-bold uppercase text-[10px] mb-4 tracking-widest">Preferences</Text>
          <SettingItem icon="notifications-outline" label="Push Notifications" value={isNotificationsEnabled} onToggle={setIsNotificationsEnabled} />
          <SettingItem icon="moon-outline" label="Dark Mode" value={isDarkMode} onToggle={setIsDarkMode} />
          <SettingItem icon="globe-outline" label="Language">
            <Text className="text-orange-600 font-bold">English (US)</Text>
          </SettingItem>
        </View>

        <View className="mt-10">
          <Text className="text-gray-400 font-bold uppercase text-[10px] mb-4 tracking-widest">Security</Text>
          <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-50">
            <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-4">
              <Ionicons name="lock-closed-outline" size={20} color="#4b5563" />
            </View>
            <Text className="flex-1 text-base font-medium text-gray-700">Change Password</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-50">
            <View className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-4">
              <Ionicons name="shield-checkmark-outline" size={20} color="#4b5563" />
            </View>
            <Text className="flex-1 text-base font-medium text-gray-700">Two-Factor Authentication</Text>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <View className="mt-10 mb-20">
          <Text className="text-gray-400 font-bold uppercase text-[10px] mb-4 tracking-widest">Data</Text>
          <TouchableOpacity className="flex-row items-center py-4">
            <View className="w-10 h-10 bg-red-50 rounded-xl items-center justify-center mr-4">
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
            </View>
            <Text className="flex-1 text-base font-medium text-red-600">Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
