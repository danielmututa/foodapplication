import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function ChangePasswordScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }
    
    // Mock update logic
    Alert.alert('Success', 'Password updated successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: Math.max(insets.top, 10) }}>
      <View className="px-6 py-2 flex-row items-center justify-between border-b border-gray-50">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-11 h-11 bg-gray-50 rounded-2xl items-center justify-center">
          <Feather name="chevron-left" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-black text-gray-900">Change Password</Text>
        <View className="w-11" />
      </View>

      <ScrollView className="flex-1 px-6 pt-8">
        <Text className="text-gray-400 font-bold uppercase text-[10px] mb-6 tracking-widest px-1">Update your password</Text>
        
        <View className="mb-6">
          <Text className="text-gray-700 font-bold mb-2 ml-1 text-xs">Current Password</Text>
          <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 border border-gray-100">
            <Feather name="lock" size={18} color="#9ca3af" />
            <TextInput
              className="flex-1 py-4 ml-3 text-gray-900 font-medium"
              placeholder="Enter current password"
              secureTextEntry={!showCurrent}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
              <Feather name={showCurrent ? "eye-off" : "eye"} size={18} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-gray-700 font-bold mb-2 ml-1 text-xs">New Password</Text>
          <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 border border-gray-100">
            <Feather name="shield" size={18} color="#9ca3af" />
            <TextInput
              className="flex-1 py-4 ml-3 text-gray-900 font-medium"
              placeholder="Enter new password"
              secureTextEntry={!showNew}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNew(!showNew)}>
              <Feather name={showNew ? "eye-off" : "eye"} size={18} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mb-10">
          <Text className="text-gray-700 font-bold mb-2 ml-1 text-xs">Confirm New Password</Text>
          <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 border border-gray-100">
            <Feather name="check-circle" size={18} color="#9ca3af" />
            <TextInput
              className="flex-1 py-4 ml-3 text-gray-900 font-medium"
              placeholder="Confirm new password"
              secureTextEntry={!showNew}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
        </View>

        <TouchableOpacity 
          onPress={handleUpdate}
          className="bg-orange-500 py-4.5 rounded-[24px] items-center shadow-lg shadow-orange-200"
        >
          <Text className="text-white font-black uppercase text-sm tracking-widest">Update Password</Text>
        </TouchableOpacity>

        <View className="mt-8 items-center">
            <Text className="text-gray-400 text-[10px] text-center px-10">
                Changing your password will log you out of all other active sessions for your security.
            </Text>
        </View>
      </ScrollView>
    </View>
  );
}
