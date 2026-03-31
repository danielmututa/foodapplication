import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

import cartReducer from './cartSlice';
import restaurantReducer from './restaurantSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    restaurants: restaurantReducer,
    orders: orderReducer,
  },
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
