import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const FAQS = [
  { q: 'How do I track my order?', a: 'Go to the Orders tab and click on "Track Order" for any active delivery.' },
  { q: 'Can I cancel my order?', a: 'Orders can only be cancelled within 2 minutes of placement.' },
  { q: 'What payment methods are accepted?', a: 'We accept all major credit cards, PayPal, and Apple Pay.' },
];

export default function SupportScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: insets.top }}>
      <View className="px-6 py-4 flex-row items-center border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-900">Help & Support</Text>
      </View>

      <ScrollView className="flex-1 px-6">
        <View className="mt-8 bg-orange-500 p-8 rounded-[40px] items-center text-center">
            <Ionicons name="chatbubbles" size={40} color="white" />
            <Text className="text-white text-xl font-bold mt-4">How can we help?</Text>
            <Text className="text-orange-100 text-center mt-2">Our team is available 24/7 to assist you with any issues.</Text>
            <TouchableOpacity 
              onPress={() => Linking.openURL('https://wa.me/263783012260')}
              className="bg-white px-8 py-3 rounded-2xl mt-6 shadow-sm"
            >
                <Text className="text-orange-600 font-bold">Chat with us</Text>
            </TouchableOpacity>
        </View>

        <View className="mt-12">
          <Text className="text-lg font-black text-gray-900 mb-6">Frequently Asked Questions</Text>
          {FAQS.map((faq, i) => (
            <View key={i} className="mb-6 border-b border-gray-50 pb-6">
              <Text className="font-bold text-gray-800 text-base mb-2">{faq.q}</Text>
              <Text className="text-gray-500 leading-relaxed">{faq.a}</Text>
            </View>
          ))}
        </View>

        <View className="mt-6 mb-20 p-6 bg-gray-50 rounded-3xl border border-gray-100">
            <Text className="text-center text-gray-400 font-bold uppercase text-[10px] mb-4 tracking-widest">Connect with us</Text>
            <View className="flex-row justify-center gap-8">
                <TouchableOpacity className="w-12 h-12 bg-white rounded-2xl items-center justify-center shadow-sm">
                    <Ionicons name="logo-instagram" size={24} color="#e1306c" />
                </TouchableOpacity>
                <TouchableOpacity className="w-12 h-12 bg-white rounded-2xl items-center justify-center shadow-sm">
                    <Ionicons name="logo-twitter" size={24} color="#1da1f2" />
                </TouchableOpacity>
                <TouchableOpacity className="w-12 h-12 bg-white rounded-2xl items-center justify-center shadow-sm">
                    <Ionicons name="mail" size={24} color="#d44638" />
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </View>
  );
}
