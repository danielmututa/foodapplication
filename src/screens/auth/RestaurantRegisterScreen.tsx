import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/authSlice';
import { AppDispatch, RootState } from '../../store';
import { Ionicons } from '@expo/vector-icons';

const stage1Schema = z.object({
  restaurantName: z.string().min(2, 'Restaurant name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const stage2Schema = z.object({
  businessType: z.string().min(2, 'Please select a business type'),
  otherType: z.string().optional(),
});

const stage3Schema = z.object({
  address: z.string().min(5, 'Address must be at least 5 characters'),
  staffCount: z.string().min(1, 'Please specify staff count'),
  contactPhone: z.string().min(10, 'Invalid phone number'),
});

type FormData = z.infer<typeof stage1Schema> & z.infer<typeof stage2Schema> & z.infer<typeof stage3Schema>;

export default function RestaurantRegisterScreen({ navigation }: any) {
  const [stage, setStage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
  
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      restaurantName: '',
      email: '',
      password: '',
      businessType: '',
      otherType: '',
      address: '',
      staffCount: '',
      contactPhone: ''
    }
  });

  const businessType = watch('businessType');

  const nextStage = () => setStage(prev => prev + 1);
  const prevStage = () => setStage(prev => prev - 1);

  const onSubmit = async (data: FormData) => {
    const resultAction = await dispatch(registerUser({
      name: data.restaurantName,
      email: data.email,
      password: data.password,
      role: 'restaurant',
      restaurant_name: data.restaurantName,
      address: data.address,
      phone: data.contactPhone
    }));

    if (registerUser.fulfilled.match(resultAction)) {
      Alert.alert('Registration Successful', `Welcome, ${data.restaurantName}! Your account is now ready.`);
    } else {
      Alert.alert('Registration Failed', resultAction.payload as string);
    }
  };

  const renderStage1 = () => (
    <View>
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Restaurant Name</Text>
        <Controller
          control={control}
          name="restaurantName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`bg-gray-50 px-4 py-4 rounded-xl border ${errors.restaurantName ? 'border-red-500' : 'border-gray-200'} text-gray-800 text-base`}
              placeholder="Pizza Palace"
              onBlur={onBlur} onChangeText={onChange} value={value}
            />
          )}
        />
        {errors.restaurantName && <Text className="text-red-500 text-xs mt-1">{errors.restaurantName.message}</Text>}
      </View>
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Business Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`bg-gray-50 px-4 py-4 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} text-gray-800 text-base`}
              placeholder="business@example.com"
              keyboardType="email-address" autoCapitalize="none"
              onBlur={onBlur} onChangeText={onChange} value={value}
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
              placeholder="Create a password"
              secureTextEntry
              onBlur={onBlur} onChangeText={onChange} value={value}
            />
          )}
        />
        {errors.password && <Text className="text-red-500 text-xs mt-1">{errors.password.message}</Text>}
      </View>

      <TouchableOpacity 
        className="bg-orange-500 py-4 rounded-xl items-center shadow-lg mb-6"
        onPress={() => {
           if (watch('restaurantName') && watch('email') && watch('password')) nextStage();
           else Alert.alert('Error', 'Please fill in all account details.');
        }}
      >
        <Text className="text-white text-lg font-bold">Continue to Business Type</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className="bg-white py-4 rounded-xl items-center border border-gray-200 shadow-sm flex-row justify-center mb-6"
        onPress={() => {}}
      >
        <Ionicons name="logo-google" size={24} color="#DB4437" className="mr-3" />
        <Text className="text-gray-700 text-lg font-bold">Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStage2 = () => (
    <View>
      <Text className="text-sm font-semibold text-gray-700 mb-4">Select Business Type</Text>
      <View className="flex-row flex-wrap gap-2 mb-6">
        {['Restaurant', 'Cafe', 'Bakery', 'Food Truck', 'Other'].map((type) => (
          <TouchableOpacity 
            key={type}
            onPress={() => setValue('businessType', type)}
            className={`px-4 py-2 rounded-full border ${businessType === type ? 'bg-orange-500 border-orange-500' : 'bg-white border-gray-200'}`}
          >
            <Text className={`${businessType === type ? 'text-white' : 'text-gray-600'} font-medium`}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {businessType === 'Other' && (
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-2">Please specify</Text>
          <Controller
            control={control}
            name="otherType"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-gray-50 px-4 py-4 rounded-xl border border-gray-200 text-gray-800 text-base"
                placeholder="e.g. Cloud Kitchen"
                onBlur={onBlur} onChangeText={onChange} value={value}
              />
            )}
          />
        </View>
      )}

      <View className="flex-row gap-3">
        <TouchableOpacity className="flex-1 bg-gray-200 py-4 rounded-xl items-center" onPress={prevStage}>
          <Text className="text-gray-700 font-bold">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-2 bg-orange-500 py-4 rounded-xl items-center shadow-lg"
          onPress={() => {
            if (businessType) nextStage();
            else Alert.alert('Error', 'Please select a business type.');
          }}
        >
          <Text className="text-white font-bold">Next: Location Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStage3 = () => (
    <View>
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Business Address</Text>
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`bg-gray-50 px-4 py-4 rounded-xl border ${errors.address ? 'border-red-500' : 'border-gray-200'} text-gray-800 text-base`}
              placeholder="123 Foodie St, New York"
              onBlur={onBlur} onChangeText={onChange} value={value}
            />
          )}
        />
        {errors.address && <Text className="text-red-500 text-xs mt-1">{errors.address.message}</Text>}
      </View>
      <View className="mb-4">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Approximate Staff Count</Text>
        <Controller
          control={control}
          name="staffCount"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`bg-gray-50 px-4 py-4 rounded-xl border ${errors.staffCount ? 'border-red-500' : 'border-gray-200'} text-gray-800 text-base`}
              placeholder="e.g. 5-10"
              keyboardType="numeric"
              onBlur={onBlur} onChangeText={onChange} value={value}
            />
          )}
        />
        {errors.staffCount && <Text className="text-red-500 text-xs mt-1">{errors.staffCount.message}</Text>}
      </View>
      <View className="mb-8">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Contact Phone</Text>
        <Controller
          control={control}
          name="contactPhone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`bg-gray-50 px-4 py-4 rounded-xl border ${errors.contactPhone ? 'border-red-500' : 'border-gray-200'} text-gray-800 text-base`}
              placeholder="+1 234 567 890"
              keyboardType="phone-pad"
              onBlur={onBlur} onChangeText={onChange} value={value}
            />
          )}
        />
        {errors.contactPhone && <Text className="text-red-500 text-xs mt-1">{errors.contactPhone.message}</Text>}
      </View>

      <View className="flex-row gap-3">
        <TouchableOpacity className="flex-1 bg-gray-200 py-4 rounded-xl items-center" onPress={prevStage}>
          <Text className="text-gray-700 font-bold">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-2 bg-orange-500 py-4 rounded-xl items-center shadow-lg"
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold">Complete Registration</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white pt-12">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 20 }}>
          
          <TouchableOpacity onPress={() => navigation.goBack()} className="mb-6 flex-row items-center">
            <Ionicons name="arrow-back" size={20} color="#f97316" />
            <Text className="text-orange-500 font-medium ml-2">Back</Text>
          </TouchableOpacity>

          <View className="mb-8">
            <Text className="text-4xl font-extrabold text-gray-900 mb-2">Merchant Setup</Text>
            <View className="flex-row items-center mb-1">
              <View className={`h-2 flex-1 rounded-full ${stage >= 1 ? 'bg-orange-500' : 'bg-gray-200'} mr-2`} />
              <View className={`h-2 flex-1 rounded-full ${stage >= 2 ? 'bg-orange-500' : 'bg-gray-200'} mr-2`} />
              <View className={`h-2 flex-1 rounded-full ${stage >= 3 ? 'bg-orange-500' : 'bg-gray-200'}`} />
            </View>
            <Text className="text-gray-500 font-medium leading-relaxed">
              Stage {stage} of 3: {stage === 1 ? 'Account Setup' : stage === 2 ? 'Business Type' : 'Location & Staff'}
            </Text>
          </View>

          {stage === 1 && renderStage1()}
          {stage === 2 && renderStage2()}
          {stage === 3 && renderStage3()}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
