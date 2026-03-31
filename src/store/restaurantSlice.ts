import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/ApiService';

export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/restaurants');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch restaurants');
    }
  }
);

export const fetchRestaurantById = createAsyncThunk(
  'restaurants/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/restaurants/${id}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch restaurant');
    }
  }
);

export const fetchMyRestaurant = createAsyncThunk(
  'restaurants/fetchMy',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/my-restaurant');
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch your restaurant');
    }
  }
);

export const updateRestaurantLocation = createAsyncThunk(
  'restaurants/updateLocation',
  async ({ id, latitude, longitude }: { id: string; latitude: number; longitude: number }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/restaurants/${id}/location`, { latitude, longitude });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update location');
    }
  }
);

interface RestaurantState {
  list: any[];
  selected: any | null;
  myRestaurant: any | null; // Add this
  loading: boolean;
  error: string | null;
}

const initialState: RestaurantState = {
  list: [],
  selected: null,
  myRestaurant: null, // Add this
  loading: false,
  error: null,
};


const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRestaurantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMyRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.myRestaurant = action.payload;
      })
      .addCase(fetchMyRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateRestaurantLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRestaurantLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.myRestaurant = action.payload;
        state.selected = action.payload;
      })
      .addCase(updateRestaurantLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

  },
});

export const { clearSelected } = restaurantSlice.actions;
export default restaurantSlice.reducer;

