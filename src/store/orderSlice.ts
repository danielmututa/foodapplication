import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/ApiService';

export const fetchMerchantOrders = createAsyncThunk(
  'orders/fetchMerchant',
  async (restaurantId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/restaurants/${restaurantId}/orders`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const placeOrder = createAsyncThunk(
  'orders/place',
  async (orderData: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to place order');
    }
  }
);

interface OrderState {
  merchantOrders: any[];
  userOrders: any[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  merchantOrders: [],
  userOrders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMerchantOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMerchantOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.merchantOrders = action.payload;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders.unshift(action.payload);
      });
  },
});

export default orderSlice.reducer;
