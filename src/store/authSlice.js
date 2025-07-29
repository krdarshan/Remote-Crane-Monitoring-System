import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated API call
const mockLogin = async ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock authentication logic
      const validCredentials = {
        admin: { password: 'admin', role: 'admin' },
        operator: { password: 'operator', role: 'operator' },
        engineer: { password: 'engineer', role: 'engineer' },
        finance: { password: 'finance', role: 'finance' }
      };

      if (validCredentials[username] && validCredentials[username].password === password) {
        resolve({
          username,
          role: validCredentials[username].role,
          token: 'mock-jwt-token'
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500); // Simulate network delay
  });
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await mockLogin(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectUserRole = (state) => state.auth.user?.role;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer; 