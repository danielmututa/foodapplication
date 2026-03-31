import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/authSlice';
import { AppDispatch, RootState } from '../../store';
import { Ionicons } from '@expo/vector-icons';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterScreen({ navigation }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (data: RegisterForm) => {
    const resultAction = await dispatch(registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'client'
    }));

    if (registerUser.fulfilled.match(resultAction)) {
      Alert.alert('Success', 'Account created successfully!');
    } else {
      Alert.alert('Registration Failed', resultAction.payload as string);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 40, flexGrow: 1, justifyContent: 'center' }}>
          
          <TouchableOpacity onPress={() => navigation.goBack()} className="mb-6">
            <Text className="text-orange-500 font-medium">← Back to Login</Text>
          </TouchableOpacity>

          <View className="mb-8">
            <Text className="text-4xl font-extrabold text-gray-900 mb-2">Create Account</Text>
            <Text className="text-lg text-gray-500">Sign up to get started.</Text>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Full Name</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-gray-50 px-4 py-4 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} text-gray-800 text-base`}
                  placeholder="John Doe"
                  placeholderTextColor="#9ca3af"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.name && <Text className="text-red-500 text-xs mt-1">{errors.name.message}</Text>}
          </View>

          <View className="mb-4">
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

          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Password</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-gray-50 px-4 py-4 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200'} text-gray-800 text-base`}
                  placeholder="Create a password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.password && <Text className="text-red-500 text-xs mt-1">{errors.password.message}</Text>}
          </View>

          <View className="mb-8">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Confirm Password</Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`bg-gray-50 px-4 py-4 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} text-gray-800 text-base`}
                  placeholder="Confirm your password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.confirmPassword && <Text className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</Text>}
          </View>

          <TouchableOpacity 
            className="bg-orange-500 py-4 rounded-xl items-center shadow-lg shadow-orange-200 mb-6"
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="white" /> : <Text className="text-white text-lg font-bold">Create Account</Text>}
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-white py-4 rounded-xl items-center border border-gray-200 shadow-sm flex-row justify-center mb-8"
            onPress={() => {}}
          >
            <Ionicons name="logo-google" size={24} color="#DB4437" className="mr-3" />
            <Text className="text-gray-700 text-lg font-bold">Continue with Google</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
