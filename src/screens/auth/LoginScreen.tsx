import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { notificationService } from '../../services/NotificationService';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginForm) => {
    // In a real app, authenticate with backend
    dispatch(login({ 
      role: 'client',
      user: {
        id: '1',
        name: data.email.split('@')[0],
        email: data.email,
        avatar: `https://i.pravatar.cc/150?u=${data.email}`
      }
    }));
    
    // Request notification permissions after login
    await notificationService.requestPermissions();
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
        >
          <Text className="text-white text-lg font-bold">Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-neutral-800 py-4 rounded-xl items-center shadow-md mb-8"
          onPress={() => dispatch(login({ role: 'restaurant' }))}
        >
          <Text className="text-white text-lg font-bold">Merchant Login (Demo)</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-orange-500 font-bold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
