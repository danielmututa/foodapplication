import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, Modal, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateProfileUser } from '../../store/authSlice';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootState, AppDispatch } from '../../store';

export default function ProfileScreen() {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || '',
  });

  const menuItems = [
    { icon: 'shopping-bag' as const, label: 'Order History', screen: 'Orders' },
    { icon: 'heart' as const, label: 'Saved Restaurants', screen: 'Favorites' },
    { icon: 'map-pin' as const, label: 'My Addresses', screen: 'Addresses' },
    { icon: 'credit-card' as const, label: 'Payment Methods', screen: 'Payments' },
    { icon: 'settings' as const, label: 'Account Settings', screen: 'Settings' },
    { icon: 'help-circle' as const, label: 'Help & Support', screen: 'Support' },
  ];

  const handleUpdateProfile = async () => {
    try {
      const resultAction = await dispatch(updateProfileUser(editForm));
      if (updateProfileUser.fulfilled.match(resultAction)) {
        Alert.alert('Success', 'Profile updated successfully!');
        setIsEditModalVisible(false);
      } else {
        Alert.alert('Error', resultAction.payload as string || 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: Math.max(insets.top, 10) }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 py-8 items-center border-b border-gray-50">
          <View className="relative">
            <View className="w-24 h-24 rounded-[32px] bg-orange-100 overflow-hidden border-4 border-white shadow-sm">
              <Image 
                source={{ uri: user?.avatar || 'https://i.pravatar.cc/150' }} 
                className="w-full h-full"
              />
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-2xl border-2 border-white">
              <Feather name="camera" size={14} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-2xl font-black text-gray-900 mt-4">{user?.name || 'User'}</Text>
          <Text className="text-gray-400 font-bold text-xs uppercase tracking-wider">{user?.email || 'user@example.com'}</Text>
          
          <TouchableOpacity 
            className="mt-5 bg-gray-900 px-8 py-3 rounded-2xl shadow-sm"
            onPress={() => {
              setEditForm({
                name: user?.name || '',
                phone: user?.phone || '',
                address: user?.address || '',
                bio: user?.bio || '',
              });
              setIsEditModalVisible(true);
            }}
          >
            <Text className="text-white font-black text-xs uppercase tracking-wider">Edit Profile</Text>
          </TouchableOpacity>
        </View>
 
        {/* Profile Info Summary */}
        {(user?.phone || user?.address || user?.bio) && (
          <View className="px-6 py-4 bg-gray-50 mx-6 mt-6 rounded-3xl">
            {user?.phone && (
              <View className="flex-row items-center mb-2">
                <Feather name="phone" size={14} color="#6b7280" />
                <Text className="text-gray-600 ml-2 font-medium">{user.phone}</Text>
              </View>
            )}
            {user?.address && (
              <View className="flex-row items-center mb-2">
                <Feather name="map-pin" size={14} color="#6b7280" />
                <Text className="text-gray-600 ml-2 font-medium">{user.address}</Text>
              </View>
            )}
            {user?.bio && (
              <View className="flex-row items-start">
                <Feather name="info" size={14} color="#6b7280" className="mt-1" />
                <Text className="text-gray-600 ml-2 flex-1 italic">{user.bio}</Text>
              </View>
            )}
          </View>
        )}

        {/* Menu Items */}
        <View className="px-6 py-6">
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              className="flex-row items-center py-4.5 border-b border-gray-50"
              onPress={() => navigation.navigate(item.screen)}
            >
              <View className="w-11 h-11 bg-gray-50 rounded-2xl items-center justify-center mr-4">
                <Feather name={item.icon} size={20} color="#1f2937" />
              </View>
              <Text className="flex-1 text-base font-bold text-gray-800">{item.label}</Text>
              <Feather name="chevron-right" size={18} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>
 
        {/* Logout */}
        <View className="px-6 pt-4 pb-12" style={{ marginBottom: insets.bottom + 100 }}>
          <TouchableOpacity 
            onPress={() => {
              Alert.alert(
                'Sign Out',
                'Are you sure you want to sign out?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Sign Out', style: 'destructive', onPress: () => dispatch(logout()) }
                ]
              );
            }}
            className="flex-row items-center justify-center bg-red-50 py-4.5 rounded-2xl border border-red-100"
          >
            <Feather name="log-out" size={18} color="#ef4444" />
            <Text className="text-red-600 font-black ml-3 uppercase text-xs tracking-wider">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-[40px] p-8" style={{ paddingBottom: insets.bottom + 40 }}>
            <View className="flex-row justify-between items-center mb-8">
              <Text className="text-2xl font-black text-gray-900">Edit Profile</Text>
              <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
                <Feather name="x" size={24} color="#1f2937" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="mb-6">
                <Text className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</Text>
                <TextInput
                  className="bg-gray-50 p-5 rounded-2xl text-gray-900 font-bold border border-gray-100"
                  value={editForm.name}
                  onChangeText={(text) => setEditForm({ ...editForm, name: text })}
                  placeholder="Your Name"
                />
              </View>

              <View className="mb-6">
                <Text className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</Text>
                <TextInput
                  className="bg-gray-50 p-5 rounded-2xl text-gray-900 font-bold border border-gray-100"
                  value={editForm.phone}
                  onChangeText={(text) => setEditForm({ ...editForm, phone: text })}
                  placeholder="+1 234 567 890"
                  keyboardType="phone-pad"
                />
              </View>

              <View className="mb-6">
                <Text className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Delivery Address</Text>
                <TextInput
                  className="bg-gray-50 p-5 rounded-2xl text-gray-900 font-bold border border-gray-100"
                  value={editForm.address}
                  onChangeText={(text) => setEditForm({ ...editForm, address: text })}
                  placeholder="123 Street Name, City"
                />
              </View>

              <View className="mb-8">
                <Text className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Bio</Text>
                <TextInput
                  className="bg-gray-50 p-5 rounded-2xl text-gray-900 font-bold border border-gray-100"
                  value={editForm.bio}
                  onChangeText={(text) => setEditForm({ ...editForm, bio: text })}
                  placeholder="A little bit about you..."
                  multiline
                  numberOfLines={3}
                  style={{ textAlignVertical: 'top' }}
                />
              </View>

              <TouchableOpacity 
                className="bg-orange-500 py-5 rounded-[24px] items-center shadow-xl shadow-orange-200"
                onPress={handleUpdateProfile}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-black uppercase tracking-widest">Save Changes</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
