import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api, { setAuthToken } from '../services/ApiService';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: 'client' | 'restaurant' | 'driver';
  phone?: string;
  address?: string;
  bio?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  userRole: 'client' | 'restaurant' | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRole: null,
  user: null,
  loading: false,
  error: null,
  token: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/login', credentials);
      setAuthToken(response.data.access_token);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/register', userData);
      setAuthToken(response.data.access_token);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

export const googleLoginUser = createAsyncThunk(
  'auth/googleLogin',
  async (googleData: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/google-login', googleData);
      setAuthToken(response.data.access_token);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Google Login failed');
    }
  }
);

export const updateProfileUser = createAsyncThunk(
  'auth/updateProfile',
  async (profileData: any, { rejectWithValue }) => {
    try {
      const response = await api.put('/user/profile', profileData);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Profile update failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
      state.user = null;
      state.token = null;
      setAuthToken(null);
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userRole = action.payload.user.role;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userRole = action.payload.user.role;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
      })
      .addCase(googleLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userRole = action.payload.user.role;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
      })
      .addCase(updateProfileUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(updateProfileUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

