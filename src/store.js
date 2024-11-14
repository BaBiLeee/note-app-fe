import { configureStore } from '@reduxjs/toolkit';
import authSlice from './api/auth/authSlice';  // Import đúng file authSlice
import noteSlice from './api/note/noteSlice';
import { authApi } from './api/auth/authApi';
import { noteApi } from './api/note/noteApi';

const store = configureStore({
  reducer: {
    auth: authSlice,  // Sử dụng authSlice ở đây
    note: noteSlice,
    [authApi.reducerPath]: authApi.reducer,
    [noteApi.reducerPath]: noteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, noteApi.middleware),
});

export default store;
