import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  userRole: 'client' | 'restaurant' | null;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRole: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ role: 'client' | 'restaurant'; user?: User }>) => {
      state.isAuthenticated = true;
      state.userRole = action.payload.role;
      state.user = action.payload.user || {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://i.pravatar.cc/150?u=john'
      };
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
      state.user = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    }
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
