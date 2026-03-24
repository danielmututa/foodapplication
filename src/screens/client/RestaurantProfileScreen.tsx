import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, Linking, TextInput, Modal, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { addToCart } from '../../store/cartSlice';
import type { RootState } from '../../store';

const RESTAURANT_DATA: any = {
  '1': { name: 'Pizza Palace', rating: 4.8, distance: '1.2 km', waitTime: '15-20 min', address: '123 New York St.', phone: '+1 234 567 890', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80', lat: 40.7128, lng: -74.0060 },
  '2': { name: 'Burger Bistro', rating: 4.5, distance: '2.5 km', waitTime: '25-30 min', address: '456 Brooklyn Ave.', phone: '+1 987 654 321', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', lat: 40.6782, lng: -73.9442 },
  '3': { name: 'Sushi Spot', rating: 4.9, distance: '3.1 km', waitTime: '30-40 min', address: '789 Queens Blvd.', phone: '+1 555 123 456', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80', lat: 40.7282, lng: -73.7949 }
};

const MENU = [
  { id: '1', name: 'Margherita Pizza', price: 12.99, image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=200&q=80', desc: 'Classic cheese and tomato' },
  { id: '2', name: 'Cheeseburger', price: 9.99, image: 'https://images.unsplash.com/photo-1571091718767-18b5c1457add?w=200&q=80', desc: 'Beef patty with cheddar' },
  { id: '3', name: 'Spicy Tuna Roll', price: 14.99, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=200&q=80', desc: 'Fresh tuna with spicy mayo' }
];

const INITIAL_REVIEWS = [
  { id: 'r1', user: 'Emma Watson', rating: 5, date: '2 days ago', comment: 'Absolutely amazing pizza! The crust was perfect.', likes: 12, dislikes: 0, avatar: 'https://i.pravatar.cc/150?u=emma' },
  { id: 'r2', user: 'Alex Riv', rating: 4, date: '1 week ago', comment: 'Very good, but the wait was a bit long.', likes: 5, dislikes: 2, avatar: 'https://i.pravatar.cc/150?u=alex' },
];

export default function RestaurantProfileScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const restaurantId = route.params?.restaurantId || '1';
  const restaurant = RESTAURANT_DATA[restaurantId] || RESTAURANT_DATA['1'];
  
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  const handleRestrictedAction = (callback: () => void) => {
    if (!isAuthenticated) {
      navigation.navigate('AuthModal');
    } else {
      callback();
    }
  };

  const openMaps = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${restaurant.name}@${restaurant.lat},${restaurant.lng}`,
      android: `geo:0,0?q=${restaurant.lat},${restaurant.lng}(${restaurant.name})`
    }) || `https://www.google.com/maps/search/?api=1&query=${restaurant.lat},${restaurant.lng}`;
    
    Linking.openURL(url);
  };

  const handleAddToCart = (item: any) => {
     dispatch(addToCart({
       id: item.id + restaurantId,
       name: item.name,
       price: item.price,
       image: item.image,
       quantity: 1,
       restaurantId: restaurantId,
       restaurantName: restaurant.name
     }));
     Alert.alert('Success', `${item.name} added to cart!`);
  };

  const handleAddReview = () => {
    if (!newReview.comment.trim()) return;
    const review = {
      id: Date.now().toString(),
      user: user?.name || 'Anonymous',
      rating: newReview.rating,
      date: 'Just now',
      comment: newReview.comment,
      likes: 0,
      dislikes: 0,
      avatar: user?.avatar || 'https://i.pravatar.cc/150'
    };
    setReviews([review, ...reviews]);
    setShowReviewModal(false);
    setNewReview({ rating: 5, comment: '' });
  };

  const handleLikeReview = (id: string, type: 'like' | 'dislike') => {
    setReviews(reviews.map(r => {
      if (r.id === id) {
        return {
          ...r,
          likes: type === 'like' ? r.likes + 1 : r.likes,
          dislikes: type === 'dislike' ? r.dislikes + 1 : r.dislikes
        };
      }
      return r;
    }));
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header Image */}
      <View className="h-72 bg-gray-200 relative">
        <TouchableOpacity 
          className="absolute z-10 w-11 h-11 bg-black/40 rounded-full items-center justify-center border border-white/20"
          style={{ top: insets.top + 10, left: 16 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={{uri: restaurant.image}} className="w-full h-full" resizeMode="cover" />
        <TouchableOpacity 
          className="absolute z-10 w-11 h-11 bg-black/40 rounded-full items-center justify-center border border-white/20"
          style={{ top: insets.top + 10, right: 16 }}
        >
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 -mt-8 bg-white rounded-t-4xl pt-8 px-5">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1 pr-4">
            <Text className="text-3xl font-black text-gray-900 leading-tight">{restaurant.name}</Text>
            <View className="flex-row items-center mt-1">
               <Text className="text-gray-500 font-medium">{restaurant.address}</Text>
            </View>
          </View>
          <View className="bg-orange-500 px-4 py-2 rounded-2xl flex-row items-center shadow-lg shadow-orange-200">
            <Ionicons name="star" size={16} color="white" />
            <Text className="text-white font-black ml-1.5">{restaurant.rating}</Text>
          </View>
        </View>

        <View className="flex-row items-center mt-6 bg-gray-50 p-5 rounded-3xl border border-gray-100 justify-around">
          <View className="items-center">
            <View className="bg-white p-2 rounded-xl mb-1 shadow-sm">
               <Ionicons name="time" size={20} color="#f97316" />
            </View>
            <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Wait Time</Text>
            <Text className="font-bold text-gray-900">{restaurant.waitTime}</Text>
          </View>
          <View className="w-px h-10 bg-gray-200" />
          <View className="items-center">
            <View className="bg-white p-2 rounded-xl mb-1 shadow-sm">
               <Ionicons name="navigate" size={20} color="#f97316" />
            </View>
            <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Distance</Text>
            <Text className="font-bold text-gray-900">{restaurant.distance}</Text>
          </View>
          <View className="w-px h-10 bg-gray-200" />
          <TouchableOpacity className="items-center" onPress={() => handleRestrictedAction(() => setShowReviewModal(true))}>
            <View className="bg-white p-2 rounded-xl mb-1 shadow-sm">
               <Ionicons name="create" size={20} color="#f97316" />
            </View>
            <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Review</Text>
            <Text className="font-bold text-orange-600">Give {'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Global Action Buttons */}
        <View className="flex-row gap-3 mt-8 mb-8">
           <TouchableOpacity 
             className="flex-1 bg-orange-500 py-4.5 rounded-2xl items-center shadow-lg shadow-orange-200 flex-row justify-center"
             onPress={() => handleRestrictedAction(() => navigation.navigate('Booking', { restaurantName: restaurant.name }))}
           >
             <Ionicons name="calendar-outline" size={20} color="white" />
             <Text className="text-white font-black text-lg ml-3">Book a Table</Text>
           </TouchableOpacity>
           <TouchableOpacity 
             className="w-16 h-16 bg-gray-100 rounded-2xl items-center justify-center border border-gray-200"
             onPress={openMaps}
           >
             <Ionicons name="location" size={28} color="#4b5563" />
           </TouchableOpacity>
        </View>

        {/* Menu Section */}
        <View className="flex-row justify-between items-center mb-6">
           <Text className="text-2xl font-black text-gray-900">Popular Menu</Text>
           <TouchableOpacity><Text className="text-orange-500 font-bold">Menu &gt;</Text></TouchableOpacity>
        </View>
        
        {MENU.map(item => (
          <View key={item.id} className="flex-row items-center mb-6 bg-gray-50/50 p-4 rounded-3xl border border-gray-100">
            <Image source={{ uri: item.image }} className="w-20 h-20 rounded-2xl mr-4" />
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
              <Text className="text-gray-400 text-xs mt-0.5" numberOfLines={1}>{item.desc}</Text>
              <Text className="text-orange-600 font-black mt-2 text-base">${item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity 
              className="bg-orange-500 w-10 h-10 rounded-full items-center justify-center shadow-md shadow-orange-100"
              onPress={() => handleAddToCart(item)}
            >
               <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Reviews Section */}
        <View className="mt-8">
           <View className="flex-row justify-between items-center mb-6">
             <Text className="text-2xl font-black text-gray-900">Reviews ({reviews.length})</Text>
             <TouchableOpacity onPress={() => handleRestrictedAction(() => setShowReviewModal(true))}>
               <Text className="text-orange-500 font-bold">+ Add Review</Text>
             </TouchableOpacity>
           </View>

           {reviews.map(review => (
             <View key={review.id} className="mb-6 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                <View className="flex-row justify-between mb-3">
                   <View className="flex-row items-center">
                      <Image source={{ uri: review.avatar }} className="w-10 h-10 rounded-full mr-3" />
                      <View>
                         <Text className="font-bold text-gray-900">{review.user}</Text>
                         <Text className="text-gray-400 text-[10px]">{review.date}</Text>
                      </View>
                   </View>
                   <View className="flex-row items-center bg-orange-50 px-2 py-1 rounded-lg">
                      <Ionicons name="star" size={12} color="#f97316" />
                      <Text className="text-orange-600 font-bold text-xs ml-1">{review.rating}</Text>
                   </View>
                </View>
                <Text className="text-gray-600 leading-relaxed mb-4">{review.comment}</Text>
                <View className="flex-row border-t border-gray-50 pt-3">
                   <TouchableOpacity 
                    className="flex-row items-center mr-6"
                    onPress={() => handleLikeReview(review.id, 'like')}
                   >
                      <Ionicons name="thumbs-up-outline" size={18} color="#9ca3af" />
                      <Text className="text-gray-400 text-xs ml-1.5 font-bold">{review.likes}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity 
                    className="flex-row items-center"
                    onPress={() => handleLikeReview(review.id, 'dislike')}
                   >
                      <Ionicons name="thumbs-down-outline" size={18} color="#9ca3af" />
                      <Text className="text-gray-400 text-xs ml-1.5 font-bold">{review.dislikes}</Text>
                   </TouchableOpacity>
                </View>
             </View>
           ))}
        </View>
        <View style={{ height: insets.bottom + 100 }} />
      </ScrollView>

      {/* Review Modal */}
      <Modal visible={showReviewModal} animationType="slide" transparent>
         <View className="flex-1 justify-end bg-black/50">
            <View className="bg-white rounded-t-4xl p-8 pb-12">
               <View className="flex-row justify-between items-center mb-8">
                  <Text className="text-2xl font-black text-gray-900">Rate your experience</Text>
                  <TouchableOpacity onPress={() => setShowReviewModal(false)}>
                     <Ionicons name="close" size={28} color="#1f2937" />
                  </TouchableOpacity>
               </View>

               <Text className="text-center text-gray-400 font-bold uppercase text-xs mb-4">Select Rating</Text>
               <View className="flex-row justify-center gap-2 mb-10">
                  {[1,2,3,4,5].map(star => (
                    <TouchableOpacity key={star} onPress={() => setNewReview({...newReview, rating: star})}>
                       <Ionicons 
                        name={star <= newReview.rating ? "star" : "star-outline"} 
                        size={40} 
                        color="#f97316" 
                       />
                    </TouchableOpacity>
                  ))}
               </View>

               <TextInput 
                className="bg-gray-50 p-5 rounded-3xl border border-gray-100 text-gray-800 text-base h-40"
                placeholder="Tell us what you loved or what could be better..."
                placeholderTextColor="#9ca3af"
                multiline
                textAlignVertical="top"
                value={newReview.comment}
                onChangeText={(text) => setNewReview({...newReview, comment: text})}
               />

               <TouchableOpacity 
                className="bg-orange-500 py-5 rounded-2xl items-center mt-8 shadow-lg shadow-orange-200"
                onPress={handleAddReview}
               >
                  <Text className="text-white text-lg font-bold">Submit Review</Text>
               </TouchableOpacity>
            </View>
         </View>
      </Modal>
    </View>
  );
}
