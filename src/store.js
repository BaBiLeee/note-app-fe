import { configureStore } from '@reduxjs/toolkit';
import userSlice from './api/user/userSlice';  // Import đúng file authSlice
import noteSlice from './api/note/noteSlice';
import { userApi } from './api/user/userApi';
import { noteApi } from './api/note/noteApi';

const store = configureStore({
  reducer: {
    user: userSlice,  // Sử dụng authSlice ở đây
    note: noteSlice,
    [userApi.reducerPath]: userApi.reducer,
    [noteApi.reducerPath]: noteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, noteApi.middleware),
});

export default store;
