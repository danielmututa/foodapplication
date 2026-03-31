import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, Linking, TextInput, Modal, Alert, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { addToCart } from '../../store/cartSlice';
import api from '../../services/ApiService';
import notificationService from '../../services/NotificationService';
import { fetchRestaurantById, clearSelected } from '../../store/restaurantSlice';
import type { RootState, AppDispatch } from '../../store';

const INITIAL_REVIEWS = [
  { id: 'r1', user: 'Emma Watson', rating: 5, date: '2 days ago', comment: 'Absolutely amazing pizza! The crust was perfect.', likes: 12, dislikes: 0, avatar: 'https://i.pravatar.cc/150?u=emma' },
  { id: 'r2', user: 'Alex Riv', rating: 4, date: '1 week ago', comment: 'Very good, but the wait was a bit long.', likes: 5, dislikes: 2, avatar: 'https://i.pravatar.cc/150?u=alex' },
];

export default function RestaurantProfileScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch<AppDispatch>();
  const insets = useSafeAreaInsets();
  const restaurantId = route.params?.restaurantId;
  
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { selected: restaurant, loading } = useSelector((state: RootState) => state.restaurants);
  
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantById(restaurantId));
    }
    return () => {
      dispatch(clearSelected());
    };
  }, [restaurantId]);
  
  const handleRestrictedAction = (callback: () => void) => {
    if (!isAuthenticated) {
      navigation.navigate('AuthModal');
    } else {
      callback();
    }
  };
  
  const toggleFavorite = () => {
    if (!restaurant) return;
    setIsFavorite(!isFavorite);
    Alert.alert(
      isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
      `${restaurant.name} has been ${isFavorite ? 'removed from' : 'added to'} your saved restaurants.`
    );
  };

  const openMaps = () => {
    if (!restaurant) return;
    const url = Platform.select({
      ios: `maps:0,0?q=${restaurant.name}@40.7128,-74.0060`, 
      android: `geo:40.7128,-74.0060?q=40.7128,-74.0060(${restaurant.name})`
    }) || `https://www.google.com/maps/search/?api=1&query=40.7128,-74.0060`;
    
    Linking.openURL(url);
  };

  const handleAddToCart = (item: any) => {
     if (!restaurant) return;
     dispatch(addToCart({
       id: item.id.toString() + restaurant.id.toString(),
       name: item.name,
       price: parseFloat(item.price),
       image: item.image,
       quantity: 1,
       restaurantId: restaurant.id.toString(),
       restaurantName: restaurant.name
     }));
     
     notificationService.notifyAddToCart(item.name);
     Alert.alert('Success', `${item.name} added to cart!`);
  };

  const handleAddReview = async () => {
    if (!newReview.comment.trim() || !restaurant) return;
    
    setIsSubmittingReview(true);
    try {
      const response = await api.post('/reviews', {
        restaurant_id: restaurant.id,
        rating: newReview.rating,
        comment: newReview.comment,
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Review posted successfully!');
        setNewReview({ rating: 5, comment: '' });
        setShowReviewModal(false);
        // Refresh restaurant data to show new review
        dispatch(fetchRestaurantById(restaurantId));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to post review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleLikeReview = async (reviewId: number, isLike: boolean) => {
    handleRestrictedAction(async () => {
      try {
        await api.post(`/reviews/${reviewId}/react`, { is_like: isLike });
        // Refresh restaurant data to show updated reactions
        dispatch(fetchRestaurantById(restaurantId));
      } catch (error) {
        console.error('Failed to react to review:', error);
      }
    });
  };

  // Helper to process reviews from backend
  const getProcessedReviews = () => {
    if (!restaurant?.reviews) return [];
    
    return restaurant.reviews.map((r: any) => {
      const likes = r.reactions?.filter((re: any) => re.is_like).length || 0;
      const dislikes = r.reactions?.filter((re: any) => !re.is_like).length || 0;
      const userReaction = r.reactions?.find((re: any) => re.user_id === user?.id);

      return {
        ...r,
        userName: r.user?.name || 'Anonymous',
        userAvatar: r.user?.avatar || 'https://i.pravatar.cc/150',
        date: new Date(r.created_at).toLocaleDateString(),
        likesCount: likes,
        dislikesCount: dislikes,
        currentUserReaction: userReaction ? (userReaction.is_like ? 'like' : 'dislike') : null
      };
    }).sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  };

  const processedReviews = getProcessedReviews();

  if (loading && !restaurant) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
        <Text className="mt-4 text-gray-400 font-bold">Loading Menu...</Text>
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-400 font-bold">Restaurant not found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4 bg-orange-500 px-6 py-3 rounded-xl">
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
          onPress={toggleFavorite}
        >
          <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "#ef4444" : "white"} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 -mt-8 bg-white rounded-t-4xl pt-8 px-5">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1 pr-4">
            <Text className="text-3xl font-black text-gray-900 leading-tight">{restaurant.name}</Text>
            <View className="flex-row items-center mt-1">
               <Text className="text-gray-500 font-medium">{restaurant.address || 'Location information unavailable'}</Text>
            </View>
          </View>
          <View className="bg-orange-500 px-4 py-2 rounded-2xl flex-row items-center shadow-lg shadow-orange-200">
            <Ionicons name="star" size={16} color="white" />
            <Text className="text-white font-black ml-1.5">{restaurant.rating || '4.5'}</Text>
          </View>
        </View>

        <View className="flex-row items-center mt-6 bg-gray-50 p-5 rounded-3xl border border-gray-100 justify-around">
          <View className="items-center">
            <View className="bg-white p-2 rounded-xl mb-1 shadow-sm">
               <Ionicons name="time" size={20} color="#f97316" />
            </View>
            <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Wait Time</Text>
            <Text className="font-bold text-gray-900">20-30 min</Text>
          </View>
          <View className="w-px h-10 bg-gray-200" />
          <View className="items-center">
            <View className="bg-white p-2 rounded-xl mb-1 shadow-sm">
               <Ionicons name="navigate" size={20} color="#f97316" />
            </View>
            <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Distance</Text>
            <Text className="font-bold text-gray-900">1.2 km</Text>
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

        {/* Categories & Menu Section */}
        {restaurant.categories && restaurant.categories.map((category: any) => (
          <View key={category.id} className="mb-8">
            <View className="flex-row justify-between items-center mb-6">
               <Text className="text-2xl font-black text-gray-900">{category.name}</Text>
            </View>
            
            {category.items && category.items.map((item: any) => (
              <View key={item.id} className="flex-row items-center mb-6 bg-gray-50/50 p-4 rounded-3xl border border-gray-100">
                {item.image && <Image source={{ uri: item.image }} className="w-20 h-20 rounded-2xl mr-4" />}
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
                  <Text className="text-gray-400 text-xs mt-0.5" numberOfLines={1}>{item.description}</Text>
                  <Text className="text-orange-600 font-black mt-2 text-base">${parseFloat(item.price).toFixed(2)}</Text>
                </View>
                <TouchableOpacity 
                  className="bg-orange-500 w-10 h-10 rounded-full items-center justify-center shadow-md shadow-orange-100"
                  onPress={() => handleAddToCart(item)}
                >
                   <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}

        {/* Reviews Section */}
        <View className="mt-8">
           <View className="flex-row justify-between items-center mb-6">
             <Text className="text-2xl font-black text-gray-900">Reviews ({processedReviews.length})</Text>
             <TouchableOpacity onPress={() => handleRestrictedAction(() => setShowReviewModal(true))}>
               <Text className="text-orange-500 font-bold">+ Add Review</Text>
             </TouchableOpacity>
           </View>

           {processedReviews.map((review: any) => (
             <View key={review.id} className="mb-6 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                <View className="flex-row justify-between mb-3">
                   <View className="flex-row items-center">
                      <Image source={{ uri: review.userAvatar }} className="w-10 h-10 rounded-full mr-3" />
                      <View>
                         <Text className="font-bold text-gray-900">{review.userName}</Text>
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
                    onPress={() => handleLikeReview(review.id, true)}
                   >
                      <Ionicons 
                        name={review.currentUserReaction === 'like' ? "thumbs-up" : "thumbs-up-outline"} 
                        size={18} 
                        color={review.currentUserReaction === 'like' ? "#f97316" : "#9ca3af"} 
                      />
                      <Text className={`text-xs ml-1.5 font-bold ${review.currentUserReaction === 'like' ? "text-orange-500" : "text-gray-400"}`}>
                        {review.likesCount}
                      </Text>
                   </TouchableOpacity>
                   <TouchableOpacity 
                    className="flex-row items-center"
                    onPress={() => handleLikeReview(review.id, false)}
                   >
                      <Ionicons 
                        name={review.currentUserReaction === 'dislike' ? "thumbs-down" : "thumbs-down-outline"} 
                        size={18} 
                        color={review.currentUserReaction === 'dislike' ? "#f97316" : "#9ca3af"} 
                      />
                      <Text className={`text-xs ml-1.5 font-bold ${review.currentUserReaction === 'dislike' ? "text-orange-500" : "text-gray-400"}`}>
                        {review.dislikesCount}
                      </Text>
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
                disabled={isSubmittingReview}
               >
                  {isSubmittingReview ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white text-lg font-bold">Submit Review</Text>
                  )}
               </TouchableOpacity>
            </View>
         </View>
      </Modal>
    </View>
  );
}
