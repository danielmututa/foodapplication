import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, googleLoginUser, clearError } from '../../store/authSlice';
import { AppDispatch, RootState } from '../../store';
import notificationService from '../../services/NotificationService';
import { Ionicons } from '@expo/vector-icons';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen({ navigation }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginForm) => {
    const resultAction = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(resultAction)) {
      notificationService.notify('Welcome Back!', 'You have successfully signed in.');
    } else {
      Alert.alert('Login Failed', resultAction.payload as string);
    }
  };

  const handleGoogleLogin = async () => {
    // Mock Google Data for testing
    const googleData = {
      google_id: 'google_123456789',
      email: 'google_user@example.com',
      name: 'Google User',
      avatar: 'https://i.pravatar.cc/150?u=google'
    };
    
    const resultAction = await dispatch(googleLoginUser(googleData));
    if (googleLoginUser.fulfilled.match(resultAction)) {
      notificationService.notify('Welcome!', 'Signed in with Google successfully.');
    }
  };

  const handleMerchantDemoLogin = async () => {
    const resultAction = await dispatch(loginUser({
      email: 'merchant@foodapp.com',
      password: 'password'
    }));
    if (loginUser.fulfilled.match(resultAction)) {
      notificationService.notify('Merchant Access', 'Signed into Pizza Palace dashboard.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 justify-center px-6">
        <View className="mb-10">
          <Text className="text-4xl font-extrabold text-gray-900 mb-2">Welcome Back</Text>
          <Text className="text-lg text-gray-500">Sign in to your account to continue.</Text>
        </View>

        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-2">Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-gray-50 px-4 py-4 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} text-gray-800 text-base`}
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && <Text className="text-red-500 text-xs mt-1">{errors.email.message}</Text>}
        </View>

        <View className="mb-8">
          <Text className="text-sm font-semibold text-gray-700 mb-2">Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`bg-gray-50 px-4 py-4 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200'} text-gray-800 text-base`}
                placeholder="Enter your password"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && <Text className="text-red-500 text-xs mt-1">{errors.password.message}</Text>}
          
          <TouchableOpacity className="mt-3 self-end">
             <Text className="text-orange-500 font-medium">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          className="bg-orange-500 py-4 rounded-xl items-center shadow-lg shadow-orange-200 mb-6"
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg font-bold">Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-neutral-800 py-4 rounded-xl items-center shadow-md mb-4"
          onPress={handleMerchantDemoLogin}
          disabled={loading}
        >
          <Text className="text-white text-lg font-bold">Merchant Login (Demo)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-white py-4 rounded-xl items-center border border-gray-200 shadow-sm flex-row justify-center mb-8"
          onPress={handleGoogleLogin}
          disabled={loading}
        >
          <Ionicons name="logo-google" size={24} color="#DB4437" className="mr-3" />
          <Text className="text-gray-700 text-lg font-bold">Continue with Google</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-orange-500 font-bold">Sign Up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          className="mt-6 align-center items-center"
          onPress={() => navigation.navigate('RestaurantRegister')}
        >
          <Text className="text-gray-500 font-medium">Are you a restaurant? </Text>
          <Text className="text-orange-600 font-bold">Register as a Merchant</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

